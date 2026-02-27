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
  }, []); // Initial load only

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
