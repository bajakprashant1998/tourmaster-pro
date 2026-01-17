import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableTableRow } from "@/components/ui/sortable";

interface TimingItem {
  id: string;
  leftHeading: string;
  rightDescription: string;
}

interface ActivityTimingSectionProps {
  data: {
    title: string;
    items: TimingItem[];
  };
  onChange: (data: any) => void;
}

export function ActivityTimingSection({ data, onChange }: ActivityTimingSectionProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = data.items.findIndex((item) => item.id === active.id);
      const newIndex = data.items.findIndex((item) => item.id === over.id);
      onChange({
        ...data,
        items: arrayMove(data.items, oldIndex, newIndex),
      });
    }
  };

  const addItem = () => {
    const newItem: TimingItem = {
      id: Date.now().toString(),
      leftHeading: "",
      rightDescription: "",
    };
    onChange({
      ...data,
      items: [...data.items, newItem],
    });
  };

  const updateItem = (id: string, field: keyof TimingItem, value: string) => {
    onChange({
      ...data,
      items: data.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  const removeItem = (id: string) => {
    onChange({
      ...data,
      items: data.items.filter((item) => item.id !== id),
    });
  };

  return (
    <div className="admin-card animate-fade-in">
      <div className="admin-card-header">
        <h2 className="admin-card-title">Activity Timing & Location</h2>
      </div>
      <div className="admin-card-body space-y-4">
        {/* Title */}
        <div>
          <Input
            value={data.title}
            onChange={(e) => onChange({ ...data, title: e.target.value })}
            placeholder="Default: Activity Timing & Location"
            className="admin-input"
          />
        </div>

        {/* Timing Table */}
        <p className="text-xs text-muted-foreground">
          Drag rows to reorder timing items
        </p>
        <div className="border border-border rounded-lg overflow-hidden">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={data.items}
              strategy={verticalListSortingStrategy}
            >
              <table className="admin-table">
                <thead>
                  <tr>
                    <th className="w-8"></th>
                    <th className="w-1/3">Left Heading</th>
                    <th>Right Description</th>
                    <th className="w-12"></th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((item) => (
                    <SortableTableRow key={item.id} id={item.id}>
                      <td>
                        <Input
                          value={item.leftHeading}
                          onChange={(e) =>
                            updateItem(item.id, "leftHeading", e.target.value)
                          }
                          placeholder="Heading"
                          className="admin-input"
                        />
                      </td>
                      <td>
                        <Input
                          value={item.rightDescription}
                          onChange={(e) =>
                            updateItem(item.id, "rightDescription", e.target.value)
                          }
                          placeholder="Description"
                          className="admin-input"
                        />
                      </td>
                      <td>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </SortableTableRow>
                  ))}
                </tbody>
              </table>
            </SortableContext>
          </DndContext>
        </div>

        <div className="flex justify-end">
          <Button onClick={addItem} className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Add item
          </Button>
        </div>
      </div>
    </div>
  );
}
