import { PencilSimpleLine, TrashSimple } from "@phosphor-icons/react";
import { CommonButton } from "../../../components/CommonButton/CommonButton";
import { ModalDelete } from "../../../components/ModalDelete/ModalDelete";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteRemark } from "../../../functions/remarkManagement";

export const ViewRemark = ({ remark }) => {
  const [isVisible, setIsVisible] = useState({
    visible: false,
    id: 0,
  });

  const navigate = useNavigate();

  async function handleRemove(id) {
    const request = await deleteRemark(id);
    if (request) {
      setTimeout(() => navigate("/remark"), 1000);
    }
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">{remark.name}</h1>

      <p>Task related to: <strong>{remark.task.name}</strong></p>

      <ul className="flex flex-col gap-2">
        <li>Price: ${remark.price}</li>
        <li className="flex gap-2">
          <CommonButton
            id="btn_editRemark"
            name="btn_editRemark"
            content="Edit remark"
            warn={true}
            icon={<PencilSimpleLine size={24} />}
            onClick={() => navigate(`/remark/update/${remark.id}`)}
          />

          <CommonButton
            id="btn_deleteRemark"
            name="btn_deleteRemark"
            content="Delete remark"
            danger={true}
            icon={<TrashSimple size={24} />}
            onClick={() =>
              setIsVisible({
                visible: true,
                id: remark.id,
                name: remark.name,
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
