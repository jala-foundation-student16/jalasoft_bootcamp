import { PencilSimpleLine, Plus, TrashSimple } from "@phosphor-icons/react";
import { CommonButton } from "../../../components/CommonButton/CommonButton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { deletePlanta } from "../../functions/plantaManagement";
import { ModalDelete } from "../../../components/ModalDelete/ModalDelete";

export const ViewPlantas = ({ plantas, setPlantas }) => {
  const [isVisible, setIsVisible] = useState({
    visible: false,
    id: 0,
  });
  const navigate = useNavigate();

  async function handleRemove(id) {
    const listPlantas = plantas.filter((item) => item.id !== id);
    const request = await deletePlanta(id);
    if (request) {
      setPlantas(listPlantas);
      toast.success("Planta excluída com sucesso", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error(
        "Não é possivel excluir porque há informações vinculadas a essa planta",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-xl">Plantas</h1>

        <CommonButton
          id="btn_addEixo"
          colored={false}
          icon={<Plus size={24} />}
          onClick={() => navigate("/planta/new")}
        />
      </div>

      <ul>
        {plantas.map((planta) => {
          return (
            <li className="py-3 flex flex-col gap-3" key={planta.id}>
              <span className="font-bold">#{planta.id}</span>
              <h2>{planta.name}</h2>
              <div className="flex justify-between gap-3">
                <CommonButton
                  id="btn_editPlanta"
                  name="btn_editPlanta"
                  content="Editar planta"
                  warn={true}
                  icon={<PencilSimpleLine size={24} />}
                  onClick={() => navigate(`/planta/update/${planta.id}`)}
                />

                <CommonButton
                  id="btn_deletePlanta"
                  name="btn_deletePlanta"
                  content="Excluir planta"
                  danger={true}
                  icon={<TrashSimple size={24} />}
                  onClick={() =>
                    setIsVisible({
                      visible: true,
                      id: planta.id,
                      name: planta.name,
                    })
                  }
                />
              </div>
              <hr></hr>
            </li>
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
