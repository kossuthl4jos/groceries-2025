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
    return list?.items != null
      ? list?.items.filter((item) => item.completed === true).length
      : 0;
  };

  return (
    <> ex bootstrap modal </>
    // <Modal show={show} onHide={stopDeletingList} centered>
    //   <ModalHeader closeButton>
    //     <ModalTitle>{`Delete a list - ${list?.name}`}</ModalTitle>
    //   </ModalHeader>

    //   <Modal.Body>
    //     Are you sure you want to dele this list?{" "}
    //     {numberOfItemsToComplete() > 0 ? "You still have items to buy." : ""}
    //   </Modal.Body>

    //   <Modal.Footer>
    //     <Button variant="secondary" onClick={stopDeletingList}>
    //       Close
    //     </Button>
    //     <Button
    //       disabled={list == null}
    //       onClick={() => handleOnClickDelete(list!._id)}
    //       variant="danger"
    //     >
    //       Delete
    //     </Button>
    //   </Modal.Footer>
    // </Modal>
  );
};
