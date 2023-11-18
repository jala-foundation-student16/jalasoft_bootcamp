import { Plus } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { useNavigate } from "react-router-dom";

export const ViewOrdersFiltered = ({ orders }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium">All Orders</h1>
        <CommonButton
          id="btn_addOrder"
          colored={false}
          icon={<Plus size={24} />}
          onClick={() => navigate("/order/new")}
        />
      </div>

      <ul className="flex gap-4 flex-col md:flex-row">
        {orders.map((order) => (
          <li
            key={order.id}
            className="cursor-pointer shadow-md p-4 w-full hover:shadow-lg transition-all ease-in-out duration-300 border border-slate-200 rounded-md bg-slate-100 hover:bg-slate-50"
            onClick={()=>{navigate(`/order/${order.id}`)}}
          >
            <h2 className="font-medium">#{order.id}</h2>
            <p>Customer: {order.customer.companyName}</p>
            <p>CEO: {order.customer.ceo}</p>
            <p>
              Status:{" "}
              {order.status === "PENDING"
                ? "Pending"
                : order.status === "INPROGRESS"
                ? "In progress"
                : "Finished"}
            </p>
          </li>
        ))}

        {orders.length == 0 && (
          <li className="pt-3">There isn't any order running.</li>
        )}
      </ul>
    </div>
  );
};
