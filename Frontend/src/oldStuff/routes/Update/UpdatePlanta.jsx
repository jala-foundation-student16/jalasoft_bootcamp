import { useEffect, useState } from "react";
import { UpdPlanta } from "../../pages/Update/UpdPlanta";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { getPlanta } from "../../functions/plantaManagement";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";

export const UpdatePlanta = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [planta, setPlanta] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getPlantaUnity() {
      try {
        const data = await getPlanta(id);
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
          navigate("/planta");
        } else {
          setPlanta(data);
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
        navigate("/planta");
      }
    }

    getPlantaUnity();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <UpdPlanta planta={planta} />
    </LoadingComponent>);
};
