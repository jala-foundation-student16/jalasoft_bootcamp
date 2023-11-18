import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { useEffect, useState } from "react";
import { AddExtintor } from "../../pages/Create/AddExtintor";
import { getEixos } from "../../functions/eixoManagement";
import { getTiposSuportes } from "../../functions/tipoSuporteManagement";
import { getTiposExtintores } from "../../functions/tipoExtintorManagement";
import { getGalpoes } from "../../functions/galpaoManagement";
import { getPlantas } from "../../functions/plantaManagement";
import { getLocais } from "../../functions/localManagement";

export const CreateFireExtinguisher = () => {
  const [eixo, setEixo] = useState([]);
  const [tipoSuporte, setTipoSuporte] = useState([]);
  const [galpao, setGalpao] = useState([]);
  const [planta, setPlanta] = useState([]);
  const [local, setLocal] = useState([]);
  const [tipoExtintor, setTipoExtintor] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      setEixo(await getEixos());
      setTipoSuporte(await getTiposSuportes());
      setTipoExtintor(await getTiposExtintores());
      setGalpao(await getGalpoes());
      setPlanta(await getPlantas());
      setLocal(await getLocais());

      setIsLoading(false);
    }

    getData();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <AddExtintor
        eixo={eixo}
        tipoSuporte={tipoSuporte}
        tipoExtintor={tipoExtintor}
        galpao={galpao}
        planta={planta}
        local={local}
      />
    </LoadingComponent>
  );
};
