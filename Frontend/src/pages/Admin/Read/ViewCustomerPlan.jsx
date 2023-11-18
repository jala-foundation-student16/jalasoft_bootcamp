import { PencilSimpleLine, TrashSimple } from "@phosphor-icons/react";
import { CommonButton } from "../../../components/CommonButton/CommonButton";
import { ModalDelete } from "../../../components/ModalDelete/ModalDelete";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCustomerPlan } from "../../../functions/customerPlanManagement";

export const ViewCustomerPlan = ({ customerPlan }) => {
  const [isVisible, setIsVisible] = useState({
    visible: false,
    id: 0,
  });

  const navigate = useNavigate();

  async function handleRemove(id) {
    const request = await deleteCustomerPlan(id);
    if (request) {
      setTimeout(() => navigate("/customer_plan"), 1000);
    }
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">{customerPlan.name}</h1>

      <ul className="flex flex-col gap-2">
        <li>Minimum value: {customerPlan.minimumValue}</li>
        <li>Maximum value: {customerPlan.maximumValue}</li>
        <li className="flex gap-2">
          <CommonButton
            id="btn_editCustomerPlan"
            name="btn_editCustomerPlan"
            content="Edit customer plan"
            warn={true}
            icon={<PencilSimpleLine size={24} />}
            onClick={() => navigate(`/customer_plan/update/${customerPlan.id}`)}
          />

          <CommonButton
            id="btn_deleteCustomerPlan"
            name="btn_deleteCustomerPlan"
            content="Delete customer plan"
            danger={true}
            icon={<TrashSimple size={24} />}
            onClick={() =>
              setIsVisible({
                visible: true,
                id: customerPlan.id,
                name: customerPlan.name,
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
