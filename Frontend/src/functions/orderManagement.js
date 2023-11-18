import { api } from "../service/api";
import { getToken } from "./localstorage";
import { showToast } from "./message";
const baseURI = "/order";

// Lista todos os eixos
export const getOrders = async () => {
  try {
    const request = await api.get(baseURI, {
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
    });

    if(request.data){
      return request.data;
    }

    return [];
  } catch (e) {
    showToast(e);
    return false;
  }
};

// Pega os dados de um eixo específico
export const getOrder = async (id) => {
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
export const addOrder = async (data) => {
  const newOrder = {
    customer: { id: data.customer },
    clientInformation: data.client_information,
  };
  try {
    const request = await api.post(baseURI, newOrder, {
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
export const updateOrder = async (data) => {
  const updateEixo = {
    id: data.id,
    name: data.name.trim(),
  };

  try {
    const request = await api.put("/eixo", updateEixo, {
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
export const deleteOrder = async (id) => {
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
