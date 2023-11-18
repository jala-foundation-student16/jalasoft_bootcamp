import { api } from "../service/api";
import { getToken } from "./localstorage";

// Lista todos os locais
export const getLocais = async () => {
  try {
    const request = await api.get("/local", {
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

// Pega os dados de um local específico
export const getLocal = async (id) => {
  try {
    const request = await api.get(`/local/${id}`, {
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

// Adiciona um local
export const addLocal = async (data) => {
  const newLocal = {
    name: data.name.trim(),
  };

  try {
    const request = await api.post("/local", newLocal, {
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

// Atualiza um local
export const updateLocal = async (data) => {
  const updateLocal = {
    id: data.id,
    name: data.name.trim(),
  };

  try {
    const request = await api.put("/local", updateLocal, {
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

// Exclui um local
export const deleteLocal = async (id) => {
  try {
    const request = await api.delete(`/local/${id}`, {
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
