import { useEffect, useState } from "react";
import { List } from "../../../types";
import { getLists } from "../../gateway";
import { Items, ListManager } from "./components";

export const Lists = () => {
  const [lists, setLists] = useState<List[]>([]);
  const [selectedListId, setSelectedListId] = useState<string>();
  const selectedList = lists.find((list) => list._id === selectedListId);

  const refreshLists = async () => {
    const newLists = await getLists();

    if (newLists != null) {
      setLists(newLists);
    }
  };

  useEffect(() => {
    if (lists != null && lists.length > 0 && selectedListId == null) {
      setSelectedListId(lists[0]._id);
    }
  }, [lists]);

  useEffect(() => {
    refreshLists();
  }, []);

  return (
    <div style={{ maxHeight: "calc(100vh - 112px)", overflowY: "auto" }}>
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
