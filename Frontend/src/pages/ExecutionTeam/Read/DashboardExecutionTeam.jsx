import { useEffect, useState } from "react";
import { LoadingComponent } from "../../../components/LoadingComponent/LoadingComponent";
import { getOrders } from "../../../functions/orderManagement";

export const DashboardExecutionTeam = ({ user }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function getDataFromServer() {
      setOrders(await getOrders());
      setIsLoading(false);
    }

    getDataFromServer();
  }, []);

  function filterOrdersBy(status) {
    if (orders.length > 0) {
      const value = orders.filter((d) => d.staus === status);
      return value;
    }
    return 0;
  }

  return (
    <LoadingComponent isLoading={isLoading}>
      <h1 className="text-xl font-medium mb-10">
        Welcome back {user.fullName}.
      </h1>

      <h2 className="text-lg font-medium mb-4">Tasks to execute</h2>

      <ul className="flex flex-col gap-5 mb-10">
        {filterOrdersBy("PENDING").map((order) => {
          return (
            <li className="p-4 text-white bg-orange-400 rounded-md">
              <b>Order #{order.id}</b>
              <p>Client {order.order.customer.company_name}</p>
              <p>
                Task: {order.schedule.remark.task.name} -{" "}
                {order.schedule.remark.name}
              </p>
              <p>Should start in: {order.dateToExecute}</p>
            </li>
          );
        })}
      </ul>

      <hr className="mb-10" />

      <h2 className="text-lg font-medium mb-4">Tasks in execution</h2>

      <ul className="flex flex-col gap-5 mb-10">
        {filterOrdersBy("INPROGRESS").map((order) => {
          return (
            <li className="p-4 text-white bg-lime-400 rounded-md">
              <b>Order #{order.id}</b>
              <p>Client {order.order.customer.company_name}</p>
              <p>
                Task: {order.schedule.remark.task.name} -{" "}
                {order.schedule.remark.name}
              </p>
              <p>Should start in: {order.dateToExecute}</p>
            </li>
          );
        })}
      </ul>
    </LoadingComponent>
  );
};
