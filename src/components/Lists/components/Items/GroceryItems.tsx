import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils"; // shadcn helper (for conditional classes)
import React from "react";
import { Item } from "types";

interface GroceryItemsProps {
  items: Item[];
  onIngredientClick?: (itemId: string) => void;
}

export const GroceryItems: React.FC<GroceryItemsProps> = ({
  items,
  onIngredientClick,
}) => {
  return (
    <div className="space-y-2 px-[10%]">
      {items.map((item) => (
        <Card
          key={item.itemId}
          onClick={() => onIngredientClick?.(item.itemId)}
          className={cn(
            "cursor-pointer transition-all hover:bg-muted",
            "border border-border rounded-xl"
          )}
        >
          <CardContent className="flex items-center gap-3 justify-between">
            <div>
              <Checkbox checked={item.completed} />
              <span
                className={cn(
                  "ml-2",
                  item.completed && "line-through text-muted-foreground"
                )}
              >
                {item.name}
              </span>
            </div>
            <div>
              <span>{item.price ? `€${item.price.toFixed(2)}` : null}</span>
              <span className="ml-2">
                {item.completedBy ? `- Purchsed by ${item.completedBy}` : null}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
