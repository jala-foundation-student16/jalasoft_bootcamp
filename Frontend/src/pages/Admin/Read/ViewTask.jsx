import { PencilSimpleLine, TrashSimple } from "@phosphor-icons/react";
import { CommonButton } from "../../../components/CommonButton/CommonButton";
import { ModalDelete } from "../../../components/ModalDelete/ModalDelete";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteTask } from "../../../functions/taskManagement";

export const ViewTask = ({ task }) => {
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
      <h1 className="text-xl">{task.name}</h1>

      <ul className="flex flex-col gap-2">
        <li className="flex gap-2">
          <CommonButton
            id="btn_editTask"
            name="btn_editTask"
            content="Edit task"
            warn={true}
            icon={<PencilSimpleLine size={24} />}
            onClick={() => navigate(`/task/update/${task.id}`)}
          />

          <CommonButton
            id="btn_deleteTask"
            name="btn_deleteTask"
            content="Delete task"
            danger={true}
            icon={<TrashSimple size={24} />}
            onClick={() =>
              setIsVisible({
                visible: true,
                id: task.id,
                name: task.name,
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
