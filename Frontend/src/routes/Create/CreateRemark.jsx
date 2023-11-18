import { useEffect, useState } from "react";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { getTasks } from "../../functions/taskManagement";
import { AddRemark } from "../../pages/Admin/Create/AddRemark";

export const CreateRemark = () => {
  const [tasks, setTasks] = useState([]);
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
        const data = await getTasks();

        if (data == null) {
          setIsLoading(false);
        } else {
          setTasks(transformToOptions(data));
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
      <AddRemark tasks={tasks} />
    </LoadingComponent>
  );
};
