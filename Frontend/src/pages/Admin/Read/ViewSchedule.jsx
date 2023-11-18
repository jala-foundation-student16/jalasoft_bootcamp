import { PencilSimpleLine, TrashSimple } from "@phosphor-icons/react";
import { CommonButton } from "../../../components/CommonButton/CommonButton";
import { ModalDelete } from "../../../components/ModalDelete/ModalDelete";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteSchedule } from "../../../functions/scheduleManagement";

export const ViewSchedule = ({ schedule }) => {
  console.log(schedule)
  const [isVisible, setIsVisible] = useState({
    visible: false,
    id: 0,
  });

  const navigate = useNavigate();

  async function handleRemove(id) {
    const request = await deleteSchedule(id);
    if (request) {
      setTimeout(() => navigate("/schedule"), 1000);
    }
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">
        Schedule from {schedule.remark.task.name} - {schedule.remark.name}
      </h1>

      <p>
        Days to start the first execution:{" "}
        <strong>{schedule.startsAfter}</strong>
      </p>
      <p>
        Days to execute after the first execution:{" "}
        <strong>{schedule.daysToNextTask}</strong>
      </p>

      <hr />

      <h2>About the customer plan:</h2>
      <ul className="flex flex-col gap-2">
        <li>Name: {schedule.customerPlan.name}</li>
        <li>Minimum value: ${schedule.customerPlan.minimumValue}</li>
        <li>Maximum value: ${schedule.customerPlan.maximumValue}</li>
      </ul>

      <hr />

      <h2>About the remark:</h2>
      <ul className="flex flex-col gap-2">
        <li>Name: {schedule.customerPlan.name}</li>
        <li>Minimum value: ${schedule.customerPlan.minimumValue}</li>
        <li>Maximum value: ${schedule.customerPlan.maximumValue}</li>
      </ul>

      <div className="flex gap-2">
        <CommonButton
          id="btn_editSchedule"
          name="btn_editSchedule"
          content="Edit schedule"
          warn={true}
          icon={<PencilSimpleLine size={24} />}
          onClick={() => navigate(`/schedule/update/${schedule.id}`)}
        />

        <CommonButton
          id="btn_deleteSchedule"
          name="btn_deleteSchedule"
          content="Delete schedule"
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
