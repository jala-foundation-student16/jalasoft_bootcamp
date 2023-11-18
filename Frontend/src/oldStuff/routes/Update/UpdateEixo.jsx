import { useEffect, useState } from "react";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { UpdEixo } from "../../pages/Update/UpdEixo";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getEixo } from "../../functions/eixoManagement";

export const UpdateEixo = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [eixo, setEixo] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getEixoUnity() {
      try {
        const data = await getEixo(id);
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
          navigate("/eixo");
        } else {
          setEixo(data);
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
        navigate("/eixo");
      }
    }

    getEixoUnity();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <UpdEixo eixo={eixo} />
    </LoadingComponent>
  );
};
