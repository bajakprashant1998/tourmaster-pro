import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";

interface RelatedToursSectionProps {
  data: {
    tours: string[];
  };
  onChange: (data: any) => void;
}

export function RelatedToursSection({ data, onChange }: RelatedToursSectionProps) {
  return (
    <div className="admin-card animate-fade-in">
      <div className="admin-card-header">
        <h2 className="admin-card-title">You May Also Like Section</h2>
      </div>
      <div className="admin-card-body space-y-4">
        <div className="border border-border rounded-lg p-4 min-h-[100px] flex items-center justify-center">
          {data.tours.length === 0 ? (
            <p className="text-muted-foreground text-sm">Select Tours</p>
          ) : (
            <div className="flex flex-wrap gap-2 w-full">
              {data.tours.map((tour, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-full text-sm"
                >
                  <span>{tour}</span>
                  <button
                    onClick={() =>
                      onChange({
                        ...data,
                        tours: data.tours.filter((_, i) => i !== index),
                      })
                    }
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Add item
          </Button>
        </div>
      </div>
    </div>
  );
}
