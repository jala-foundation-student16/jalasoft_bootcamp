import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { getAgency } from "../../functions/agencyManagement";
import { ViewAgency } from "../../pages/Admin/Read/ViewAgency";

export const DetailAgency = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [agency, setAgency] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getDataFromServer() {
      try {
        const data = await getAgency(id);
        if (data == null) {
          setIsLoading(false);
          navigate("/agency");
        } else {
          setAgency(data);
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
      <ViewAgency agency={agency} />
    </LoadingComponent>
  );
};
