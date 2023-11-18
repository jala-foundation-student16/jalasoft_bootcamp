import { PencilSimpleLine, TrashSimple } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { toast } from "react-toastify";
import { ModalDelete } from "../../components/ModalDelete/ModalDelete";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCustomer } from "../../functions/customerManagement";

export const ViewCustomer = ({ customer }) => {
  console.log(customer)
  const [isVisible, setIsVisible] = useState({
    visible: false,
    id: 0,
  });

  const navigate = useNavigate();

  async function handleRemove(id) {
    const request = await deleteCustomer(id);
    if (request) {
      toast.success("Customer deleted successfully.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => navigate("/customer"), 1000);
    } else {
      toast.error(
        "It is not possible to delete this customer, there are data releated to it.",
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

  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">{customer.company_name}</h1>

      <ul className="flex flex-col gap-2">
        <li>CEO: {customer.ceo}</li>
        <li>Phone: {customer.company_phone}</li>
        <li>Email: {customer.company_email}</li>
        <li>Website: {customer.company_website}</li>
        <li>Address: {customer.company_address}</li>
        <li>Keywords: {customer.keywords}</li>
        <li>Website login page: {customer.website_login}</li>
        <li>Website username: {customer.website_username}</li>
        <li>Website password: {customer.website_password}</li>
        <li className="flex gap-2">
          <CommonButton
            id="btn_editCustomer"
            name="btn_editCustomer"
            content="Edit customer"
            warn={true}
            icon={<PencilSimpleLine size={24} />}
            onClick={() => navigate(`/customer/update/${customer.id}`)}
          />

          <CommonButton
            id="btn_deleteCustomer"
            name="btn_deleteCustomer"
            content="Delete customer"
            danger={true}
            icon={<TrashSimple size={24} />}
            onClick={() =>
              setIsVisible({
                visible: true,
                id: customer.id,
                name: customer.company_name,
              })
            }
          />
        </li>
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
