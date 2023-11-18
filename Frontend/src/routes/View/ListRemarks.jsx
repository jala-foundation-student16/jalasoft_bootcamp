import { useEffect, useState } from "react";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { ViewRemarks } from "../../pages/Admin/Read/ViewRemarks";
import { getRemarks } from "../../functions/remarkManagement";

export const ListRemarks = () => {
  const [listRemarks, setListRemarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getDataFromServer() {
        try {
          const data = await getRemarks();
          if (data.length === 0) {
            setIsLoading(false);
          } else {
            setListRemarks(data);
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
      <ViewRemarks remarks={listRemarks} setRemarks={setListRemarks} />
    </LoadingComponent>
  );
};
