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
import { List } from "../../../../../types";

interface DeleteListModalProps {
  list?: List;
  show: boolean;
  stopDeletingList: VoidFunction;
  handleOnClickDelete: (listId: string) => void;
}

export const DeleteListModal = ({
  list,
  show,
  stopDeletingList,
  handleOnClickDelete,
}: DeleteListModalProps) => {
  const numberOfItemsToComplete = () => {
    return list?.items?.filter((item) => item.completed === true).length ?? 0;
  };

  return (
    <Dialog open={show} onOpenChange={stopDeletingList}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{`Delete a list - ${list?.name}`}</DialogTitle>
            <DialogDescription>
              This will permanently delete the list and all its items. Are you
              sure?
              {numberOfItemsToComplete() > 0
                ? " You still have items to buy."
                : ""}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={stopDeletingList}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              variant="destructive"
              disabled={!list}
              onClick={() => list && handleOnClickDelete(list.id)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
