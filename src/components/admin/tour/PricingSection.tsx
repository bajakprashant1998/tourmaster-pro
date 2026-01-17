import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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

interface PricingItem {
  id: string;
  title: string;
  price: string;
  transferOption: string;
  quantity: string;
}

interface PricingSectionProps {
  data: {
    tourPrice: string;
    salePrice: string;
    enableServiceFee: boolean;
    enableExtraFee: boolean;
    pricingItems: PricingItem[];
  };
  onChange: (data: any) => void;
}

export function PricingSection({ data, onChange }: PricingSectionProps) {
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
      const oldIndex = data.pricingItems.findIndex((item) => item.id === active.id);
      const newIndex = data.pricingItems.findIndex((item) => item.id === over.id);
      onChange({
        ...data,
        pricingItems: arrayMove(data.pricingItems, oldIndex, newIndex),
      });
    }
  };

  const addPricingItem = () => {
    const newItem: PricingItem = {
      id: Date.now().toString(),
      title: "",
      price: "",
      transferOption: "",
      quantity: "",
    };
    onChange({
      ...data,
      pricingItems: [...data.pricingItems, newItem],
    });
  };

  const updatePricingItem = (id: string, field: keyof PricingItem, value: string) => {
    onChange({
      ...data,
      pricingItems: data.pricingItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  const removePricingItem = (id: string) => {
    onChange({
      ...data,
      pricingItems: data.pricingItems.filter((item) => item.id !== id),
    });
  };

  return (
    <div className="admin-card animate-fade-in">
      <div className="admin-card-header">
        <h2 className="admin-card-title">Pricing</h2>
      </div>
      <div className="admin-card-body space-y-6">
        {/* Tour Price */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4">Tour Price</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="admin-label">Price</Label>
              <Input
                value={data.tourPrice}
                onChange={(e) => onChange({ ...data, tourPrice: e.target.value })}
                placeholder="Tour Price"
                className="admin-input"
              />
            </div>
            <div>
              <Label className="admin-label">Sale Price</Label>
              <Input
                value={data.salePrice}
                onChange={(e) => onChange({ ...data, salePrice: e.target.value })}
                placeholder="Tour Sale Price"
                className="admin-input"
              />
            </div>
          </div>
          <p className="admin-hint">
            If the regular price is less than the discount, it will show the regular price
          </p>
        </div>

        {/* Dynamic Pricing Table */}
        <div>
          <p className="text-xs text-muted-foreground mb-2">
            Drag rows to reorder pricing items
          </p>
          <div className="border border-border rounded-lg overflow-hidden">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={data.pricingItems}
                strategy={verticalListSortingStrategy}
              >
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th className="w-8"></th>
                      <th>Title & Price</th>
                      <th>Transfer Option</th>
                      <th>Quantity</th>
                      <th className="w-12"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.pricingItems.map((item) => (
                      <SortableTableRow key={item.id} id={item.id}>
                        <td>
                          <Input
                            value={item.title}
                            onChange={(e) => updatePricingItem(item.id, "title", e.target.value)}
                            placeholder="Title & Price"
                            className="admin-input"
                          />
                        </td>
                        <td>
                          <Input
                            value={item.transferOption}
                            onChange={(e) => updatePricingItem(item.id, "transferOption", e.target.value)}
                            placeholder="Transfer Option"
                            className="admin-input"
                          />
                        </td>
                        <td>
                          <Input
                            value={item.quantity}
                            onChange={(e) => updatePricingItem(item.id, "quantity", e.target.value)}
                            placeholder="Qty"
                            className="admin-input"
                          />
                        </td>
                        <td>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removePricingItem(item.id)}
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
          <div className="flex justify-end mt-4">
            <Button onClick={addPricingItem} className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add item
            </Button>
          </div>
        </div>

        {/* Service Fee */}
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-foreground mb-2">Service fee</h3>
            <div className="flex items-center gap-3">
              <Checkbox
                id="serviceFee"
                checked={data.enableServiceFee}
                onCheckedChange={(checked) =>
                  onChange({ ...data, enableServiceFee: checked })
                }
              />
              <Label htmlFor="serviceFee" className="text-sm cursor-pointer">
                Enable service fee
              </Label>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-foreground mb-2">Extra Fees</h3>
            <div className="flex items-center gap-3">
              <Checkbox
                id="extraFee"
                checked={data.enableExtraFee}
                onCheckedChange={(checked) =>
                  onChange({ ...data, enableExtraFee: checked })
                }
              />
              <Label htmlFor="extraFee" className="text-sm cursor-pointer">
                Enable extra fee
              </Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
