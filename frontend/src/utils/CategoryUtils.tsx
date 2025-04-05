import { CategoryComponentProp } from "../features/category/CategorySlice"

export const categoryChooser = (categories: CategoryComponentProp[], id: number) => {
  console.log(categories, id);
  return categories.filter((category) => category.id === id)[0];
}