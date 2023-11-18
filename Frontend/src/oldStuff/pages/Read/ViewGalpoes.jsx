import { PencilSimpleLine, Plus, TrashSimple } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ModalDelete } from "../../components/ModalDelete/ModalDelete";
import { useState } from "react";
import { deleteGalpao } from "../../functions/galpaoManagement";

export const ViewGalpoes = ({ galpoes, setGalpoes }) => {
  const [isVisible, setIsVisible] = useState({
    visible: false,
    id: 0,
  });
  const navigate = useNavigate();

  async function handleRemove(id) {
    const listGalpoes = galpoes.filter((item) => item.id !== id);
    const request = deleteGalpao(id);
    if (request) {
      setGalpoes(listGalpoes);
      toast.success("Galpão excluído com sucesso", {
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
        "Não é possivel excluir porque há informações vinculadas a esse galpão",
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
        <h1 className="text-xl">Galpões</h1>

        <CommonButton
          id="btn_addEixo"
          colored={false}
          icon={<Plus size={24} />}
          onClick={() => navigate("/galpao/new")}
        />
      </div>

      <ul>
        {galpoes.map((galpao) => {
          return (
            <li className="py-3 flex flex-col gap-3" key={galpao.id}>
              <span className="font-bold">#{galpao.id}</span>
              <h2>{galpao.name}</h2>
              <div className="flex justify-between gap-3">
                <CommonButton
                  id="btn_editGalpao"
                  name="btn_editGalpao"
                  content="Editar galpão"
                  warn={true}
                  icon={<PencilSimpleLine size={24} />}
                  onClick={() => navigate(`/galpao/update/${galpao.id}`)}
                />

                <CommonButton
                  id="btn_deleteGalpao"
                  name="btn_deleteGalpao"
                  content="Excluir galpao"
                  danger={true}
                  icon={<TrashSimple size={24} />}
                  onClick={() =>
                    setIsVisible({
                      visible: true,
                      id: galpao.id,
                      name: galpao.name,
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
