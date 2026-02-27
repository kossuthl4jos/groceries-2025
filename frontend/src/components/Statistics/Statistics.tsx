import { useEffect, useState } from "react";
import { Item, List } from "../../../types";
import { getLists } from "../../gateway";

export const Statistics = () => {
  const [lists, setLists] = useState<List[]>([]);

  useEffect(() => {
    const refreshLists = async () => {
      const newLists = await getLists();

      if (newLists) {
        setLists(newLists);
      }
    };

    refreshLists();
  }, []);

  // These functions are prepared for future statistics features
  const _getTotalAmountSpent = () => {
    const items = lists?.map((list: List) => list.items) ?? [];

    return items.reduce((total, listItems) => {
      const completedItems = listItems.filter((item: Item) => item.completed);

      return total + completedItems.reduce((sum, item) => {
        return sum + (!isNaN(item.price!) ? item.price! : 0);
      }, 0);
    }, 0);
  };

  const _getTotalAmountSpentOnList = (list: List) => {
    const completedItems = list.items.filter((item: Item) => item.completed);

    return completedItems.reduce((total, item) => {
      return total + (!isNaN(item.price!) ? item.price! : 0);
    }, 0);
  };

  const _hasAllCompleted = (items: Item[]) => {
    return items.every((item: Item) => item.completed);
  };

  return (
    <>
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
              <tr key={list.id}>
                <td>{index + 1}</td>
                <td>{list.name}</td>
                <td>{getTotalAmountSpentOnList(list)}</td>
                <td>{hasAllCompleted(list.items) ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </Table> */}
      </div>
    </>
  );
};
