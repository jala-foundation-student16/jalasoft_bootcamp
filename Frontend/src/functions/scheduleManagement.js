import { api } from "../service/api";
import { getToken } from "./localstorage";
import { showToast } from "./message";
const baseURI = "/schedule";

// Lista todos os eixos
export const getSchedules = async () => {
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

export const getScheduleByBudget = async (planValue) => {
  try {
    const request = await api.get(baseURI+"/plan-value?planValue="+planValue, {
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
    });

    if (request.data.length === 0) {
      showToast({ status: 600 });
    }

    return request.data;
  } catch (e) {
    showToast(e);
    return false;
  }
}

// Pega os dados de um eixo específico
export const getSchedule = async (id) => {
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
export const addSchedule = async (data) => {
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
export const updateSchedule = async (data) => {
  try {
    console.log(data);
    const request = await api.put(baseURI, data, {
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
    });

    console.log(request);


    showToast(request);
    return true;
  } catch (e) {
    showToast(e);
    return false;
  }
};

// Exclui um eixo
export const deleteSchedule = async (id) => {
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
