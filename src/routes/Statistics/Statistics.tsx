import { Fragment, useEffect, useState } from "react";
import { Item, List } from "../../../types";
import { getLists } from "../../gateway";

export const Statistics = () => {
  const [lists, setLists] = useState<Array<List>>([]);

  const refreshLists = async () => {
    const newLists = await getLists();

    if (newLists != null) {
      setLists(newLists);
    }
  };

  useEffect(() => {
    refreshLists();
  }, []);

  const getTotalAmountSpent = () => {
    let totalAmountSpent = 0;
    const items = lists?.map((list: List) => list.items) ?? [];

    for (let i = 0; i < items.length; i++) {
      const completedItems = items[i].filter((item: Item) => item.completed);

      if (completedItems.length > 0) {
        for (let i = 0; i < completedItems.length; i++) {
          if (!isNaN(completedItems[i].price!)) {
            totalAmountSpent += completedItems[i].price!;
          }
        }
      }
    }

    return totalAmountSpent;
  };

  const getTotalAmountSpentOnList = (list: List) => {
    let totalAmountSpent = 0;

    const completedItems = list.items.filter((item: Item) => item.completed);

    if (completedItems.length > 0) {
      for (let i = 0; i < completedItems.length; i++) {
        if (!isNaN(completedItems[i].price!)) {
          totalAmountSpent += completedItems[i].price!;
        }
      }
    }

    return totalAmountSpent;
  };

  const hasAllCompleted = (items: Array<Item>) => {
    return items.every((item: Item) => item.completed);
  };

  return (
    <Fragment>
      <div className="main-component">
        ex bootstrap Jumbotron
        {/* <Jumbotron style={{ textAlign: "center" }}>
          <h1>Total spent: {getTotalAmountSpent()}</h1>
        </Jumbotron> */}
      </div>
      <div className="main-component" style={{ textAlign: "center" }}>
        <h4>Breakdown by meals:</h4>
        ex bootstrap Table
        {/* <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Grocery list</th>
              <th>Amount spent</th>
              <th>Finished</th>
            </tr>
          </thead>
          <tbody>
            {lists.map((list, index) => (
              <tr key={list._id}>
                <td>{index + 1}</td>
                <td>{list.name}</td>
                <td>{getTotalAmountSpentOnList(list)}</td>
                <td>{hasAllCompleted(list.items) ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </Table> */}
      </div>
    </Fragment>
  );
};
