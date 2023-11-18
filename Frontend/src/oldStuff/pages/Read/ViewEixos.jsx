import { PencilSimpleLine, Plus, TrashSimple } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ModalDelete } from "../../components/ModalDelete/ModalDelete";
import { deleteEixo } from "../../functions/eixoManagement";
import { toast } from "react-toastify";

export const ViewEixos = ({ eixos, setEixos }) => {
  const [isVisible, setIsVisible] = useState({
    visible: false,
    id: 0,
  });

  async function handleRemove(id) {
    const newListEixos = eixos.filter((item) => item.id !== id);
    const request = dedeleteEixo(id);
    if (request) {
      setEixos(newListEixos);
      toast.success("Eixo excluído com sucesso", {
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
        "Não é possivel excluir porque há informações vinculadas a esse eixo",
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

  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-xl">Eixos</h1>

        <CommonButton
          id="btn_addEixo"
          colored={false}
          icon={<Plus size={24} />}
          onClick={() => navigate("/eixo/new")}
        />
      </div>

      <ul>
        {eixos.map((eixo) => {
          return (
            <li className="py-3 flex flex-col gap-3" key={eixo.id}>
              <span className="font-bold">#{eixo.id}</span>
              <h2>{eixo.name}</h2>
              <div className="flex justify-between gap-3">
                <CommonButton
                  id="btn_editEixo"
                  name="btn_editEixo"
                  content="Editar eixo"
                  warn={true}
                  icon={<PencilSimpleLine size={24} />}
                  onClick={() => navigate(`/eixo/update/${eixo.id}`)}
                />

                <CommonButton
                  id="btn_deleteEixo"
                  name="btn_deleteEixo"
                  content="Excluir eixo"
                  danger={true}
                  icon={<TrashSimple size={24} />}
                  onClick={() =>
                    setIsVisible({
                      visible: true,
                      id: eixo.id,
                      name: eixo.name,
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
