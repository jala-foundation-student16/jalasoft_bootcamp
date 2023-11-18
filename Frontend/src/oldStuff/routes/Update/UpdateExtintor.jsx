import { useEffect, useState } from "react";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getExtintor } from "../../functions/extintorManagement";
import { UpdExtintor } from "../../pages/Update/UpdExtintor";
import { getEixos } from "../../functions/eixoManagement";
import { getTiposSuportes } from "../../functions/tipoSuporteManagement";
import { getTiposExtintores } from "../../functions/tipoExtintorManagement";
import { getGalpoes } from "../../functions/galpaoManagement";
import { getPlantas } from "../../functions/plantaManagement";
import { getLocais } from "../../functions/localManagement";

export const UpdateExtintor = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [eixo, setEixo] = useState([]);
  const [tipoSuporte, setTipoSuporte] = useState([]);
  const [galpao, setGalpao] = useState([]);
  const [planta, setPlanta] = useState([]);
  const [local, setLocal] = useState([]);
  const [tipoExtintor, setTipoExtintor] = useState([]);
  const [extintor, setExtintor] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getExtintorUnity() {
      try {
        const data = await getExtintor(id);
        setEixo(await getEixos());
        setTipoSuporte(await getTiposSuportes());
        setTipoExtintor(await getTiposExtintores());
        setGalpao(await getGalpoes());
        setPlanta(await getPlantas());
        setLocal(await getLocais());

        if (data == null) {
          toast.error(
            "Houve um erro no carregamento dos dados, tente novamente.",
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
          setIsLoading(false);
          navigate("/extintor");
        } else {
          setExtintor(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        toast.error(
          "Houve um erro no carregamento dos dados, tente novamente.",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
        setIsLoading(false);
        navigate("/extintor");
      }
    }

    getExtintorUnity();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <UpdExtintor
        extintor={extintor}
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
