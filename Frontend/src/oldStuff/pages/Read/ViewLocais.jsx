import { PencilSimpleLine, Plus, TrashSimple } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteLocal } from "../../functions/localManagement";
import { useState } from "react";
import { ModalDelete } from "../../components/ModalDelete/ModalDelete";

export const ViewLocais = ({ locais, setLocais }) => {
  const [isVisible, setIsVisible] = useState({
    visible: false,
    id: 0,
  });

  async function handleRemove(id) {
    const newListLocais = locais.filter((item) => item.id !== id);
    const request = await deleteLocal(id);
    if (request) {
      setLocais(newListLocais);
      toast.success("Local excluído com sucesso", {
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
        "Não é possivel excluir porque há informações vinculadas a esse local",
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
        <h1 className="text-xl">Locais</h1>

        <CommonButton
          id="btn_addLocal"
          colored={false}
          icon={<Plus size={24} />}
          onClick={() => navigate("/local/new")}
        />
      </div>

      <ul>
        {locais.map((local) => {
          return (
            <li className="py-3 flex flex-col gap-3" key={local.id}>
              <span className="font-bold">#{local.id}</span>
              <h2>{local.name}</h2>
              <div className="flex justify-between gap-3">
                <CommonButton
                  id="btn_editLocal"
                  name="btn_editLocal"
                  content="Editar local"
                  warn={true}
                  icon={<PencilSimpleLine size={24} />}
                  onClick={() => navigate(`/local/update/${local.id}`)}
                />

                <CommonButton
                  id="btn_deleteLocal"
                  name="btn_deleteLocal"
                  content="Excluir local"
                  danger={true}
                  icon={<TrashSimple size={24} />}
                  onClick={() =>
                    setIsVisible({
                      visible: true,
                      id: local.id,
                      name: local.name,
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
