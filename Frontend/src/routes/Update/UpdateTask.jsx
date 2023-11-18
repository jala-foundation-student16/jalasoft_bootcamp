import { useEffect, useState } from "react";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { UpdTask } from "../../pages/Admin/Update/UpdTask";
import { useParams } from "react-router-dom";
import { getTask } from "../../functions/taskManagement";

export const UpdateTask = () => {
  const [task, setTask] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {id} = useParams();

  useEffect(() => {
    async function getDataFromServer() {
      try {
        const dataTask = await getTask(id);

        if (dataTask == null) {
          setIsLoading(false);
        } else {
          setTask(dataTask);
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
      <UpdTask task={task} />
    </LoadingComponent>
  );
};
