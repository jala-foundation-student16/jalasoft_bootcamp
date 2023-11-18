import { useEffect, useState } from "react";
import { ViewOrdersFiltered } from "../../pages/Read/ViewOrdersFiltered";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { getOrders } from "../../functions/orderManagement";
import { toast } from "react-toastify";

export const ListOrderFiltered = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getDataFromServer() {
      try {
        const data = await getOrders();

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
          setOrders(data);
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
      <ViewOrdersFiltered orders={orders} />
    </LoadingComponent>
  );
};
