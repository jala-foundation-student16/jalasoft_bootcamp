import { api } from "../../service/api";
import { getToken } from "../../functions/localstorage";

// Lista todos os eixos
export const getPlantas = async () => {
  try {
    const request = await api.get("/planta", {
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
export const getPlanta = async (id) => {
  try {
    const request = await api.get(`/planta/${id}`, {
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
export const addPlanta = async (data) => {
  const newPlanta = {
    name: data.name.trim(),
  };

  try {
    const request = await api.post("/planta", newPlanta, {
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
export const updatePlanta = async (data) => {
  const updatePlanta = {
    id: data.id,
    name: data.name.trim(),
  };

  try {
    const request = await api.put("/planta", updatePlanta, {
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
export const deletePlanta = async (id) => {
  try {
    const request = await api.delete(`/planta/${id}`, {
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
