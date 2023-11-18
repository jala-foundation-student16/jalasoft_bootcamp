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
import { deleteRemark } from "../../../functions/remarkManagement";

export const ViewRemarks = ({ remarks, setRemarks }) => {
  const [isVisible, setIsVisible] = useState({
    visible: false,
    id: 0,
  });

  async function handleRemove(id) {
    const newList = remarks.filter((item) => item.id !== id);
    const request = await deleteRemark(id);
    if (request) {
      setRemarks(newList);
    }
  }

  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-xl">Remarks</h1>
        <CommonButton
          id="btn_addRemark"
          colored={false}
          icon={<Plus size={24} />}
          onClick={() => navigate("/remark/new")}
        />
      </div>

      <ul className="flex flex-col gap-4">
        {remarks.map((remark) => {
          return (
            <div key={remark.id}>
              <li className="py-3 flex flex-col gap-2">
                <h2 className="font-bold">{remark.name}</h2>
                <p>Remark from: {remark.task.name}</p>
                <div className="flex justify-between gap-2">
                  <CommonButton
                    id="btn_editRemark"
                    name="btn_editRemark"
                    content="Edit"
                    warn={true}
                    icon={<PencilSimpleLine size={24} />}
                    onClick={() => navigate(`/remark/update/${remark.id}`)}
                  />

                  <CommonButton
                    id="btn_detailRemark"
                    name="btn_detailRemark"
                    content="Details"
                    icon={<User size={24} />}
                    onClick={() => navigate(`/remark/detail/${remark.id}`)}
                  />

                  <CommonButton
                    id="btn_deleteRemark"
                    name="btn_deleteRemark"
                    content="Delete"
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
