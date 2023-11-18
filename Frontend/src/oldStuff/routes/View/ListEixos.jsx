import { useEffect, useState } from "react";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { ViewEixos } from "../../pages/Read/ViewEixos";
import { getEixos } from "../../functions/eixoManagement";
import { toast } from "react-toastify";

export const ListEixos = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [listEixo, setListEixos] = useState([]);

  useEffect(() => {
    async function getListEixos() {
      try {
        const data = await getEixos();
        if (data == null) {
          toast.error("Não há dados a ser carregados.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setIsLoading(false);
        } else {
          setListEixos(data);
          setIsLoading(false);
        }
      } catch (error) {
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
        console.log(error);
        setIsLoading(false);
      }
    }

    getListEixos();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <ViewEixos eixos={listEixo} setEixos={setListEixos} />
    </LoadingComponent>
  );
};
