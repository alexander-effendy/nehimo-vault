import { CategoryComponentProp } from "../features/CategorySlice"

export const categoryChooser = (categories: CategoryComponentProp[], id: number | null) => {
  if (!id) return;
  return categories.filter((category) => category.id === id)[0];
}

export const categoryChooseHighestId = (categories: CategoryComponentProp[]) => {
  let highestIdTemp = -1;
  categories.forEach((category) => {
    if (highestIdTemp < category.id) highestIdTemp = category.id;
  })
  return highestIdTemp + 1;
}