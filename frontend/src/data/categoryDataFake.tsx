import { IconType } from "react-icons";
import { AiOutlineCloud, AiTwotoneDollar, AiTwotoneHeart, AiOutlineGlobal, AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";

export interface fakeCategoryInterface {
  key: number;
  categoryName: string;
  dateCreated: string;
  lastEdited: string;
  numberOfFile: number;
  icon: IconType;
}

const fakeCategoryData: fakeCategoryInterface[] = [
  {
    key: 1,
    categoryName: "Work",
    dateCreated: "2023-01-01",
    lastEdited: "2023-01-15",
    numberOfFile: 5,
    icon: AiOutlineCloud,
  },
  {
    key: 2,
    categoryName: "Personal",
    dateCreated: "2023-02-15",
    lastEdited: "2023-02-20",
    numberOfFile: 3,
    icon: AiTwotoneDollar,
  },
  {
    key: 3,
    categoryName: "Finance",
    dateCreated: "2023-03-10",
    lastEdited: "2023-03-12",
    numberOfFile: 7,
    icon: AiTwotoneHeart,
  },
  {
    key: 4,
    categoryName: "Travel",
    dateCreated: "2023-04-20",
    lastEdited: "2023-04-25",
    numberOfFile: 2,
    icon: AiOutlineGlobal,
  },
  {
    key: 5,
    categoryName: "Shopping",
    dateCreated: "2023-05-05",
    lastEdited: "2023-05-10",
    numberOfFile: 8,
    icon: AiOutlineShoppingCart,
  },
  {
    key: 6,
    categoryName: "Health",
    dateCreated: "2023-06-15",
    lastEdited: "2023-06-20",
    numberOfFile: 4,
    icon: AiOutlineHeart,
  },
];

export default fakeCategoryData;