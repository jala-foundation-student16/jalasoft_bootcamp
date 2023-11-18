import { api } from "../service/api";
import { showToast } from "./message";
const baseURI = "/users";

// Lista todos os eixos
export const getUsers = async (page) => {
  try {
    const request = await api.get(baseURI+"?page"+page);

    if (request.data.length === 0) {
      showToast({ status: 600 });
    }

    return request.data;
  } catch (e) {
    showToast(e);
    return false;
  }
};

export const deleteUser = async(id) => {
  try {
    const request = await api.delete(baseURI + "/" + id);

   
    showToast(request);
    return request.data;
    
  } catch (e) {
    showToast(e);
    return false;
  }
}

