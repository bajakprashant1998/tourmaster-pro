import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TourOptionsSectionProps {
  data: {
    duration: string;
    durationUnit: "minutes" | "hours";
    pickupTime: string;
    dropbackTime: string;
  };
  onChange: (data: any) => void;
}

export function TourOptionsSection({ data, onChange }: TourOptionsSectionProps) {
  return (
    <div className="admin-card animate-fade-in">
      <div className="admin-card-header">
        <h2 className="admin-card-title">Tour Option</h2>
      </div>
      <div className="admin-card-body space-y-6">
        {/* Tour Icons Settings */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-foreground">
            Tour Icons Settings
          </h3>

          {/* Duration */}
          <div>
            <Label className="admin-label">
              Duration{" "}
              <span className="text-muted-foreground font-normal">
                (leave blank icon will not appear)
              </span>
            </Label>
            <div className="flex gap-2">
              <Input
                value={data.duration}
                onChange={(e) => onChange({ ...data, duration: e.target.value })}
                placeholder="Duration"
                className="admin-input flex-1"
              />
              <div className="toggle-group">
                <button
                  type="button"
                  onClick={() => onChange({ ...data, durationUnit: "minutes" })}
                  className={`toggle-btn ${
                    data.durationUnit === "minutes" ? "toggle-btn-active" : ""
                  }`}
                >
                  Minutes
                </button>
                <button
                  type="button"
                  onClick={() => onChange({ ...data, durationUnit: "hours" })}
                  className={`toggle-btn ${
                    data.durationUnit === "hours" ? "toggle-btn-active" : ""
                  }`}
                >
                  Hours
                </button>
              </div>
            </div>
          </div>

          {/* Pickup Time */}
          <div>
            <Label className="admin-label">
              Pickup Time{" "}
              <span className="text-muted-foreground font-normal">
                (leave blank icon will not appear)
              </span>
            </Label>
            <Input
              value={data.pickupTime}
              onChange={(e) => onChange({ ...data, pickupTime: e.target.value })}
              placeholder="Pickup Time"
              className="admin-input"
            />
          </div>

          {/* Dropback Time */}
          <div>
            <Label className="admin-label">Dropback Time</Label>
            <Input
              value={data.dropbackTime}
              onChange={(e) =>
                onChange({ ...data, dropbackTime: e.target.value })
              }
              placeholder="Dropback Time"
              className="admin-input"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
