import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { getRemark } from "../../functions/remarkManagement";
import { ViewRemark } from "../../pages/Admin/Read/ViewRemark";

export const DetailRemark = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [remark, setRemark] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getDataFromServer() {
      try {
        const data = await getRemark(id);
        if (data == null) {
          setIsLoading(false);
          navigate("/agency");
        } else {
          setRemark(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        navigate("/agency");
      }
    }

    getDataFromServer();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <ViewRemark remark={remark} />
    </LoadingComponent>
  );
};
