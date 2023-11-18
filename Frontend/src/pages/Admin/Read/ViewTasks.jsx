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
import { deleteTask } from "../../../functions/taskManagement";

export const ViewTasks = ({ tasks, setTasks }) => {
  const [isVisible, setIsVisible] = useState({
    visible: false,
    id: 0,
  });

  async function handleRemove(id) {
    const newList = tasks.filter((item) => item.id !== id);
    const request = await deleteTask(id);
    if (request) {
      setTasks(newList);
    }
  }

  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-xl">Tasks</h1>
        <CommonButton
          id="btn_addTask"
          colored={false}
          icon={<Plus size={24} />}
          onClick={() => navigate("/task/new")}
        />
      </div>

      <ul className="flex flex-col gap-4">
        {tasks.map((task) => {
          return (
            <div key={task.id}>
              <li className="py-3 flex flex-col gap-2">
                <h2 className="font-bold">{task.name}</h2>
                <div className="flex justify-between gap-2">
                  <CommonButton
                    id="btn_editTask"
                    name="btn_editTask"
                    content="Edit"
                    warn={true}
                    icon={<PencilSimpleLine size={24} />}
                    onClick={() => navigate(`/task/update/${task.id}`)}
                  />

                  <CommonButton
                    id="btn_detailTask"
                    name="btn_detailTask"
                    content="Details"
                    icon={<User size={24} />}
                    onClick={() => navigate(`/task/detail/${task.id}`)}
                  />

                  <CommonButton
                    id="btn_deleteTask"
                    name="btn_deleteTask"
                    content="Delete"
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
