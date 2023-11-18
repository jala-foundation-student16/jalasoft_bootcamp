import { useEffect, useState } from "react";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { toast } from "react-toastify";
import { ViewSchedules } from "../../pages/Admin/Read/ViewSchedules";
import { getSchedules } from "../../functions/scheduleManagement";

export const ListSchedules = () => {
  const [listSchedules, setListSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getDataFromServer() {
      try {
        const data = await getSchedules();
        if (data.length === 0) {
          setIsLoading(false);
        } else {
          setListSchedules(data);
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
      <ViewSchedules
        schedules={listSchedules}
        setSchedules={setListSchedules}
      />
    </LoadingComponent>
  );
};
