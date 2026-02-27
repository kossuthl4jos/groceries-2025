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

interface AddListModalProps {
  show: boolean;
  stopAddingList: VoidFunction;
  handleOnClickSave: (newListName: string) => void;
}

export const AddListModal = ({
  show,
  stopAddingList,
  handleOnClickSave,
}: AddListModalProps) => {
  const [newListName, setnewListName] = useState("");

  return (
    <Dialog open={show} onOpenChange={stopAddingList}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create a new groceries list</DialogTitle>
            <DialogDescription>
              This will be the name of your new list, which then you can fill
              with ingredients
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
                value={newListName}
                onChange={(e) => setnewListName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={stopAddingList}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              onClick={() => handleOnClickSave(newListName)}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
