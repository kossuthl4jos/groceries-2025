export interface Review {
  name: string;
  body: string;
}

export interface Book {
  title: string;
  author: string;
  pages: number;
  rating: number;
  genres: string[];
  reviews: Review[];
}
