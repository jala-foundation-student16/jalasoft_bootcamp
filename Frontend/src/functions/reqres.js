import { api } from "../service/api";
import { showToast } from "./message";
const baseURI = "/users";

// Lista todos os eixos
export const getUsers = async (page) => {
  try {
    const request = await api.get(baseURI + "?page" + page);

    if (request.data.length === 0) {
      showToast({ status: 600 });
    }

    return request.data;
  } catch (e) {
    showToast(e);
    return false;
  }
};

export const getUser = async (id) => {
  try {
    const request = await api.get(baseURI + "/" + id);

    if (request.data.length === 0) {
      showToast({ status: 600 });
    }

    return request.data.data;
  } catch (e) {
    showToast(e);
    return false;
  }
};

export const addUser = async (data) => {
  try {
    const request = await api.post(baseURI, data);

    showToast(request);
    console.log(request.data)

    return true;
  } catch (e) {
    showToast(e);
    return false;
  }
};

export const updateUser = async (data) => {
  try {
    const request = await api.put(baseURI + "/" + data);

    showToast(request);
    return request.data;
  } catch (e) {
    showToast(e);
    return false;
  }
};

export const deleteUser = async (id) => {
  try {
    const request = await api.delete(baseURI + "/" + id);

    showToast(request);
    return request.data;
  } catch (e) {
    showToast(e);
    return false;
  }
};
