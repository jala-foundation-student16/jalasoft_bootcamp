import {
  Eye,
  EyeSlash,
  PencilSimpleLine,
  StopCircle,
} from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { ModalDelete } from "../../components/ModalDelete/ModalDelete";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ViewOrder = ({ order }) => {
  const [isVisible, setIsVisible] = useState({
    visible: false,
    id: 0,
  });
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const navigate = useNavigate();

  const changePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  async function handleRemove(id) {
    const request = await deleteOrder(id);
    if (request) {
      setTimeout(() => navigate("/order"), 1000);
    }
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">
        {order.id} - {order.customer.companyName}
      </h1>

      <ul className="flex flex-col gap-2">
        <li>Client information: {order.clientInformation}</li>
        <li>CEO: {order.customer.ceo}</li>
        <li>Company Address: {order.customer.companyAddress}</li>
        <li>Company Email: {order.customer.companyEmail}</li>
        <li>Company Phone: {order.customer.companyPhone}</li>
        <li>Company Website: {order.customer.companyWebsite}</li>
        <li>Keywords: {order.customer.keywords}</li>
        <li>Website login: {order.customer.websiteLogin}</li>
        <li>Website username: {order.customer.websiteUsername}</li>
        <li className="flex items-center gap-2">
          <span
            onClick={changePasswordVisibility}
            className="p-1 bg-blue-500 text-white rounded-md hover:bg-blue-800 transition-colors ease-in-out duration-300"
          >
            {passwordVisibility ? <Eye size={24} /> : <EyeSlash size={24} />}
          </span>
          Website password:{" "}
          {passwordVisibility ? order.customer.websitePassword : "*********"}{" "}
        </li>
        <li className="flex gap-2">
          <CommonButton
            id="btn_editUser"
            align
            name="btn_editUser"
            content="Edit"
            warn={true}
            icon={<PencilSimpleLine size={24} />}
          />

          <CommonButton
            id="btn_deleteUser"
            name="btn_deleteUser"
            content="Stop order"
            danger={true}
            icon={<StopCircle size={24} />}
            // onClick={() =>
            //   setIsVisible({
            //     visible: true,
            //     id: order.id,
            //     name: order.name,
            //   })
            // }
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
