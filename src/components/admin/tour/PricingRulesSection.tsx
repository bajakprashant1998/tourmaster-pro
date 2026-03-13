import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Percent, Clock, Users, Tag, CalendarDays } from "lucide-react";
import { useAdminPricingRules, useCreatePricingRule, useUpdatePricingRule, useDeletePricingRule } from "@/hooks/useAdminPricingRules";
import { PricingRuleDialog } from "@/components/admin/PricingRuleDialog";
import type { PricingRule } from "@/hooks/useAdminPricingRules";

const ruleTypeIcons: Record<string, any> = {
  seasonal: CalendarDays,
  early_bird: Clock,
  last_minute: Clock,
  group_size: Users,
  promo_code: Tag,
};

const ruleTypeLabels: Record<string, string> = {
  seasonal: "Seasonal",
  early_bird: "Early Bird",
  last_minute: "Last Minute",
  group_size: "Group Size",
  promo_code: "Promo Code",
};

export function PricingRulesSection({ tourId }: { tourId?: string }) {
  const { data: rules = [], isLoading } = useAdminPricingRules(tourId);
  const createMut = useCreatePricingRule();
  const updateMut = useUpdatePricingRule();
  const deleteMut = useDeletePricingRule();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<PricingRule | null>(null);

  // Filter to only tour-specific rules in tour context
  const tourRules = tourId ? rules.filter((r) => r.tour_id === tourId) : [];
  const globalRules = tourId ? rules.filter((r) => !r.tour_id) : [];

  const handleSave = (data: any) => {
    if (data.id) {
      const { id, ...updates } = data;
      updateMut.mutate({ id, ...updates }, { onSuccess: () => setDialogOpen(false) });
    } else {
      createMut.mutate(data, { onSuccess: () => setDialogOpen(false) });
    }
  };

  const RuleRow = ({ rule }: { rule: PricingRule }) => {
    const Icon = ruleTypeIcons[rule.rule_type] || Percent;
    return (
      <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-background">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center">
            <Icon className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">{rule.name}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <Badge variant="outline" className="text-xs">{ruleTypeLabels[rule.rule_type]}</Badge>
              <span className="text-xs text-muted-foreground">
                {rule.discount_type === "percentage" ? `${rule.discount_value}% off` : `$${rule.discount_value} off`}
              </span>
              {rule.promo_code && (
                <code className="text-xs px-1.5 py-0.5 bg-muted rounded font-mono">{rule.promo_code}</code>
              )}
              {!rule.is_active && <Badge variant="secondary" className="text-xs">Inactive</Badge>}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditingRule(rule); setDialogOpen(true); }}>
            <Edit className="w-3.5 h-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteMut.mutate(rule.id)}>
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Pricing Rules</CardTitle>
        <Button size="sm" onClick={() => { setEditingRule(null); setDialogOpen(true); }}>
          <Plus className="w-4 h-4 mr-1" /> Add Rule
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : (
          <>
            {tourRules.length === 0 && !tourId && rules.length === 0 && (
              <p className="text-sm text-muted-foreground">No pricing rules yet. Create one to get started.</p>
            )}

            {tourId && tourRules.length === 0 && (
              <p className="text-sm text-muted-foreground">No tour-specific rules. Add one or use global rules below.</p>
            )}

            {/* Tour-specific rules */}
            {tourRules.map((r) => <RuleRow key={r.id} rule={r} />)}

            {/* Global rules (read-only in tour context) */}
            {tourId && globalRules.length > 0 && (
              <div className="pt-2">
                <p className="text-xs font-medium text-muted-foreground mb-2">Global Rules (also applying)</p>
                {globalRules.map((r) => (
                  <div key={r.id} className="flex items-center gap-3 p-3 rounded-lg border border-dashed border-border bg-muted/30">
                    <div className="w-9 h-9 rounded-md bg-muted flex items-center justify-center">
                      {(() => { const Icon = ruleTypeIcons[r.rule_type] || Percent; return <Icon className="w-4 h-4 text-muted-foreground" />; })()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{r.name}</p>
                      <span className="text-xs text-muted-foreground">
                        {r.discount_type === "percentage" ? `${r.discount_value}%` : `$${r.discount_value}`} — Global
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Standalone page: show all rules */}
            {!tourId && rules.map((r) => <RuleRow key={r.id} rule={r} />)}
          </>
        )}
      </CardContent>

      <PricingRuleDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        rule={editingRule}
        tourId={tourId}
        onSave={handleSave}
        isSaving={createMut.isPending || updateMut.isPending}
      />
    </Card>
  );
}
