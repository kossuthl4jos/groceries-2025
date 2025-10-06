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
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface AddItemModalProps {
  show: boolean;
  selectedListName: string;
  stopAddingItem: VoidFunction;
  handleOnClickSave: (newItemName: string) => void;
}

export const AddItemModal = ({
  show,
  selectedListName,
  stopAddingItem,
  handleOnClickSave,
}: AddItemModalProps) => {
  const [newItemName, setNewItemName] = useState("");

  return (
    <Dialog open={show} onOpenChange={stopAddingItem}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add a new item</DialogTitle>
            <DialogDescription>
              This will add a new item to your list{" "}
              <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                {selectedListName}
              </code>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input
                type="text"
                id="listName"
                name="name"
                defaultValue="Spagetti Bolognese"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={stopAddingItem}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              onClick={() => handleOnClickSave(newItemName)}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
