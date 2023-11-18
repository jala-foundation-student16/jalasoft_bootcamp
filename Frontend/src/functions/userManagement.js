import { api } from "../service/api";
import { getToken } from "./localstorage";
import { showToast } from "./message";
const baseUrl = "/user";

export const getUsers = async () => {
  try {
    const request = await api.get(`${baseUrl}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });

    return request.data;
  } catch (e) {
    showToast(e);
    return false;
  }
};

export const addUser = async (data) => {
  const newUser = {
    name: data.name.trim(),
    email: data.email.trim(),
    password: data.password.trim(),
    matricula: data.matricula.trim(),
    role: data.role.trim(),
  };

  try {
    const request = await api.post(`/authentication/register`, newUser, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    });
    showToast(request);
    return true;
  } catch (e) {
    showToast(e);
    return false;
  }
};

export const getUser = async (id) => {
  try {
    const request = await api.get(`${baseUrl}/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });

    return request.data;
  } catch (e) {
    showToast(e);
    return false;
  }
};

export const deleteUser = async (id) => {
  try {
    const request = await api.delete(`${baseUrl}/${id}`, {
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
    });

    showToast(request);
    return true;
  } catch (e) {
    showToast(e);
    return false;
  }
};

export const updateUser = async (data) => {
  const updateUserData = {
    id: data.id,
    name: data.name.trim(),
    email: data.email.trim(),
    password: data.password.trim(),
    matricula: data.matricula.trim(),
    role: data.role.trim(),
  };

  try {
    const request = await api.put(`${baseUrl}`, updateUserData, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });

    showToast(request);
    return true;
  } catch (e) {
    showToast(e);
    return false;
  }
};
