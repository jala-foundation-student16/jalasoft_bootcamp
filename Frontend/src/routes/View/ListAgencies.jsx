import { useEffect, useState } from "react";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { ViewAgencies } from "../../pages/Admin/Read/ViewAgencies";
import { getAgencies } from "../../functions/agencyManagement";

export const ListAgencies = () => {
  const [listAgencies, setListAgencies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getDataFromServer() {
        try {
          const data = await getAgencies();
          if (data.length === 0) {
            setIsLoading(false);
          } else {
            setListAgencies(data);
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
      <ViewAgencies agencies={listAgencies} setAgencies={setListAgencies} />
    </LoadingComponent>
  );
};
