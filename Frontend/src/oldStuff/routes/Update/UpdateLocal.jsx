import { useEffect, useState } from "react";
import { UpdLocal } from "../../pages/Update/UpdLocal";
import { useNavigate, useParams } from "react-router-dom";
import { getLocal } from "../../functions/localManagement";
import { toast } from "react-toastify";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";

export const UpdateLocal = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [local, setLocal] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getLocalUnity() {
      try {
        const data = await getLocal(id);
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
          navigate("/local");
        } else {
          setLocal(data);
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
        navigate("/local");
      }
    }

    getLocalUnity();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <UpdLocal local={local} />
    </LoadingComponent>
  );
};
