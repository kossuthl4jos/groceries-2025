import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface CompleteItemModalProps {
  itemName: string;
  completingItem: boolean;
  stopCompletingItem: VoidFunction;
  handleOnClickSave: (completedBy: string, price: string) => void;
  handleOnClickDelete: VoidFunction;
}

export const CompleteItemModal = ({
  itemName,
  completingItem,
  stopCompletingItem,
  handleOnClickSave,
  handleOnClickDelete: _handleOnClickDelete,
}: CompleteItemModalProps) => {
  const [price, setPrice] = useState("");
  const [completedBy, setCompletedBy] = useState("");

  return (
    <Dialog open={completingItem} onOpenChange={stopCompletingItem}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Ingredient - {itemName}</DialogTitle>
            <DialogDescription>
              This will mark this item as completed, please provide additional
              deatils for reporting purposes.
            </DialogDescription>
          </DialogHeader>
          <div className="grid w-full max-w-sm gap-6">
            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>€</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupText>EUR</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            <Label htmlFor="completedBy">Completed By</Label>
            <Input
              id="completedBy"
              type="text"
              value={completedBy}
              onChange={(e) => setCompletedBy(e.target.value)}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={stopCompletingItem}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              onClick={() => handleOnClickSave(completedBy, price)}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>

  
  );
};
