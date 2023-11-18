import { useEffect, useState } from "react";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { getTasks } from "../../functions/taskManagement";
import { getRemarks } from "../../functions/remarkManagement";
import { UpdSchedule } from "../../pages/Admin/Update/UpdSchedule";
import { useParams } from "react-router-dom";
import { getSchedule } from "../../functions/scheduleManagement";
import { getCustomerPlans } from "../../functions/customerPlanManagement";

export const UpdateSchedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [customerPlan, setCustomerPlan] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [remarks, setRemarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

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
        const dataSchedule = await getSchedule(id);

        if (dataTask == null || dataRemark == null) {
          setIsLoading(false);
        } else {
          setSchedule(dataSchedule);
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
      <UpdSchedule
        schedule={schedule}
        tasks={tasks}
        remarks={remarks}
        customerPlan={customerPlan}
        transformToOptions={transformToOptions}
      />
    </LoadingComponent>
  );
};
