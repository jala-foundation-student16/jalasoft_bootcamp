import { CheckSquare, Play, TrashSimple } from "@phosphor-icons/react";
import { CommonButton } from "../../../components/CommonButton/CommonButton";
import { ModalDelete } from "../../../components/ModalDelete/ModalDelete";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteTask } from "../../../functions/taskManagement";

export const ViewOrder = ({ order }) => {
  const [isVisible, setIsVisible] = useState({
    visible: false,
    id: 0,
  });

  const navigate = useNavigate();

  async function handleRemove(id) {
    const request = await deleteTask(id);
    if (request) {
      setTimeout(() => navigate("/task"), 1000);
    }
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">Order #{order.id}</h1>

      <p>Client {order.order.customer.company_name}</p>
      <p>Task: {order.schedule.remark.task.name}</p>
      <p>Remark: {order.schedule.remark.name}</p>

      <ul className="flex flex-col gap-2">
        <li className="flex gap-2">
          <CommonButton
            id="btn_startOrder"
            name="btn_startOrder"
            content="Start order"
            className="bg-lime-500 text-white"
            icon={<Play size={24} />}
            onClick={() =>
              alert("Criar função para startar a tarefa e voltar pra home")
            }
          />

          <CommonButton
            id="btn_deleteTask"
            name="btn_deleteTask"
            content="Delete task"
            danger={true}
            icon={<CheckSquare size={24} />}
            onClick={() =>
              alert("Criar função para finalizar a tarefa e verificar os dados")
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
