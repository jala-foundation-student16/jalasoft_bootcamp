import { api } from "../service/api";
import { getToken } from "./localstorage";
import { showToast } from "./message";
const baseURI = "/remark";

// Lista todos os eixos
export const getRemarks = async () => {
  try {
    const request = await api.get(baseURI, {
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
    });

    if(request.data.length === 0){
        showToast({status: 600})
    }
    
    return request.data;
  } catch (e) {
    showToast(e);
    return false;
  }
};

// Pega os dados de um eixo específico
export const getRemark = async (id) => {
  try {
    const request = await api.get(baseURI + "/" + id, {
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
    });

    return request.data;
  } catch (e) {
    showToast(e);
    return false;
  }
};

// Adiciona um eixo
export const addRemark = async (data) => {
  try {
    const request = await api.post(baseURI, data, {
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

// Atualiza um eixo
export const updateRemark = async (data) => {
  try {
    const request = await api.put(baseURI, data, {
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

// Exclui um eixo
export const deleteRemark = async (id) => {
  try {
    const request = await api.delete(baseURI + "/" + id, {
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
