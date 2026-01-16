import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface InformationItem {
  id: string;
  value: string;
}

interface InformationBlock {
  id: string;
  title: string;
  items: InformationItem[];
}

interface InformationSectionProps {
  data: {
    minPeople: string;
    maxPeople: string;
    blocks: InformationBlock[];
  };
  onChange: (data: any) => void;
}

const defaultBlockTitles = [
  { key: "include", label: "Include", default: "Default: Include" },
  { key: "whyGo", label: "Why Should I go for This?", default: "Default: Why Should I go for This?" },
  { key: "important", label: "Important Information", default: "Default: Important Information" },
  { key: "additional", label: "Additional Information", default: "Default: Additional Information" },
  { key: "operating", label: "Operating Hours", default: "Default: Operating Hours" },
  { key: "booking", label: "Booking Policy", default: "Default: Booking Policy" },
  { key: "child", label: "Child Policy", default: "Default: Child Policy" },
];

export function InformationSection({ data, onChange }: InformationSectionProps) {
  const addItem = (blockId: string) => {
    const newItem: InformationItem = {
      id: Date.now().toString(),
      value: "",
    };
    onChange({
      ...data,
      blocks: data.blocks.map((block) =>
        block.id === blockId
          ? { ...block, items: [...block.items, newItem] }
          : block
      ),
    });
  };

  const updateItem = (blockId: string, itemId: string, value: string) => {
    onChange({
      ...data,
      blocks: data.blocks.map((block) =>
        block.id === blockId
          ? {
              ...block,
              items: block.items.map((item) =>
                item.id === itemId ? { ...item, value } : item
              ),
            }
          : block
      ),
    });
  };

  const removeItem = (blockId: string, itemId: string) => {
    onChange({
      ...data,
      blocks: data.blocks.map((block) =>
        block.id === blockId
          ? { ...block, items: block.items.filter((item) => item.id !== itemId) }
          : block
      ),
    });
  };

  return (
    <div className="admin-card animate-fade-in">
      <div className="admin-card-header">
        <h2 className="admin-card-title">Information</h2>
      </div>
      <div className="admin-card-body space-y-6">
        {/* Min/Max People */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="admin-label">Tour Min People</Label>
            <Input
              value={data.minPeople}
              onChange={(e) => onChange({ ...data, minPeople: e.target.value })}
              placeholder="Tour Min People"
              className="admin-input"
            />
          </div>
          <div>
            <Label className="admin-label">Tour Max People</Label>
            <Input
              value={data.maxPeople}
              onChange={(e) => onChange({ ...data, maxPeople: e.target.value })}
              placeholder="Tour Max People"
              className="admin-input"
            />
          </div>
        </div>

        {/* Information Blocks */}
        {data.blocks.map((block) => (
          <div key={block.id} className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">{block.title}</h3>
            {block.items.map((item, index) => (
              <div key={item.id} className="flex gap-2">
                <div className="flex-1">
                  {index === 0 && <Label className="admin-label">Title</Label>}
                  <Input
                    value={item.value}
                    onChange={(e) => updateItem(block.id, item.id, e.target.value)}
                    placeholder={defaultBlockTitles.find(b => b.label === block.title)?.default || ""}
                    className="admin-input"
                  />
                </div>
                {block.items.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(block.id, item.id)}
                    className="mt-7 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <div className="flex justify-end">
              <Button
                onClick={() => addItem(block.id)}
                className="bg-primary hover:bg-primary/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add item
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
