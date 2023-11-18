import { api } from "../../service/api";
import { getToken } from "../../functions/localstorage";

// Lista todos os eixos
export const getEixos = async () => {
  try {
    const request = await api.get("/eixo", {
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
    });

    if (request.status === 200) {
      return request.data;
    }
  } catch {
    return null;
  }
};

// Pega os dados de um eixo específico
export const getEixo = async (id) => {
  try {
    const request = await api.get(`/eixo/${id}`, {
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
    });

    if (request.status === 200) {
      return request.data;
    }
  } catch {
    return null;
  }
};

// Adiciona um eixo
export const addEixo = async (data) => {
  const newEixo = {
    name: data.name.trim(),
  };

  try {
    const request = await api.post("/eixo", newEixo, {
      headers:{
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      }
    });

    if (request.status === 201) {
      return true;
    }
  } catch {
    return false;
  }
};

// Atualiza um eixo
export const updateEixo = async (data) => {
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
    if (request.status === 200) {
      return true;
    }
  } catch {
    return false;
  }
};

// Exclui um eixo
export const deleteEixo = async (id) => {
  try {
    const request = await api.delete(`/eixo/${id}`, {
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
    });

    if (request.status === 200) {
      return true;
    }
  } catch {
    return false;
  }
};
