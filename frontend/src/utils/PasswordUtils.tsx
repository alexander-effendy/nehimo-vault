import { PasswordComponentProp } from "../features/PasswordSlice";

export const passwordChooser = (passwords: PasswordComponentProp[], id: number | null) => {
  if (!id) return;
  return passwords.filter((password) => password.id === id)[0];
}