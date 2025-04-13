import api from "./utils";
import { IconType } from "react-icons";

interface CategoryPropAPI {
  name: string | null | undefined;
  type: string | null | undefined;
  icon: IconType | null | undefined;
  colour: string | null | undefined;
}

interface CategoryUpdatePropAPI {
  id: number | null | undefined;
  name: string | null | undefined;
  type: string | null | undefined;
  icon: IconType | null | undefined;
  colour: string | null | undefined;
}

export const fetchCategories = async () => {
  try {
    const response = await api.get('/categories/');
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const addCategoryAPI = async (category: CategoryPropAPI) => {
  try {
    const response = await api.post('/categories', {
      name: category.name,
      type: category.type,
      icon: category.icon,
      colour: category.colour
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const updateCategoryAPI = async (category: CategoryUpdatePropAPI) => {
  try {
    const response = await api.put(`/categories/${category.id}`, {
      name: category.name,
      type: category.type,
      icon: category.icon,
      colour: category.colour
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

export const deleteCategoryAPI = async (categoryId: number | null) => {
  if (!categoryId) return;
  try {
    const response = await api.delete(`/categories/${categoryId}`);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}