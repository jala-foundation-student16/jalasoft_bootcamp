import { api } from "../service/api";
import { getToken } from "./localstorage";

// Lista todos os eixos
export const getGalpoes = async () => {
  try {
    const request = await api.get("/galpao", {
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
export const getGalpao = async (id) => {
  try {
    const request = await api.get(`/galpao/${id}`, {
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
export const addGalpao = async (data) => {
  const newGalpao = {
    name: data.name.trim(),
  };

  try {
    const request = await api.post("/galpao", newGalpao, {
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
    });

    if (request.status === 201) {
      return true;
    }
  } catch {
    return false;
  }
};

// Atualiza um eixo
export const updateGalpao = async (data) => {
  const updateGalpao = {
    id: data.id,
    name: data.name.trim(),
  };

  try {
    const request = await api.put("/galpao", updateGalpao, {
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
export const deleteGalpao = async (id) => {
  try {
    const request = await api.delete(`/galpao/${id}`, {
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
