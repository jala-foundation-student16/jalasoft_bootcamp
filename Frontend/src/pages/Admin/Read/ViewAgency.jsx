import { PencilSimpleLine, TrashSimple } from "@phosphor-icons/react";
import { CommonButton } from "../../../components/CommonButton/CommonButton";
import { ModalDelete } from "../../../components/ModalDelete/ModalDelete";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteAgency } from "../../../functions/agencyManagement";

export const ViewAgency = ({ agency }) => {
  const [isVisible, setIsVisible] = useState({
    visible: false,
    id: 0,
  });

  const navigate = useNavigate();

  async function handleRemove(id) {
    const request = await deleteAgency(id);
    if (request) {
      setTimeout(() => navigate("/agency"), 1000);
    }
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">{agency.name}</h1>

      <ul className="flex flex-col gap-2">
        <li>Phone: {agency.company_phone}</li>
        <li>Email: {agency.email}</li>
        <li>Website: {agency.website}</li>
        <li>Notes: {agency.notes}</li>
        <li className="flex gap-2">
          <CommonButton
            id="btn_editAgency"
            name="btn_editAgency"
            content="Edit agency"
            warn={true}
            icon={<PencilSimpleLine size={24} />}
            onClick={() => navigate(`/agency/update/${agency.id}`)}
          />

          <CommonButton
            id="btn_deleteAgency"
            name="btn_deleteAgency"
            content="Delete agency"
            danger={true}
            icon={<TrashSimple size={24} />}
            onClick={() =>
              setIsVisible({
                visible: true,
                id: agency.id,
                name: agency.name,
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
