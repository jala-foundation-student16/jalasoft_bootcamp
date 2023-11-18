import { api } from "../service/api";
import {
  deleteEmail,
  deleteToken,
  setToken,
  setUserMail,
} from "./localstorage";
import { showToast } from "./message";

export const authUser = async (data, setIsAuthenticated) => {
  const loginData = {
    email: data.email.trim(),
    password: data.password.trim(),
  };

  try {
    const response = await api.post("/login", loginData);

    setToken(response.data.token);
    setUserMail(data.email);
    setIsAuthenticated(false);

    return true;
  } catch (e) {
    showToast(e);
    return false;
  }
};

export const logoutUser = (setIsAuthenticated) => {
  deleteEmail();
  deleteToken();
  setIsAuthenticated(false);
  return true;
};
