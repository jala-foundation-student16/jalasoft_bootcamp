import { useEffect, useState } from "react";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { toast } from "react-toastify";
import { getCustomers } from "../../functions/customerManagement";
import { ViewCustomers } from "../../pages/Read/ViewCustomers";

export const ListCustomers = () => {
  const [listCustomers, setListCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getDataFromServer() {
      try {
        const data = await getCustomers();

        if (data.length === 0) {
          toast.warn("There is no data to load.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setIsLoading(false);
        } else {
          setListCustomers(data);
          setIsLoading(false);
        }
      } catch (error) {
        toast.error("There was an error fetching data, please try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.log(error);
        setIsLoading(false);
      }
    }

    getDataFromServer();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <ViewCustomers customers={listCustomers} setCustomers={setListCustomers} />
    </LoadingComponent>
  );
};
