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
import { Fragment, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { List } from "../../../../../types";
import { addList, deleteList, updateList } from "../../../../gateway";
import { AddListModal, DeleteListModal } from "./";
import { AddItemModal } from "./AddItemModal";

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

  const selectedList = lists?.find((list) => list._id === selectedListId);

  const stopAddingItem = () => {
    setAddingItem(false);
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

  const handleOnClickAddItem = async (newItemName: string) => {
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
    }
  };

  const toogleItemForm = () => {
    setAddingItem(!addingItem);
  };

  return (
    <div className="list-manager flex flex-col items-center gap-6 py-4 px-[5%]">
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
          <Select
            value={selectedListId}
            onValueChange={(value: string) => updateSelectedListId(value)}
          >
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
      </div>
      {lists != null && lists.length > 0 && selectedList ? (
        <Fragment>
          <div className="list-details border-b w-full pb-1 my-3 flex justify-between">
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              {selectedList.name}
            </h2>
            <div className="flex flex-col gap-8">
              <Button variant="outline" size="sm" onClick={toogleItemForm}>
                <PlusIcon /> Add new item
              </Button>
            </div>
          </div>
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
      <AddItemModal
        show={addingItem}
        selectedListName={selectedList?.name ?? ""}
        stopAddingItem={() => setAddingItem(false)}
        handleOnClickSave={handleOnClickAddItem}
      />
    </div>
  );
};
