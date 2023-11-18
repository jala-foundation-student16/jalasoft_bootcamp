import { useEffect, useState } from "react";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { ViewLocais } from "../../pages/Read/ViewLocais";
import { getLocais } from "../../functions/localManagement";
import { toast } from "react-toastify";

export const ListLocais = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [listLocais, setListLocais] = useState([]);

  useEffect(() => {
    async function getListLocais() {
      try {
        const data = await getLocais();
        console.log(data);
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
          setListLocais(data);
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

    getListLocais();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <ViewLocais locais={listLocais} setLocais={setListLocais} />
    </LoadingComponent>
  );
};
