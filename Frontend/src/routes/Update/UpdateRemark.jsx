import { useEffect, useState } from "react";
import { getTasks } from "../../functions/taskManagement";
import { useParams } from "react-router-dom";
import { getRemark } from "../../functions/remarkManagement";
import { UpdRemark } from "../../pages/Admin/Update/UpdRemark";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";

export const UpdateRemark = () => {
    const [tasks, setTasks] = useState([]);
    const [remark, setRemark] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {id} = useParams();

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
          const dataRemark = await getRemark(id);

          if (dataTask == null || dataRemark == null) {
            setIsLoading(false);
          } else {
            setTasks(transformToOptions(dataTask));
            setRemark(dataRemark);
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
        <UpdRemark tasks={tasks} remark={remark} />
      </LoadingComponent>
    );
}