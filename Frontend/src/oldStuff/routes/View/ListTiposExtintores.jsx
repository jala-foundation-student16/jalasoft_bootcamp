import { useEffect, useState } from "react";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { ViewTiposExtintores } from "../../pages/Read/ViewTiposExtintores";
import { getTiposExtintores } from "../../functions/tipoExtintorManagement";
import { toast } from "react-toastify";

export const ListTiposExtintores = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [listTiposExtintores, setListTiposExtintores] = useState([]);

  useEffect(() => {
    async function getListTiposExtintores() {
      try {
        const data = await getTiposExtintores();
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
          setListTiposExtintores(data);
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

    getListTiposExtintores();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <ViewTiposExtintores
        tiposExtintores={listTiposExtintores}
        setTiposExtintores={setListTiposExtintores}
      />
    </LoadingComponent>
  );
};
