import { api } from "../service/api";
import { deleteToken, getToken, setToken } from "./localstorage";
import { showToast } from "./message";

export const authUser = async (data, setIsAuthenticated, setUsetData) => {
  const loginData = {
    email: data.email.trim(),
    password: data.password.trim(),
  };

  try {
    const response = await api.post("/login", loginData);

    setToken(response.data.token);
  
    await getUserData(setIsAuthenticated, setUsetData);
    return true;
  } catch (e) {
    showToast(e);
    return false;
  }
};

export async function getUserData(setIsAuthenticated, setUserData) {
  const userToken = getToken();

  if (userToken) {
    try {
      const response = await api.get("/authentication", {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      setUserData(response.data);
      setIsAuthenticated(true);
      return true;
    } catch (e) {
      deleteToken();
      setIsAuthenticated(false);
      showToast(e);
      return false;
    }
  } else {
    deleteToken();
    setIsAuthenticated(false);
    showToast(e);
    return false;
  }
}

export const registerAgency = async (data) => {
  const newUser = { ...data, agencyNotes: "na", role: "AGENCYOWNER" };
  console.log(newUser);

  try {
    const response = await api.post("/authentication/register", newUser);

    showToast(response);
    return true;
  } catch (e) {
    showToast(e);
    return false;
  }
};

export const logoutUser = (setIsAuthenticated, setUserData) => {
  setUserData({});
  deleteToken();
  return true;
};
