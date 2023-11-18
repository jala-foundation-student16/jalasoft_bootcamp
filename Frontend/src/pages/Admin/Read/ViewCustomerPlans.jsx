import {
  PencilSimpleLine,
  Plus,
  TrashSimple,
  User,
} from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CommonButton } from "../../../components/CommonButton/CommonButton";
import { ModalDelete } from "../../../components/ModalDelete/ModalDelete";
import { deleteCustomerPlan } from "../../../functions/customerPlanManagement";

export const ViewCustomerPlans = ({ plans, setPlans }) => {
  const [isVisible, setIsVisible] = useState({
    visible: false,
    id: 0,
  });

  async function handleRemove(id) {
    const newList = plans.filter((item) => item.id !== id);
    const request = await deleteCustomerPlan(id);
    if (request) {
      setPlans(newList);
    }
  }

  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-xl">Plans</h1>
        <CommonButton
          id="btn_addPlan"
          colored={false}
          icon={<Plus size={24} />}
          onClick={() => navigate("/customer_plan/new")}
        />
      </div>

      <ul className="flex flex-col gap-4">
        {plans.map((plan) => {
          return (
            <div key={plan.id}>
              <li className="py-3 flex flex-col gap-2">
                <h2 className="font-bold">{plan.name}</h2>
                <div className="flex justify-between gap-2">
                  <CommonButton
                    id="btn_editPlan"
                    name="btn_editPlan"
                    content="Edit"
                    warn={true}
                    icon={<PencilSimpleLine size={24} />}
                    onClick={() => navigate(`/customer_plan/update/${plan.id}`)}
                  />

                  <CommonButton
                    id="btn_detailPlan"
                    name="btn_detailPlan"
                    content="Details"
                    icon={<User size={24} />}
                    onClick={() => navigate(`/customer_plan/detail/${plan.id}`)}
                  />

                  <CommonButton
                    id="btn_deletePlan"
                    name="btn_deletePlan"
                    content="Delete"
                    danger={true}
                    icon={<TrashSimple size={24} />}
                    onClick={() =>
                      setIsVisible({
                        visible: true,
                        id: plan.id,
                        name: plan.name,
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
