import { useEffect, useState } from "react";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { ViewTasks } from "../../pages/Admin/Read/ViewTasks";
import { getTasks } from "../../functions/taskManagement";

export const ListTasks = () => {
  const [listTasks, setListTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getDataFromServer() {
      try {
        const data = await getTasks();
        if (data.length === 0) {
          setIsLoading(false);
        } else {
          setListTasks(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }

    setIsLoading(false);
    getDataFromServer();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <ViewTasks tasks={listTasks} setTasks={setListTasks} />
    </LoadingComponent>
  );
};
