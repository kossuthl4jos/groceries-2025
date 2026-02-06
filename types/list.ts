export interface Item {
  itemId: string;
  name: string;
  completed: boolean;
  completedBy?: string;
  price?: number;
}

export interface List {
  id: string;
  name: string;
  items: Item[];
}
