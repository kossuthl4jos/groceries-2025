import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils"; // shadcn helper (for conditional classes)
import React from "react";
import { Item } from "types";

interface GroceryItemsProps {
  items: Item[];
  onIngredientClick: (itemId: string) => void;
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
          onClick={() => onIngredientClick(item.itemId)}
          className={cn(
            "cursor-pointer transition-all hover:bg-muted",
            "border border-border rounded-xl"
          )}
        >
          <CardContent className="flex items-center gap-3">
            <Checkbox checked={item.completed} />
            <span
              className={cn(
                "text-base",
                item.completed && "line-through text-muted-foreground"
              )}
            >
              {item.name}
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
