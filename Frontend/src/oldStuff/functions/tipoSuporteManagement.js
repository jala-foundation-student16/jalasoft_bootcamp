import { api } from "../service/api";
import { getToken } from "./localstorage";

// Lista todos os locais
export const getTiposSuportes = async () => {
  try {
    const request = await api.get("/tipoSuporte", {
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
export const getTipoSuporte = async (id) => {
  try {
    const request = await api.get(`/tipoSuporte/${id}`, {
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
export const addTipoSuporte = async (data) => {
  const newTipoSuporte = {
    name: data.name.trim(),
  };

  try {
    const request = await api.post("/tipoSuporte", newTipoSuporte, {
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
export const updateTipoSuporte = async (data) => {
  const updateTipoSuporte = {
    id: data.id,
    name: data.name.trim(),
  };

  try {
    const request = await api.put("/tipoSuporte", updateTipoSuporte, {
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
export const deleteTipoSuporte = async (id) => {
  try {
    const request = await api.delete(`/tipoSuporte/${id}`, {
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
