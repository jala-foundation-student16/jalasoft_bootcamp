import { useEffect, useState } from "react";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { ViewPlantas } from "../../pages/Read/ViewPlantas";
import { getPlantas } from "../../functions/plantaManagement";
import { toast } from "react-toastify";

export const ListPlantas = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [listPlantas, setListPlantas] = useState([]);

  useEffect(() => {
    async function getPlantaList() {
      try {
        const data = await getPlantas();
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
          setListPlantas(data);
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

    getPlantaList();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <ViewPlantas plantas={listPlantas} setPlantas={setListPlantas} />
    </LoadingComponent>
  );
};
