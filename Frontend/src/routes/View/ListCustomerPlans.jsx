import { useEffect, useState } from "react";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { ViewCustomerPlans } from "../../pages/Admin/Read/ViewCustomerPlans";
import { getCustomerPlans } from "../../functions/customerPlanManagement";

export const ListCustomerPlans = () => {
  const [listPlans, setListPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getDataFromServer() {
        try {
          const data = await getCustomerPlans();
          if (data.length === 0) {
            setIsLoading(false);
          } else {
            setListPlans(data);
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
      <ViewCustomerPlans plans={listPlans} setPlans={setListPlans} />
    </LoadingComponent>
  );
};
