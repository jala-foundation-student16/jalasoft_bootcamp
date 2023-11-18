import { toast } from "react-toastify";
import { getGalpao } from "../../functions/galpaoManagement";
import { UpdGalpao } from "../../pages/Update/UpdGalpao";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";

export const UpdateGalpao = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [galpao, setGalpao] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getGalpaoUnity() {
      try {
        const data = await getGalpao(id);
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
          navigate("/galpao");
        } else {
          setGalpao(data);
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
        navigate("/galpao");
      }
    }

    getGalpaoUnity();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <UpdGalpao galpao={galpao} />
    </LoadingComponent>
  );
};
