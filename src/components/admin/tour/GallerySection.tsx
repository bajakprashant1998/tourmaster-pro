import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Image, Plus, X, GripVertical } from "lucide-react";
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
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

interface GalleryImage {
  id: string;
  url: string;
}

interface GallerySectionProps {
  data: {
    images: GalleryImage[];
    enableFAQs: boolean;
  };
  onChange: (data: any) => void;
}

function SortableImage({
  image,
  onRemove,
}: {
  image: GalleryImage;
  onRemove: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative w-24 h-24 rounded-lg border border-border overflow-hidden group",
        isDragging && "opacity-50 shadow-xl z-50"
      )}
    >
      <div
        {...attributes}
        {...listeners}
        className="absolute top-1 left-1 w-6 h-6 bg-black/50 rounded flex items-center justify-center cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity z-10"
      >
        <GripVertical className="w-4 h-4 text-white" />
      </div>
      <img
        src={image.url}
        alt="Gallery"
        className="w-full h-full object-cover"
      />
      <button
        onClick={onRemove}
        className="absolute top-1 right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
}

export function GallerySection({ data, onChange }: GallerySectionProps) {
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
      const oldIndex = data.images.findIndex((img) => img.id === active.id);
      const newIndex = data.images.findIndex((img) => img.id === over.id);
      onChange({
        ...data,
        images: arrayMove(data.images, oldIndex, newIndex),
      });
    }
  };

  const removeImage = (id: string) => {
    onChange({
      ...data,
      images: data.images.filter((img) => img.id !== id),
    });
  };

  return (
    <div className="admin-card animate-fade-in">
      <div className="admin-card-header">
        <h2 className="admin-card-title">Gallery</h2>
      </div>
      <div className="admin-card-body space-y-6">
        {/* Gallery */}
        <div>
          <Label className="admin-label">Gallery</Label>
          <p className="text-xs text-muted-foreground mb-3">
            Drag images to reorder
          </p>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={data.images}
              strategy={rectSortingStrategy}
            >
              <div className="flex flex-wrap gap-3">
                {data.images.map((image) => (
                  <SortableImage
                    key={image.id}
                    image={image}
                    onRemove={() => removeImage(image.id)}
                  />
                ))}
                <Button
                  variant="outline"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 border-primary"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Select images
                </Button>
              </div>
            </SortableContext>
          </DndContext>
        </div>

        {/* Enable FAQs */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-3">
            Enable / Disable FAQs
          </h3>
          <div className="flex items-center gap-3">
            <Checkbox
              id="enableFAQs"
              checked={data.enableFAQs}
              onCheckedChange={(checked) =>
                onChange({ ...data, enableFAQs: checked })
              }
            />
            <Label htmlFor="enableFAQs" className="text-sm cursor-pointer">
              Enable FAQs
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
}
