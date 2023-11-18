import { useContext, useEffect, useState } from "react";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { toast } from "react-toastify";
import { ViewExtintores } from "../../pages/Read/ViewExtintores";
import { getExtintores } from "../../functions/extintorManagement";
import { AuthenticationContext } from "../../provider/AuthenticationProvider";

export const ListExtintores = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [listExtintores, setListExtintores] = useState([]);
  const { userData } = useContext(AuthenticationContext);

  useEffect(() => {
    async function getListExtintores() {
      try {
        const data = await getExtintores();
        if (data == null) {
          toast.warning("Não há extintores para carregar.", {
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
          setListExtintores(data);
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

    getListExtintores();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <ViewExtintores extintores={listExtintores} setExtintores={setListExtintores} role={userData.role}/>
    </LoadingComponent>
  );
};
