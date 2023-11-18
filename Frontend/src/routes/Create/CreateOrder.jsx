import { useEffect, useState } from "react";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { AddOrder } from "../../pages/Create/AddOrder";
import { getCustomers } from "../../functions/customerManagement";
import { toast } from "react-toastify";

export const CreateOrder = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getDataFromServer() {
      try {
        const data = await getCustomers();

        if (data == null) {
          toast.error("There is no data to show.", {
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
          setCustomers(data);
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
      <AddOrder customers={customers} />
    </LoadingComponent>
  );
};
