import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ChildAgeSectionProps {
  data: {
    adultLabel: string;
    childLabel: string;
    infantLabel: string;
  };
  onChange: (data: any) => void;
}

export function ChildAgeSection({ data, onChange }: ChildAgeSectionProps) {
  return (
    <div className="admin-card animate-fade-in">
      <div className="admin-card-header">
        <h2 className="admin-card-title">Tour Child Age Configuration</h2>
      </div>
      <div className="admin-card-body space-y-4">
        <div>
          <Label className="admin-label">Adult Age Label</Label>
          <Input
            value={data.adultLabel}
            onChange={(e) => onChange({ ...data, adultLabel: e.target.value })}
            placeholder="For Museum its above 3 years & Burj Khalifa Above 8 years"
            className="admin-input"
          />
        </div>
        <div>
          <Label className="admin-label">Child Age Label</Label>
          <Input
            value={data.childLabel}
            onChange={(e) => onChange({ ...data, childLabel: e.target.value })}
            placeholder="0-3 years"
            className="admin-input"
          />
        </div>
        <div>
          <Label className="admin-label">Infant Age Label</Label>
          <Input
            value={data.infantLabel}
            onChange={(e) => onChange({ ...data, infantLabel: e.target.value })}
            placeholder="Below 3 years"
            className="admin-input"
          />
        </div>
      </div>
    </div>
  );
}
