import { api } from "../service/api";
import { getToken } from "./localstorage";

// Lista todos os eixos
export const getHistoricos = async () => {
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
export const getHistorico = async (id) => {
  try {
    const request = await api.get(`/extintor/${id}`, {
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
    });

    if (request.status === 200) {
      console.log(request.data)
      return request.data;
    }
  } catch {
    return null;
  }
};

// Adiciona um eixo
export const addHistorico = async (data) => {
  const newHistorico = {
    status: data.status.trim(),
    observacao: data.observacao.trim(),
    extintor: { id: data.id },
  };

  try {
    const request = await api.post("/historico", newHistorico, {
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
export const updateHistorico = async (data) => {
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
export const deleteHistorico = async (id) => {
  try {
    const request = await api.delete(`/historico/${id}`, {
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
