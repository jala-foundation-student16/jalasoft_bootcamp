import { useEffect, useState } from "react";
import { LoadingComponent } from "../../../components/LoadingComponent/LoadingComponent";
import { ViewExtintor } from "../../pages/Read/ViewExtintor";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getExtintorByCilindro } from "../../functions/extintorManagement";

export const DetailFireExtinguisher = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [extintor, setExtintor] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getExtintorUnity() {
      try {
        const data = await getExtintorByCilindro(id);
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
          navigate("/pesquisa");
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
        navigate("/pesquisa");
      }
    }

    getExtintorUnity();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <ViewExtintor extintor={extintor} />
    </LoadingComponent>
  );
};
