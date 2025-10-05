import { List } from "../../types";

const TOKEN_KEY = "groceries-lists";

function saveLists(lists: List[]) {
  if (lists != null) {
    localStorage.setItem(TOKEN_KEY, JSON.stringify({ lists }));
  }
}

export class LocalGateWay {
  getLists = async () => {
    const groceriesList = localStorage.getItem(TOKEN_KEY) ?? '{ "lists": [] }';
    const { lists } = JSON.parse(
      groceriesList != null ? groceriesList : '{ "lists": [] }'
    );

    return lists;
  };

  addList = (list: List) => {
    const groceriesList = localStorage.getItem(TOKEN_KEY) ?? '{ "lists": [] }';
    const { lists } = JSON.parse(groceriesList);

    const newLists: List[] = [...(lists ?? []), list];

    saveLists(newLists);
    return newLists;
  };

  deleteList = (listId: string) => {
    const groceriesList = localStorage.getItem(TOKEN_KEY) ?? '{ "lists": [] }';
    const { lists } = JSON.parse(groceriesList);

    const newLists: List[] = [...(lists ?? [])];

    saveLists(newLists.filter((list) => list._id !== listId));
  };

  updateList = (list: List) => {
    const groceriesList = localStorage.getItem(TOKEN_KEY) ?? '{ "lists": [] }';
    const { lists } = JSON.parse(groceriesList);

    const newLists: List[] = [
      ...(lists.filter((l: List) => l._id !== list._id) ?? []),
      list,
    ];
    saveLists(newLists);
  };

  loginUser = async (user: { userName: string; password: string }) => {
    for (var key in localStorage) {
      if (key.startsWith("groceries-user-key")) {
        const credentials = JSON.parse(localStorage.getItem(key)!);
        if (
          credentials.userName === user.userName &&
          credentials.password === user.password
        ) {
          return { key, error: null };
        }
      }
    }

    return { key: null, error: "User not found" };
  };

  signupUser = async (user: { userName: string; password: string }) => {
    const { userName, password } = user;
    const userKey = `groceries-user-key-${String(Math.random()).substring(2, 11)}`;

    const data = JSON.stringify({ userName, password });
    localStorage.setItem(userKey, data);

    return userKey;
  };
}
