import { Fragment, useState } from "react";
import { Item, List } from "../../../../../types";
import { updateList } from "../../../../gateway";
import { CompleteItemModal, GroceryItems } from "./";

export const Items = ({
  selectedList,
  refreshLists,
}: {
  selectedList: List;
  refreshLists: () => Promise<void>;
}) => {
  const [showCompletedItems, setShowCompletedItems] = useState(true);
  const [completingItem, setCompletingItem] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState("");

  const items = selectedList.items;
  const itemsToComplete = items.filter(
    (item: Item) => item.completed === false
  );
  const completedItems = items.filter((item: Item) => item.completed === true);
  const stopCompletingItem = () => {
    setCompletingItem(false);
    setSelectedItemId("");
  };

  const handleOnClickSave = async (completedBy: string, price: string) => {
    const completedItem = {
      itemId: selectedItemId,
      name: getSelectedItem().name,
      completed: true,
      completedBy,
      price: Number(price),
    };

    if (selectedList != null) {
      await updateList({
        id: selectedList.id,
        name: selectedList.name,
        items: [
          ...selectedList.items.filter(
            (i: Item) => i.itemId !== selectedItemId
          ),
          completedItem,
        ],
      });
      await refreshLists();
      stopCompletingItem();
    }
  };

  const handleOnClickDelete = () => {
    if (selectedList != null) {
      updateList({
        id: selectedList.id,
        name: selectedList.name,
        items: [
          ...selectedList.items.filter((item) => item.itemId != selectedItemId),
        ],
      });
      setCompletingItem(false);
    }
  };

  const startCompletingItem = (itemId: string) => {
    setCompletingItem(true);
    setSelectedItemId(itemId);
  };

  const hasSomeCompleted = items.some((item: Item) => item.completed);

  const hasAllCompleted = items.every((item: Item) => item.completed);

  const toogleCompletedItems = () => {
    setShowCompletedItems(!showCompletedItems);
  };

  const getSelectedItem = (): Item => {
    return items.find((item: Item) => item.itemId === selectedItemId)!;
  };

  const getItemPlaceholder = () => {
    return (
      <div className="itemPlaceholder">
        {items.length === 0
          ? "Let's get started, add a new item"
          : "Good job, you are all set"}
      </div>
    );
  };

  return (
    <div className="list-items py-4 px-[5%]">
      {hasAllCompleted ? (
        getItemPlaceholder()
      ) : (
        <GroceryItems
          items={itemsToComplete}
          onIngredientClick={startCompletingItem}
        />
      )}
      {hasSomeCompleted && (
        <Fragment>
          <div className="formGroup">
            <div
              className="completed-header input-group"
              onClick={toogleCompletedItems}
            >
              completed
              <span className={showCompletedItems ? "active arrow" : "arrow"}>
                <span />
                <span />
              </span>
            </div>
          </div>
          <div>
            {completedItems.length !== 0 ? (
              <GroceryItems items={completedItems} />
            ) : null}
          </div>
        </Fragment>
      )}

      <CompleteItemModal
        completingItem={completingItem}
        stopCompletingItem={stopCompletingItem}
        itemName={
          items.find((item: Item) => item.itemId === selectedItemId)?.name ?? ""
        }
        handleOnClickSave={handleOnClickSave}
        handleOnClickDelete={handleOnClickDelete}
      />
    </div>
  );
};
