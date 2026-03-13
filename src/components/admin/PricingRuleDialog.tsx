import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { PricingRule } from "@/hooks/useAdminPricingRules";

interface PricingRuleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rule?: PricingRule | null;
  tourId?: string | null;
  onSave: (data: any) => void;
  isSaving?: boolean;
}

const ruleTypes = [
  { value: "seasonal", label: "Seasonal Discount" },
  { value: "early_bird", label: "Early Bird" },
  { value: "last_minute", label: "Last Minute" },
  { value: "group_size", label: "Group Size" },
  { value: "promo_code", label: "Promo Code" },
];

export function PricingRuleDialog({ open, onOpenChange, rule, tourId, onSave, isSaving }: PricingRuleDialogProps) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    rule_type: "seasonal",
    discount_type: "percentage",
    discount_value: "",
    start_date: "",
    end_date: "",
    days_before_min: "",
    days_before_max: "",
    hours_before: "",
    min_group_size: "",
    max_group_size: "",
    promo_code: "",
    usage_limit: "",
    priority: "0",
    is_active: true,
  });

  useEffect(() => {
    if (rule) {
      setForm({
        name: rule.name,
        description: rule.description || "",
        rule_type: rule.rule_type,
        discount_type: rule.discount_type,
        discount_value: rule.discount_value.toString(),
        start_date: rule.start_date || "",
        end_date: rule.end_date || "",
        days_before_min: rule.days_before_min?.toString() || "",
        days_before_max: rule.days_before_max?.toString() || "",
        hours_before: rule.hours_before?.toString() || "",
        min_group_size: rule.min_group_size?.toString() || "",
        max_group_size: rule.max_group_size?.toString() || "",
        promo_code: rule.promo_code || "",
        usage_limit: rule.usage_limit?.toString() || "",
        priority: rule.priority.toString(),
        is_active: rule.is_active,
      });
    } else {
      setForm({
        name: "", description: "", rule_type: "seasonal", discount_type: "percentage",
        discount_value: "", start_date: "", end_date: "", days_before_min: "", days_before_max: "",
        hours_before: "", min_group_size: "", max_group_size: "", promo_code: "", usage_limit: "",
        priority: "0", is_active: true,
      });
    }
  }, [rule, open]);

  const handleSubmit = () => {
    const data: any = {
      name: form.name,
      description: form.description || null,
      rule_type: form.rule_type,
      discount_type: form.discount_type,
      discount_value: parseFloat(form.discount_value) || 0,
      start_date: form.start_date || null,
      end_date: form.end_date || null,
      days_before_min: form.days_before_min ? parseInt(form.days_before_min) : null,
      days_before_max: form.days_before_max ? parseInt(form.days_before_max) : null,
      hours_before: form.hours_before ? parseInt(form.hours_before) : null,
      min_group_size: form.min_group_size ? parseInt(form.min_group_size) : null,
      max_group_size: form.max_group_size ? parseInt(form.max_group_size) : null,
      promo_code: form.promo_code || null,
      usage_limit: form.usage_limit ? parseInt(form.usage_limit) : null,
      priority: parseInt(form.priority) || 0,
      is_active: form.is_active,
      tour_id: tourId || null,
    };
    if (rule) data.id = rule.id;
    onSave(data);
  };

  const update = (key: string, value: any) => setForm((p) => ({ ...p, [key]: value }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{rule ? "Edit" : "Create"} Pricing Rule</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          {/* Name & Type */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Rule Name</Label>
              <Input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Summer Sale 2026" />
            </div>
            <div className="space-y-2">
              <Label>Rule Type</Label>
              <Select value={form.rule_type} onValueChange={(v) => update("rule_type", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {ruleTypes.map((t) => (
                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea value={form.description} onChange={(e) => update("description", e.target.value)} rows={2} />
          </div>

          {/* Discount */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Discount Type</Label>
              <Select value={form.discount_type} onValueChange={(v) => update("discount_type", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage (%)</SelectItem>
                  <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Discount Value</Label>
              <Input type="number" value={form.discount_value} onChange={(e) => update("discount_value", e.target.value)}
                placeholder={form.discount_type === "percentage" ? "e.g. 15" : "e.g. 50"} />
            </div>
          </div>

          {/* Date range — seasonal & promo */}
          {(form.rule_type === "seasonal" || form.rule_type === "promo_code") && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input type="date" value={form.start_date} onChange={(e) => update("start_date", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input type="date" value={form.end_date} onChange={(e) => update("end_date", e.target.value)} />
              </div>
            </div>
          )}

          {/* Early bird */}
          {form.rule_type === "early_bird" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Min Days Before Tour</Label>
                <Input type="number" value={form.days_before_min} onChange={(e) => update("days_before_min", e.target.value)} placeholder="e.g. 14" />
              </div>
              <div className="space-y-2">
                <Label>Max Days Before Tour</Label>
                <Input type="number" value={form.days_before_max} onChange={(e) => update("days_before_max", e.target.value)} placeholder="e.g. 60" />
              </div>
            </div>
          )}

          {/* Last minute */}
          {form.rule_type === "last_minute" && (
            <div className="space-y-2">
              <Label>Hours Before Tour Start</Label>
              <Input type="number" value={form.hours_before} onChange={(e) => update("hours_before", e.target.value)} placeholder="e.g. 48" />
            </div>
          )}

          {/* Group size */}
          {form.rule_type === "group_size" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Min Group Size</Label>
                <Input type="number" value={form.min_group_size} onChange={(e) => update("min_group_size", e.target.value)} placeholder="e.g. 5" />
              </div>
              <div className="space-y-2">
                <Label>Max Group Size</Label>
                <Input type="number" value={form.max_group_size} onChange={(e) => update("max_group_size", e.target.value)} placeholder="e.g. 20" />
              </div>
            </div>
          )}

          {/* Promo code */}
          {form.rule_type === "promo_code" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Promo Code</Label>
                <Input value={form.promo_code} onChange={(e) => update("promo_code", e.target.value.toUpperCase())} placeholder="SUMMER2026" className="font-mono" />
              </div>
              <div className="space-y-2">
                <Label>Usage Limit</Label>
                <Input type="number" value={form.usage_limit} onChange={(e) => update("usage_limit", e.target.value)} placeholder="e.g. 500" />
              </div>
            </div>
          )}

          {/* Priority & Active */}
          <div className="grid grid-cols-2 gap-4 items-end">
            <div className="space-y-2">
              <Label>Priority (higher = applied first)</Label>
              <Input type="number" value={form.priority} onChange={(e) => update("priority", e.target.value)} />
            </div>
            <div className="flex items-center gap-3 pb-1">
              <Switch checked={form.is_active} onCheckedChange={(v) => update("is_active", v)} />
              <Label>Active</Label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!form.name || isSaving}>
            {rule ? "Update Rule" : "Create Rule"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
