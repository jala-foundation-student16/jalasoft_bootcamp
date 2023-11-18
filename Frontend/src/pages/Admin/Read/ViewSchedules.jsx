import {
  PencilSimpleLine,
  Plus,
  TrashSimple,
  User,
} from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { CommonButton } from "../../../components/CommonButton/CommonButton";
import { ModalDelete } from "../../../components/ModalDelete/ModalDelete";

export const ViewSchedules = ({ schedules, setSchedules }) => {
  const [isVisible, setIsVisible] = useState({
    visible: false,
    id: 0,
  });

  async function handleRemove(id) {
    const newList = schedules.filter((item) => item.id !== id);
    const request = await deleteCustomer(id);
    if (request) {
      setSchedules(newList);
    }
  }

  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-xl">Schedules</h1>
        <CommonButton
          id="btn_addSchedule"
          colored={false}
          icon={<Plus size={24} />}
          onClick={() => navigate("/schedule/new")}
        />
      </div>

      <ul className="flex flex-col gap-4">
        {schedules.map((schedule) => {
          return (
            <div key={schedule.id}>
              <li className="py-3 flex flex-col gap-2">
                <h2 className="font-bold">
                  {schedule.customerPlan.name} - {schedule.remark.name}
                </h2>
                <p>Remark from: {schedule.remark.task.name}</p>
                <div className="flex justify-between gap-2">
                  <CommonButton
                    id="btn_editSchedule"
                    name="btn_editSchedule"
                    content="Edit"
                    warn={true}
                    icon={<PencilSimpleLine size={24} />}
                    onClick={() => navigate(`/schedule/update/${schedule.id}`)}
                  />

                  <CommonButton
                    id="btn_detailSchedule"
                    name="btn_detailSchedule"
                    content="Details"
                    icon={<User size={24} />}
                    onClick={() => navigate(`/schedule/detail/${schedule.id}`)}
                  />

                  <CommonButton
                    id="btn_deleteSchedule"
                    name="btn_deleteSchedule"
                    content="Delete"
                    danger={true}
                    icon={<TrashSimple size={24} />}
                    onClick={() =>
                      setIsVisible({
                        visible: true,
                        id: schedule.id,
                        name: schedule.name,
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
