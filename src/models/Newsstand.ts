export interface Category {
  id: number;
  name: string;
}
export type MediaIdByCategories = {
  mediaId: number;
  category: Category;
}[];
