import { useEffect, useState } from "react";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { getOrders } from "../../functions/orderManagement";

export const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getDataFromServer() {
      const orders = await getOrders();
      setOrders(orders);
      setIsLoading(false);
    }

    getDataFromServer();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <h1 className="text-xl font-medium">Active Orders</h1>

      {orders.length == 0 && (
        <ul className="flex flex-col gap-4">
          {orders.map((order) => (
            <li>{order}</li>
          ))}
        </ul>
      )}

      {orders.length == 0 && (
        <p className="pt-3">There isn't any order running.</p>
      )}
    </LoadingComponent>
  );
};
