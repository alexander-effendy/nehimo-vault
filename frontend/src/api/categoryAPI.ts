import api from "./utils";
import { IconType } from "react-icons";

interface CategoryPropAPI {
  name: string | null;
  type: string | null;
  icon: IconType | null;
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
  });
  if (response.request.status !== 200) {
    throw new Error('Fetching Categories Error: Response is not 200');
  }
  console.log('response OK for adding catagery')
}