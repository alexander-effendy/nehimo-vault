import api from "./utils";

interface PasswordPropAPI {
  categoryId: number | null;
  usage: string | null;
  username: string | null;
  password: string | null;
}

export const fetchPasswords = async () => {
  console.log('fetching passwords api frontend called')
  const response = await api.get('/passwords/');
  if (response.request.status !== 200) {
    throw new Error('Fetching Passwords Error: Response is not 200');
  }
  return response.data;
}

export const fetchPasswordsByCategoryId = async (categoryid?: number) => {
  const response = await api.get(`/passwords/${categoryid}`);
  if (response.request.status !== 200) {
    throw new Error(`Fetching Passwords by Category Id Error: Response is not 200`);
  }
  return response.data;
}