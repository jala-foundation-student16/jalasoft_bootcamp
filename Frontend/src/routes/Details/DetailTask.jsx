import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { getTask } from "../../functions/taskManagement";
import { ViewTask } from "../../pages/Admin/Read/ViewTask";

export const DetailTask = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [task, setTask] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getDataFromServer() {
      try {
        const data = await getTask(id);
        if (data == null) {
          setIsLoading(false);
          navigate("/task");
        } else {
          setTask(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        navigate("/task");
      }
    }

    getDataFromServer();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <ViewTask task={task} />
    </LoadingComponent>
  );
};
