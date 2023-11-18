import { useEffect, useState } from "react";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { ViewGalpoes } from "../../pages/Read/ViewGalpoes";
import { getGalpoes } from "../../functions/galpaoManagement";
import { toast } from "react-toastify";

export const ListGalpoes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [listGalpoes, setListGalpoes] = useState([]);

  useEffect(() => {
    async function getGapoesList() {
      try {
        const data = await getGalpoes();
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
          setListGalpoes(data);
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
        setIsLoading(false);
        console.log(error);
        setIsLoading(false);
      }
    }

    getGapoesList();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <ViewGalpoes galpoes={listGalpoes} setGalpoes={setListGalpoes}/>
    </LoadingComponent>
  );
};