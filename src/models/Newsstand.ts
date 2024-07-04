export interface Category {
  id: number;
  name: string;
}
export type MediaIdByCategories = {
  mediaIds: number[];
  category: Category;
}[];
