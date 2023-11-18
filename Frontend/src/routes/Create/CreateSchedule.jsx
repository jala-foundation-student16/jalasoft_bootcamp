import { useEffect, useState } from "react";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { getTasks } from "../../functions/taskManagement";
import { AddSchedule } from "../../pages/Admin/Create/AddSchedule";
import { getRemarks } from "../../functions/remarkManagement";
import { getCustomerPlans } from "../../functions/customerPlanManagement";

export const CreateSchedule = () => {
  const [tasks, setTasks] = useState([]);
  const [remarks, setRemarks] = useState([]);
  const [customerPlan, setCustomerPlan] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function transformToOptions(data) {
    const newData = data.map((d) => {
      return { value: d.id, label: d.name };
    });
    return newData;
  }

  useEffect(() => {
    async function getDataFromServer() {
      try {
        const dataTask = await getTasks();
        const dataRemark = await getRemarks();
        const dataCustomerPlan = await getCustomerPlans();

        if (dataTask == null || dataRemark == null || dataCustomerPlan == null) {
          setIsLoading(false);
        } else {
          setCustomerPlan(transformToOptions(dataCustomerPlan));
          setTasks(transformToOptions(dataTask));
          setRemarks(dataRemark);
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
      <AddSchedule tasks={tasks} remarks={remarks} transformToOptions={transformToOptions} customerPlan={customerPlan}/>
    </LoadingComponent>
  );
};
