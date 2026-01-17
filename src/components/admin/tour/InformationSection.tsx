import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, GripVertical } from "lucide-react";
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
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

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

function SortableInfoItem({
  item,
  blockId,
  onUpdate,
  onRemove,
  placeholder,
  canRemove,
}: {
  item: InformationItem;
  blockId: string;
  onUpdate: (value: string) => void;
  onRemove: () => void;
  placeholder: string;
  canRemove: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex gap-2 items-center",
        isDragging && "opacity-50 bg-muted rounded z-50"
      )}
    >
      <button
        type="button"
        className="touch-none cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="w-4 h-4 text-muted-foreground" />
      </button>
      <div className="flex-1">
        <Input
          value={item.value}
          onChange={(e) => onUpdate(e.target.value)}
          placeholder={placeholder}
          className="admin-input"
        />
      </div>
      {canRemove && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}

export function InformationSection({ data, onChange }: InformationSectionProps) {
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

  const handleDragEnd = (blockId: string) => (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const block = data.blocks.find((b) => b.id === blockId);
      if (!block) return;

      const oldIndex = block.items.findIndex((item) => item.id === active.id);
      const newIndex = block.items.findIndex((item) => item.id === over.id);

      onChange({
        ...data,
        blocks: data.blocks.map((b) =>
          b.id === blockId
            ? { ...b, items: arrayMove(b.items, oldIndex, newIndex) }
            : b
        ),
      });
    }
  };

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
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-foreground">{block.title}</h3>
              <span className="text-xs text-muted-foreground">Drag to reorder</span>
            </div>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd(block.id)}
            >
              <SortableContext
                items={block.items}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2">
                  {block.items.map((item) => (
                    <SortableInfoItem
                      key={item.id}
                      item={item}
                      blockId={block.id}
                      onUpdate={(value) => updateItem(block.id, item.id, value)}
                      onRemove={() => removeItem(block.id, item.id)}
                      placeholder={defaultBlockTitles.find(b => b.label === block.title)?.default || ""}
                      canRemove={block.items.length > 1}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
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
