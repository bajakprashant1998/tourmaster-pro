import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { differenceInDays, differenceInHours, isWithinInterval, parseISO } from "date-fns";

interface PricingRule {
  id: string;
  name: string;
  rule_type: string;
  discount_type: string;
  discount_value: number;
  start_date: string | null;
  end_date: string | null;
  days_before_min: number | null;
  days_before_max: number | null;
  hours_before: number | null;
  min_group_size: number | null;
  max_group_size: number | null;
  promo_code: string | null;
  usage_limit: number | null;
  usage_count: number;
  tour_id: string | null;
  priority: number;
  is_active: boolean;
}

export interface AppliedDiscount {
  ruleId: string;
  ruleName: string;
  ruleType: string;
  discountType: string;
  discountValue: number;
  savedAmount: number;
}

interface UsePricingCalculatorArgs {
  tourId?: string;
  tourDate?: Date;
  groupSize: number;
  promoCode?: string;
  subtotal: number;
}

export function usePricingRules(tourId?: string) {
  return useQuery({
    queryKey: ["active-pricing-rules", tourId],
    queryFn: async () => {
      let query = supabase
        .from("pricing_rules")
        .select("*")
        .eq("is_active", true)
        .order("priority", { ascending: false });

      if (tourId) {
        query = query.or(`tour_id.eq.${tourId},tour_id.is.null`);
      } else {
        query = query.is("tour_id", null);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as PricingRule[];
    },
  });
}

export function useApplyPricingRules({
  tourId,
  tourDate,
  groupSize,
  promoCode,
  subtotal,
}: UsePricingCalculatorArgs) {
  const { data: rules = [] } = usePricingRules(tourId);

  return useMemo(() => {
    if (subtotal <= 0 || rules.length === 0) {
      return { appliedDiscounts: [] as AppliedDiscount[], totalDiscount: 0, finalPrice: subtotal };
    }

    const now = new Date();
    const applied: AppliedDiscount[] = [];
    let remainingPrice = subtotal;

    for (const rule of rules) {
      let matches = false;

      switch (rule.rule_type) {
        case "seasonal": {
          if (rule.start_date && rule.end_date && tourDate) {
            matches = isWithinInterval(tourDate, {
              start: parseISO(rule.start_date),
              end: parseISO(rule.end_date),
            });
          }
          break;
        }
        case "early_bird": {
          if (tourDate) {
            const daysAhead = differenceInDays(tourDate, now);
            const min = rule.days_before_min ?? 0;
            const max = rule.days_before_max ?? Infinity;
            matches = daysAhead >= min && daysAhead <= max;
          }
          break;
        }
        case "last_minute": {
          if (tourDate && rule.hours_before) {
            const hoursAhead = differenceInHours(tourDate, now);
            matches = hoursAhead > 0 && hoursAhead <= rule.hours_before;
          }
          break;
        }
        case "group_size": {
          const min = rule.min_group_size ?? 0;
          const max = rule.max_group_size ?? Infinity;
          matches = groupSize >= min && groupSize <= max;
          break;
        }
        case "promo_code": {
          if (promoCode && rule.promo_code) {
            matches = promoCode.toUpperCase().trim() === rule.promo_code.toUpperCase().trim();
            // Check usage limit
            if (matches && rule.usage_limit && rule.usage_count >= rule.usage_limit) {
              matches = false;
            }
            // Check date validity
            if (matches && rule.start_date && rule.end_date) {
              matches = isWithinInterval(now, {
                start: parseISO(rule.start_date),
                end: parseISO(rule.end_date),
              });
            }
          }
          break;
        }
      }

      if (matches) {
        const savedAmount =
          rule.discount_type === "percentage"
            ? remainingPrice * (rule.discount_value / 100)
            : Math.min(rule.discount_value, remainingPrice);

        if (savedAmount > 0) {
          applied.push({
            ruleId: rule.id,
            ruleName: rule.name,
            ruleType: rule.rule_type,
            discountType: rule.discount_type,
            discountValue: rule.discount_value,
            savedAmount: Math.round(savedAmount * 100) / 100,
          });
          remainingPrice -= savedAmount;
        }
      }
    }

    const totalDiscount = subtotal - Math.max(remainingPrice, 0);
    return {
      appliedDiscounts: applied,
      totalDiscount: Math.round(totalDiscount * 100) / 100,
      finalPrice: Math.max(Math.round(remainingPrice * 100) / 100, 0),
    };
  }, [rules, tourDate, groupSize, promoCode, subtotal]);
}
