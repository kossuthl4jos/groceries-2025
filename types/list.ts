export interface Item {
  itemId: string;
  name: string;
  completed: boolean;
  completedBy?: string;
  price?: number;
}

export interface List {
  _id: string;
  name: string;
  items: Item[];
}
