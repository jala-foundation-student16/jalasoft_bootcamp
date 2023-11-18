import { useEffect, useState } from "react";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { ViewTiposSuportes } from "../../pages/Read/ViewTiposSuportes";
import { getTiposSuportes } from "../../functions/tipoSuporteManagement";

export const ListTiposSuportes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [listTiposSuportes, setListTiposSuportes] = useState([]);

  useEffect(() => {
    async function getListTiposSuportes() {
      try {
        const data = await getTiposSuportes();
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
          setListTiposSuportes(data);
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

    getListTiposSuportes();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <ViewTiposSuportes
        tiposSuportes={listTiposSuportes}
        setTiposSuportes={setListTiposSuportes}
      />
    </LoadingComponent>
  );
};
