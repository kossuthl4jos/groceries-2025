import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusIcon, Trash } from "lucide-react";
import { ChangeEvent, Fragment, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { List } from "../../../../../types";
import { addList, deleteList, updateList } from "../../../../gateway";
import { AddListModal, DeleteListModal } from "./";

export const ListManager = ({
  lists,
  refreshLists,
  selectedListId,
  updateSelectedListId,
}: {
  lists?: List[];
  refreshLists: () => Promise<void>;
  selectedListId?: string;
  updateSelectedListId: (selectedListId?: string) => void;
}) => {
  const [addListModalVisible, setAddListModalVisible] = useState(false);
  const [deleteListModalVisible, setDeleteListModalVisible] = useState(false);
  const [addingItem, setAddingItem] = useState(false);
  const [newItemName, setNewItemName] = useState("");

  const selectedList = lists?.find((list) => list._id === selectedListId);

  const stopAddingItem = () => {
    setAddingItem(false);
  };

  const clearStateForItem = () => {
    setNewItemName("");
  };

  const handleOnClickSaveNewList = async (newListName: string) => {
    const newList = {
      _id: uuidv4(),
      name: newListName,
      items: [],
    };

    const { _id } = await addList(newList);
    await refreshLists();

    if (_id != null) {
      updateSelectedListId(_id);
    }
    setAddListModalVisible(false);
  };

  const handleOnClickDeleteList = async (listId: string) => {
    await deleteList(listId);
    await refreshLists();
    if (lists != null && lists.length > 0) {
      updateSelectedListId(lists[0]._id);
    } else {
      updateSelectedListId(undefined);
    }
    setDeleteListModalVisible(false);
  };

  const handleOnClickAdd = async () => {
    const newItem = {
      itemId: uuidv4(),
      name: newItemName,
      completed: false,
    };

    if (selectedList != null) {
      await updateList({
        _id: selectedList._id,
        name: selectedList.name,
        items: [...selectedList.items, newItem],
      });
      await refreshLists();
      stopAddingItem();
      clearStateForItem();
    }
  };

  const toogleItemForm = () => {
    setAddingItem(!addingItem);
  };

  const handleNewItemName = (e: ChangeEvent) => {
    setNewItemName((e.target as HTMLInputElement).value);
  };

  return (
    <div className="list-manager flex flex-col items-center gap-4 p-4 border-b">
      <div className="list-controls">
        <ButtonGroup>
          <Button
            onClick={() => setAddListModalVisible(true)}
            variant="default"
          >
            <PlusIcon /> Add new list
          </Button>
          <Button
            disabled={selectedListId == null}
            variant="destructive"
            onClick={() => setDeleteListModalVisible(true)}
          >
            <Trash /> Delete current list
          </Button>
        </ButtonGroup>
      </div>
      <div className="list-select">
        {lists != null && lists.length > 0 ? (
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a list" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {lists?.map((list) => (
                  <SelectItem key={list._id} value={list._id}>
                    {list.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        ) : (
          <div>Please create a list first</div>
        )}

        {/* <Form>
        <FormGroup controlId="selectList">
          <InputGroup>
            <FormControl
                ))

            </SelectGroup>
          </SelectContent>
        </Select>) : <div>Please create a list first</div>}
        
        {/* <Form>
        <FormGroup controlId="selectList">
          <InputGroup>
            <FormControl
              onChange={(e: ChangeEvent) =>
                updateSelectedListId((e.target as HTMLInputElement).value)
              }
            </SelectGroup>
          </SelectContent>
        </Select>
        {/* <Form>
        <FormGroup controlId="selectList">
          <InputGroup>
            <FormControl
              onChange={(e: ChangeEvent) =>
                updateSelectedListId((e.target as HTMLInputElement).value)
              }
              value={selectedListId}
              as="select"
            >
              {lists != null && lists.length > 0 ? (
                lists.map((list: List) => (
                  <option value={list._id} key={list._id}>
                    {list.name}
                  </option>
                ))
              ) : (
                <option>Please create a list first</option>
              )}
              ;
            </FormControl>
          </InputGroup>
        </FormGroup>
      </Form> */}
      </div>
      {lists != null && lists.length > 0 ? (
        <Fragment>
          <div className="new-item-btn" onClick={toogleItemForm}>
            Add new item
          </div>
          ex bootsrtap
          {/* <Collapse in={addingItem}>
            <Form>
              <FormControl
                placeholder="Enter item name"
                value={newItemName}
                onChange={handleNewItemName}
              />
              <FormText className="text-muted">
                This item will be added to the selected shopping list.
              </FormText>
              <Button
                variant="primary"
                onClick={handleOnClickAdd}
                disabled={newItemName === ""}
              >
                Add
              </Button>
            </Form>
          </Collapse> */}
        </Fragment>
      ) : null}
      <AddListModal
        show={addListModalVisible}
        stopAddingList={() => setAddListModalVisible(false)}
        handleOnClickSave={handleOnClickSaveNewList}
      />
      <DeleteListModal
        list={lists?.find((list) => list._id === selectedListId)}
        show={deleteListModalVisible}
        stopDeletingList={() => setDeleteListModalVisible(false)}
        handleOnClickDelete={handleOnClickDeleteList}
      />
    </div>
  );
};
