import { Fragment, useState } from "react";
import { Item } from "../../../../../types";

export const GroceryItem = ({
  item,
  startCompletingItem,
}: {
  item: Item;
  startCompletingItem?: (id: string) => void;
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const completed = item.completed;
  const toogleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <Fragment>
      <div
        className="item"
        onClick={completed ? toogleDetails : undefined}
        style={completed ? { textDecoration: "line-through" } : undefined}
      >
        {item.name}
        <div
          onClick={
            startCompletingItem != null
              ? () => startCompletingItem(item.itemId)
              : undefined
          }
          className={completed ? "completed-check-box" : "check-box"}
        >
          <i className="fas fa-check fa-xs" />
        </div>
      </div>
      {showDetails && (
        <> ex bootstrap modal </>

        // <ListGroup variant="flush">
        //   <ListGroupItem style={{ padding: '0.25rem 1.5rem', fontStyle: 'italic' }}>
        //     by {item.completedBy}
        //   </ListGroupItem>
        //   <ListGroupItem style={{ padding: '0.25rem 1.5rem', fontWeight: 'bold' }}>
        //     {item.price} €
        //   </ListGroupItem>
        // </ListGroup>
      )}
    </Fragment>
  );
};
