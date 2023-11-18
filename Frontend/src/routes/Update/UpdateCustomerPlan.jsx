import { useEffect, useState } from "react";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { UpdTask } from "../../pages/Admin/Update/UpdTask";
import { useParams } from "react-router-dom";
import { getCustomerPlan } from "../../functions/customerPlanManagement";
import { UpdCustomerPlan } from "../../pages/Admin/Update/UpdCustomerPlan";

export const UpdateCustomerPlan = () => {
  const [customerPlan, setCustomerPlan] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    async function getDataFromServer() {
      try {
        const dataTask = await getCustomerPlan(id);

        if (dataTask == null) {
          setIsLoading(false);
        } else {
          setCustomerPlan(dataTask);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }

    getDataFromServer();
  }, []);
  return (
    <LoadingComponent isLoading={isLoading}>
      <UpdCustomerPlan customerPlan={customerPlan} />
    </LoadingComponent>
  );
};
