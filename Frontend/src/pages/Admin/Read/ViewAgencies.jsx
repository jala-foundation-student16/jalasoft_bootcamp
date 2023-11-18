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
import { deleteAgency } from "../../../functions/agencyManagement";

export const ViewAgencies = ({ agencies, setAgencies }) => {
  const [isVisible, setIsVisible] = useState({
    visible: false,
    id: 0,
  });

  async function handleRemove(id) {
    const newList = agencies.filter((item) => item.id !== id);
    const request = await deleteAgency(id);
    if (request) {
      setAgencies(newList);
    }
  }

  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-xl">Agencies</h1>
        <CommonButton
          id="btn_addAgency"
          colored={false}
          icon={<Plus size={24} />}
          onClick={() => navigate("/agency/new")}
        />
      </div>

      <ul className="flex flex-col gap-4">
        {agencies.map((agency) => {
          return (
            <div key={agency.id}>
              <li className="py-3 flex flex-col gap-2">
                <h2 className="font-bold">{agency.name}</h2>
                <p>{agency.email}</p>
                <p>{agency.plan}</p>
                <div className="flex justify-between gap-2">
                  <CommonButton
                    id="btn_editAgency"
                    name="btn_editAgency"
                    content="Edit"
                    warn={true}
                    icon={<PencilSimpleLine size={24} />}
                    onClick={() => navigate(`/agency/update/${agency.id}`)}
                  />

                  <CommonButton
                    id="btn_detailAgency"
                    name="btn_detailAgency"
                    content="Details"
                    icon={<User size={24} />}
                    onClick={() => navigate(`/agency/detail/${agency.id}`)}
                  />

                  <CommonButton
                    id="btn_deleteAgency"
                    name="btn_deleteAgency"
                    content="Delete"
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
