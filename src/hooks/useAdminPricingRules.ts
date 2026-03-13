import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface PricingRule {
  id: string;
  name: string;
  description: string | null;
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
  created_at: string;
  updated_at: string;
}

export type PricingRuleInsert = Omit<PricingRule, "id" | "created_at" | "updated_at" | "usage_count">;

export function useAdminPricingRules(tourId?: string | null) {
  return useQuery({
    queryKey: ["pricing-rules", tourId ?? "all"],
    queryFn: async () => {
      let query = supabase.from("pricing_rules").select("*").order("priority", { ascending: false });
      if (tourId) {
        // For a specific tour, get tour-specific + global rules
        query = supabase
          .from("pricing_rules")
          .select("*")
          .or(`tour_id.eq.${tourId},tour_id.is.null`)
          .order("priority", { ascending: false });
      }
      const { data, error } = await query;
      if (error) throw error;
      return data as PricingRule[];
    },
  });
}

export function useCreatePricingRule() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (rule: Partial<PricingRuleInsert>) => {
      const { data, error } = await supabase.from("pricing_rules").insert(rule as any).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["pricing-rules"] });
      toast({ title: "Pricing rule created" });
    },
    onError: (err: Error) => {
      toast({ title: "Error creating rule", description: err.message, variant: "destructive" });
    },
  });
}

export function useUpdatePricingRule() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<PricingRule> & { id: string }) => {
      const { error } = await supabase.from("pricing_rules").update(updates as any).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["pricing-rules"] });
      toast({ title: "Pricing rule updated" });
    },
    onError: (err: Error) => {
      toast({ title: "Error updating rule", description: err.message, variant: "destructive" });
    },
  });
}

export function useDeletePricingRule() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("pricing_rules").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["pricing-rules"] });
      toast({ title: "Pricing rule deleted" });
    },
    onError: (err: Error) => {
      toast({ title: "Error deleting rule", description: err.message, variant: "destructive" });
    },
  });
}
