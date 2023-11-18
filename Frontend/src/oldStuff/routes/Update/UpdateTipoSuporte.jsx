import { useEffect, useState } from "react";
import { UpdTipoSuporte } from "../../pages/Update/UpdTipoSuporte";
import { useNavigate, useParams } from "react-router-dom";
import { getTipoSuporte } from "../../functions/tipoSuporteManagement";
import { toast } from "react-toastify";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";

export const UpdateTipoSuporte = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tipoSuporte, setTipoSuporte] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getTipoSuporteUnity() {
      try {
        const data = await getTipoSuporte(id);
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
          navigate("/tipo_suporte");
        } else {
          setTipoSuporte(data);
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
        navigate("/tipo_suporte");
      }
    }

    getTipoSuporteUnity();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <UpdTipoSuporte tipoSuporte={tipoSuporte} />
    </LoadingComponent>
  );
};
