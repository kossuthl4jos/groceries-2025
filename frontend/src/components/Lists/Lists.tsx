import { useEffect, useState } from "react";
import { List } from "../../../types";
import { getLists } from "../../gateway";
import { Items, ListManager } from "./components";

export const Lists = () => {
  const [lists, setLists] = useState<List[]>([]);
  const [selectedListId, setSelectedListId] = useState<string>();
  const selectedList = lists.find((list) => list.id === selectedListId);

  const refreshLists = async () => {
    const newLists = await getLists();

    if (newLists) {
      setLists(newLists);
    }
  };

  useEffect(() => {
    refreshLists();
  }, []);

  useEffect(() => {
    if (lists.length === 0) {
      setSelectedListId(undefined);
      return;
    }

    const stillExists = lists.some((list) => list.id === selectedListId);

    if (!stillExists) {
      setSelectedListId(lists[0].id);
    }
  }, [lists, selectedListId]);

  return (
    <div>
      <ListManager
        lists={lists}
        refreshLists={refreshLists}
        selectedListId={selectedListId}
        updateSelectedListId={setSelectedListId}
      />
      {selectedList && (
        <Items selectedList={selectedList} refreshLists={refreshLists} />
      )}
    </div>
  );
};
