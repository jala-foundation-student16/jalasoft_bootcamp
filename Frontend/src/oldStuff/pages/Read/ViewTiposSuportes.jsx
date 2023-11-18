import { PencilSimpleLine, Plus, TrashSimple } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { ModalDelete } from "../../components/ModalDelete/ModalDelete";
import { deleteTipoSuporte } from "../../functions/tipoSuporteManagement";

export const ViewTiposSuportes = ({ tiposSuportes, setTiposSuportes }) => {
  const [isVisible, setIsVisible] = useState({
    visible: false,
    id: 0,
  });

  const navigate = useNavigate();

  async function handleRemove(id) {
    const newListTiposSuportes = tiposSuportes.filter((item) => item.id !== id);
    const request = await deleteTipoSuporte(id);
    if (request) {
      setTiposSuportes(newListTiposSuportes);
      toast.success("Tipo de suporte excluído com sucesso", {
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
        "Não é possivel excluir porque há informações vinculadas a esse tipo de suporte",
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
        <h1 className="text-xl">Tipos de suporte</h1>

        <CommonButton
          id="btn_addTipoSuporte"
          colored={false}
          icon={<Plus size={24} />}
          onClick={() => navigate("/tipo_suporte/new")}
        />
      </div>

      <ul>
        {tiposSuportes.map((tipoSuporte) => {
          return (
            <li className="py-3 flex flex-col gap-3" key={tipoSuporte.id}>
              <span className="font-bold">#{tipoSuporte.id}</span>
              <h2>{tipoSuporte.name}</h2>
              <div className="flex justify-between gap-3">
                <CommonButton
                  id="btn_editTipoSuporte"
                  name="btn_editTipoSuporte"
                  content="Editar"
                  warn={true}
                  icon={<PencilSimpleLine size={24} />}
                  onClick={() =>
                    navigate(`/tipo_suporte/update/${tipoSuporte.id}`)
                  }
                />

                <CommonButton
                  id="btn_deleteTipoSuporte"
                  name="btn_deleteTipoSuporte"
                  content="Excluir"
                  danger={true}
                  icon={<TrashSimple size={24} />}
                  onClick={() =>
                    setIsVisible({
                      visible: true,
                      id: tipoSuporte.id,
                      name: tipoSuporte.name,
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
