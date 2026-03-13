import { AdminLayout } from "@/components/admin/AdminLayout";
import { PricingRulesSection } from "@/components/admin/tour/PricingRulesSection";
import { useAdminPricingRules } from "@/hooks/useAdminPricingRules";
import { Tag, CheckCircle, Percent, Calendar } from "lucide-react";

export default function Discounts() {
  const { data: rules = [] } = useAdminPricingRules();

  const activeCount = rules.filter((r) => r.is_active).length;
  const promoCount = rules.filter((r) => r.rule_type === "promo_code").length;
  const totalUsage = rules.reduce((s, r) => s + r.usage_count, 0);
  const avgDiscount = rules.length
    ? Math.round(rules.filter((r) => r.discount_type === "percentage").reduce((s, r) => s + r.discount_value, 0) / Math.max(rules.filter((r) => r.discount_type === "percentage").length, 1))
    : 0;

  return (
    <AdminLayout title="Pricing Rules" breadcrumb={["Dashboard", "Pricing Rules"]}>
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="admin-card p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Tag className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Rules</p>
                <p className="text-2xl font-bold">{activeCount}</p>
              </div>
            </div>
          </div>
          <div className="admin-card p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Uses</p>
                <p className="text-2xl font-bold">{totalUsage.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="admin-card p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Percent className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Discount</p>
                <p className="text-2xl font-bold">{avgDiscount}%</p>
              </div>
            </div>
          </div>
          <div className="admin-card p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Promo Codes</p>
                <p className="text-2xl font-bold">{promoCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Global pricing rules editor */}
        <PricingRulesSection />
      </div>
    </AdminLayout>
  );
}
