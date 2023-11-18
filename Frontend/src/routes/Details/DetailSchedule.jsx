import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { ViewSchedule } from "../../pages/Admin/Read/ViewSchedule";
import { getSchedule } from "../../functions/scheduleManagement";

export const DetailSchedule = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [schedule, setSchedule] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getDataFromServer() {
      try {
        const data = await getSchedule(id);
        if (data == null) {
          setIsLoading(false);
          navigate("/schedule");
        } else {
          setSchedule(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        navigate("/schedule");
      }
    }

    getDataFromServer();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <ViewSchedule schedule={schedule} />
    </LoadingComponent>
  );
};
