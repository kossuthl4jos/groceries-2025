import React, { Fragment, useState } from 'react';
import { Collapse } from 'react-bootstrap';
import { updateList } from '../../../../gateway';
import { Item, List } from '~/types';
import { GroceryItem, CompleteItemModal } from './';

export const Items = ({
  selectedList,
  refreshLists,
}: {
  selectedList: List;
  refreshLists: () => Promise<void>;
}) => {
  const [showCompletedItems, setShowCompletedItems] = useState(true);
  const [completingItem, setCompletingItem] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState('');

  const items = selectedList.items;
  const completedItems = items.filter((item: Item) => item.completed === true);
  const stopCompletingItem = () => {
    setCompletingItem(false);
    setSelectedItemId('');
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
        _id: selectedList._id,
        name: selectedList.name,
        items: [
          ...selectedList.items.filter((i: Item) => i.itemId !== selectedItemId),
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
        _id: selectedList._id,
        name: selectedList.name,
        items: [...selectedList.items.filter((item) => item.itemId != selectedItemId)],
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
        {items.length === 0 ? "Let's get started, add a new item" : 'Good job, you are all set'}
      </div>
    );
  };

  return (
    <div className="main-component">
      {hasAllCompleted
        ? getItemPlaceholder()
        : items.map(
            (item: Item) =>
              !item.completed && (
                <GroceryItem
                  item={item}
                  key={item.itemId}
                  startCompletingItem={startCompletingItem}
                />
              ),
          )}
      {hasSomeCompleted && (
        <Fragment>
          <div className="formGroup">
            <div className="completed-header input-group" onClick={toogleCompletedItems}>
              completed
              <span className={showCompletedItems ? 'active arrow' : 'arrow'}>
                <span />
                <span />
              </span>
            </div>
          </div>
          <Collapse in={showCompletedItems}>
            <div>
              {completedItems.length !== 0
                ? completedItems.map((item: Item) => <GroceryItem key={item.itemId} item={item} />)
                : null}
            </div>
          </Collapse>
        </Fragment>
      )}

      <CompleteItemModal
        completingItem={completingItem}
        stopCompletingItem={stopCompletingItem}
        item={items.find((item: Item) => item.itemId === selectedItemId)!}
        handleOnClickSave={handleOnClickSave}
        handleOnClickDelete={handleOnClickDelete}
      />
    </div>
  );
};
