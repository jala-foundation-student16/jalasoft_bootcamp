import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { getCustomerPlan } from "../../functions/customerPlanManagement";
import { ViewCustomerPlan } from "../../pages/Admin/Read/ViewCustomerPlan";

export const DetailCustomerPlan = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [customerPlan, setCustomerPlan] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getDataFromServer() {
      try {
        const data = await getCustomerPlan(id);
        if (data == null) {
          setIsLoading(false);
          navigate("/customer_plan");
        } else {
          setCustomerPlan(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        navigate("/customer_plan");
      }
    }

    getDataFromServer();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <ViewCustomerPlan customerPlan={customerPlan} />
    </LoadingComponent>
  );
};
