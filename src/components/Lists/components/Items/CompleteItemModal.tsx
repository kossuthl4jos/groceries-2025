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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
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
  handleOnClickDelete,
}: CompleteItemModalProps) => {
  const [completedBy, setCompletedBy] = useState("");
  const [price, setPrice] = useState("");

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
                <InputGroupText>$</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput placeholder="0.00" />
              <InputGroupAddon align="inline-end">
                <InputGroupText>USD</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>https://</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput placeholder="example.com" className="!pl-0.5" />
              <InputGroupAddon align="inline-end">
                <InputGroupText>.com</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
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

    // <Modal show={completingItem} onHide={stopCompletingItem} centered>
    //   <ModalHeader>
    //     <ModalTitle>{item?.name}</ModalTitle>
    //     <Button variant="danger" onClick={handleOnClickDelete}>
    //       DELETE
    //     </Button>
    //   </ModalHeader>
    //   <ModalBody>
    //     <FormGroup controlId="itemPrice">
    //       <InputGroup>
    //         <InputGroupWithExtras.Text>€</InputGroupWithExtras.Text>
    //         <FormControl
    //           type="number"
    //           placeholder="Price"
    //           aria-describedby="inputGroupPrepend"
    //           onChange={(e: ChangeEvent) => {
    //             setPrice((e.target as HTMLInputElement).value);
    //           }}
    //           required
    //         />
    //       </InputGroup>
    //     </FormGroup>
    //     <FormControl
    //       type="text"
    //       placeholder="Purchased by"
    //       onChange={(e: ChangeEvent) => {
    //         setCompletedBy((e.target as HTMLInputElement).value);
    //       }}
    //     />
    //   </ModalBody>
    //   <ModalFooter>
    //     <ButtonToolbar className="justify-content-between">
    //       <ButtonGroup
    //         className="pull-left"
    //         aria-label="First group"
    //       ></ButtonGroup>
    //       <ButtonGroup aria-label="Second group">
    //         <Button variant="secondary" onClick={stopCompletingItem}>
    //           Close
    //         </Button>
    //         <Button
    //           variant="primary"
    //           onClick={() => handleOnClickSave(completedBy, price)}
    //           disabled={completedBy === "" || price === ""}
    //         >
    //           Save
    //         </Button>
    //       </ButtonGroup>
    //     </ButtonToolbar>
    //   </ModalFooter>
    // </Modal>
  );
};
