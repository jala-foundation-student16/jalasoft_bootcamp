import { api } from "../service/api";
import { getToken } from "./localstorage";

// Lista todos os eixos
export const getExtintores = async () => {
  try {
    const request = await api.get("/extintor", {
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

export const getExtintoresByStatus = async (status) => {
  try {
    const request = await api.get(`/extintor/status/${status}`, {
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
    });

    if (request.status === 200) {
      return request.data;
    }

    return false;
  } catch {
    return false;
  }
};

// Pega os dados de um eixo específico
export const getExtintor = async (id) => {
  try {
    const request = await api.get(`/extintor/${id}`, {
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
export const getExtintorByCilindro = async (cilindro) => {
  try {
    const request = await api.get(`/extintor/cilindro/${cilindro}`, {
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
    });

    if (request.status === 200) {
      return request.data;
    }

    return null;
  } catch {
    return null;
  }
};

// Adiciona um eixo
export const addExtintor = async (data) => {
  const arrayTipoExintor = data.tipoExtintor.map(function (objeto) {
    return { id: objeto.value };
  });

  const newExtintor = {
    cilindro: data.cilindro.trim(),
    data_vencimento: data.dataVencimento.toLocaleDateString("pt-BR"),
    vencimento_th: data.dataVencimentoTH.toLocaleDateString("pt-BR"),
    carga_nominal: data.cargaNominal,
    unidade_carga: data.unidadeCarga,
    placa_sinalizacao: data.placaSinalizacao == 1 ? true : false,
    eixo: { id: data.eixo },
    tipo_suporte: { id: data.tipoSuporte },
    galpao: { id: data.galpao },
    planta: { id: data.planta },
    tipo_extintores: arrayTipoExintor,
    local: { id: data.local },
  };

  try {
    const request = await api.post("/extintor", newExtintor, {
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
    });

    if (request.status === 201) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
};

// Atualiza um eixo
export const updateExtintor = async (data) => {
  const arrayTipoExintor = data.tipoExtintor.map(function (objeto) {
    return { id: objeto.value };
  });

  const updateExtintor = {
    id: data.id,
    cilindro: data.cilindro.trim(),
    data_vencimento: data.dataVencimento.toLocaleDateString("pt-BR"),
    vencimento_th: data.dataVencimentoTH.toLocaleDateString("pt-BR"),
    carga_nominal: data.cargaNominal,
    unidade_carga: data.unidadeCarga,
    placa_sinalizacao: data.placaSinalizacao == 1 ? true : false,
    eixo: { id: data.eixo },
    tipo_suporte: { id: data.tipoSuporte },
    galpao: { id: data.galpao },
    planta: { id: data.planta },
    tipo_extintores: arrayTipoExintor,
    local: { id: data.local },
  };

  try {
    const request = await api.put("/extintor", updateExtintor, {
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
export const deleteExtintor = async (id) => {
  try {
    const request = await api.delete(`/extintor/${id}`, {
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
    });

    if (request.status === 204) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
};
