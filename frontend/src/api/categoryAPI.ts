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
  const response = await api.get('/categories/');
  if (response.request.status !== 200) {
    throw new Error('Fetching Categories Error: Response is not 200');
  }
  return response.data;
}

export const addCategoryAPI = async (category: CategoryPropAPI) => {
  const response = await api.post('/categories', {
    name: category.name,
    type: category.type,
    icon: category.icon,
    colour: category.colour
  });
  if (response.request.status !== 200) {
    throw new Error('Fetching Categories Error: Response is not 200');
  }
  console.log('response OK for adding category');
  return response.data;
}

export const updateCategoryAPI = async (category: CategoryUpdatePropAPI) => {
  const response = await api.patch(`/categories/${category.id}`, {
    name: category.name,
    type: category.type,
    icon: category.icon,
    colour: category.colour
  });
  if (response.request.status !== 200) {
    throw new Error('Update Category Error: Response is not 200');
  }
  console.log('response OK for updating category');
}

export const deleteCategoryAPI = async (categoryId: number | null) => {
  console.log(categoryId);
  if (!categoryId) return;
  const response = await api.delete(`/categories/${categoryId}`);
  if (response.request.status !== 200) {
    throw new Error('Delete Category Error: Response is not 200');
  }
  console.log('response OK for deleting category');
}