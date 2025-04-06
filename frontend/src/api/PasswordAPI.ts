import api from "./utils";

interface PasswordPropAPI {
  categoryId: number | null | undefined;
  usage: string | null;
  username: string | null;
  password: string | null;
}

export const fetchPasswords = async () => {
  try {
    const response = await api.get('/passwords/');
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const fetchPasswordsByCategoryId = async (categoryid?: number) => {
  const response = await api.get(`/passwords/${categoryid}`);
  if (response.request.status !== 200) {
    throw new Error(`Fetching Passwords by Category Id Error: Response is not 200`);
  }
  return response.data;
}

export const addPasswordAPI = async (password: PasswordPropAPI) => {
  try {
    const response = await api.post('/passwords', {
      categoryid: password.categoryId,
      usage: password.usage,
      username: password.username,
      password: password.password,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}