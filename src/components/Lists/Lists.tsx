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

    if (newLists != null) {
      setLists(newLists);
    }
  };

  useEffect(() => {
    if (lists != null && lists.length > 0) {
      setSelectedListId(lists[lists.length - 1].id);
    }
  }, [lists]);

  useEffect(() => {
    refreshLists();
  }, []);

  return (
    <div>
      <ListManager
        lists={lists}
        refreshLists={refreshLists}
        selectedListId={selectedListId}
        updateSelectedListId={setSelectedListId}
      />
      {selectedList != null ? (
        <Items selectedList={selectedList} refreshLists={refreshLists} />
      ) : null}
    </div>
  );
};
