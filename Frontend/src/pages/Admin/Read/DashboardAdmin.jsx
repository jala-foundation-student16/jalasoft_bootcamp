import { useEffect, useState } from "react";
import { LoadingComponent } from "../../../components/LoadingComponent/LoadingComponent";
import { getOrders } from "../../../functions/orderManagement";
import { getAgencies } from "../../../functions/agencyManagement";
import { getCustomers } from "../../../functions/customerManagement";

export const DashboardAdmin = ({ user, orderState }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [agencies, setAgencies] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([])

  useEffect(() => {
    async function getDataFromServer() {
      setAgencies(await getAgencies());
      setOrders(await getOrders());
      setCustomers(await getCustomers());
      setIsLoading(false);
    }

    getDataFromServer();
  }, []);

  function filterOrdersBy(status){
    if(orders.length > 0){
      const value = orders.filter((d) => d.staus === status)
      return value.length;
    }
    return 0
  }

  return (
    <LoadingComponent isLoading={isLoading}>
      <h1 className="text-xl font-medium mb-10">
        Welcome back {user.fullName}.
      </h1>

      <h2 className="text-lg font-medium mb-4">Tasks report</h2>

      <ul className="flex flex-col gap-5 mb-10">
        <li className="p-4 text-white bg-orange-400 rounded-md">
          <b>Pending:</b> {filterOrdersBy("PENDING")}
        </li>

        <li className="p-4 text-white bg-yellow-400 rounded-md">
          <b>In Progress:</b> {filterOrdersBy("INPROGRESS")}
        </li>

        <li className="p-4 text-white bg-green-400 rounded-md">
          <b>Finished:</b> {filterOrdersBy("FINISHED")}
        </li>
      </ul>

      <hr className="mb-10" />

      <h2 className="text-lg font-medium mb-4">
        Agencies registered: {agencies.length}
      </h2>

      <h2 className="text-lg font-medium mb-4">
        Clients registered: {customers.length}
      </h2>
    </LoadingComponent>
  );
};
