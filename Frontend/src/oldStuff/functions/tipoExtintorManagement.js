import { api } from "../service/api";
import { getToken } from "./localstorage";

// Lista todos os locais
export const getTiposExtintores = async () => {
  try {
    const request = await api.get("/tipoExtintor", {
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
export const getTipoExtintor = async (id) => {
  try {
    const request = await api.get(`/tipoExtintor/${id}`, {
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
export const addTipoExtintor = async (data) => {
  const newTipoExintor = {
    name: data.name.trim(),
  };

  try {
    const request = await api.post("/tipoExtintor", newTipoExintor, {
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
export const updateTipoExtintor = async (data) => {
  const updateTipoExtintor = {
    id: data.id,
    name: data.name.trim(),
  };

  try {
    const request = await api.put("/tipoExtintor", updateTipoExtintor, {
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
export const deleteTipoExtintor = async (id) => {
  try {
    const request = await api.delete(`/tipoExtintor/${id}`, {
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
