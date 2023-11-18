import {
  PencilSimpleLine,
  Plus,
  TrashSimple,
  User,
} from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { ModalDelete } from "../../components/ModalDelete/ModalDelete";
import { deleteCustomer } from "../../functions/customerManagement";

export const ViewCustomers = ({ customers, setCustomers }) => {
  const [isVisible, setIsVisible] = useState({
    visible: false,
    id: 0,
  });

  async function handleRemove(id) {
    const newListCustomers = customers.filter((item) => item.id !== id);
    const request = await deleteCustomer(id);
    if (request) {
      setCustomers(newListCustomers);
      toast.success("Usuário excluído com sucesso.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error(
        "Não é possivel excluir porque há informações vinculadas a esse usuário.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }
  }

  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-xl">Customer list</h1>
        <CommonButton
          id="btn_addCustomer"
          colored={false}
          icon={<Plus size={24} />}
          onClick={() => navigate("/customer/new")}
        />
      </div>

      <ul className="flex flex-col gap-4">
        {customers.map((customer) => {
          return (
            <div key={customer.id}>
              <li className="py-3 flex flex-col gap-2">
                <h2 className="font-bold">{customer.company_name}</h2>
                <p>{customer.ceo}</p>
                <p>{customer.company_email}</p>
                <div className="flex justify-between gap-2">
                  <CommonButton
                    id="btn_editCustomer"
                    name="btn_editCustomer"
                    content="Edit"
                    warn={true}
                    icon={<PencilSimpleLine size={24} />}
                    onClick={() => navigate(`/customer/update/${customer.id}`)}
                  />

                  <CommonButton
                    id="btn_detailCustomer"
                    name="btn_detailCustomer"
                    content="Details"
                    icon={<User size={24} />}
                    onClick={() => navigate(`/customer/detail/${customer.id}`)}
                  />

                  <CommonButton
                    id="btn_deleteCustomer"
                    name="btn_deleteCustomer"
                    content="Delete"
                    danger={true}
                    icon={<TrashSimple size={24} />}
                    onClick={() =>
                      setIsVisible({
                        visible: true,
                        id: customer.id,
                        name: customer.name,
                      })
                    }
                  />
                </div>
              </li>
              <hr></hr>
            </div>
          );
        })}
      </ul>
      <ModalDelete
        isVisible={isVisible.visible}
        setIsVisible={setIsVisible}
        idEntity={isVisible.id}
        nameEntity={isVisible.name}
        onClickYes={() => handleRemove(isVisible.id)}
      />
    </div>
  );
};
