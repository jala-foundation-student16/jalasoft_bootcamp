import { PencilSimpleLine, Plus, TrashSimple } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteTipoExtintor } from "../../functions/tipoExtintorManagement";
import { useState } from "react";
import { ModalDelete } from "../../components/ModalDelete/ModalDelete";

export const ViewTiposExtintores = ({
  tiposExtintores,
  setTiposExtintores,
}) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState({
    visible: false,
    id: 0,
  });

  async function handleRemove(id) {
    const newListTiposExtintores = tiposExtintores.filter(
      (item) => item.id !== id
    );
    const request = await deleteTipoExtintor(id);
    if (request) {
      setTiposExtintores(newListTiposExtintores);
      toast.success("Tipo de extintor excluído com sucesso", {
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
        "Não é possivel excluir porque há informações vinculadas a esse tipo de extintor",
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
        <h1 className="text-xl">Tipos de Extintores</h1>

        <CommonButton
          id="btn_addTipoExtintor"
          colored={false}
          icon={<Plus size={24} />}
          onClick={() => navigate("/tipo_extintor/new")}
        />
      </div>

      <ul>
        {tiposExtintores.map((tipoExintor) => {
          return (
            <li className="py-3 flex flex-col gap-3" key={tipoExintor.id}>
              <span className="font-bold">#{tipoExintor.id}</span>
              <h2>{tipoExintor.name}</h2>
              <div className="flex justify-between gap-3">
                <CommonButton
                  id="btn_editTipoExintor"
                  name="btn_editTipoExintor"
                  content="Editar"
                  warn={true}
                  icon={<PencilSimpleLine size={24} />}
                  onClick={() =>
                    navigate(`/tipo_extintor/update/${tipoExintor.id}`)
                  }
                />

                <CommonButton
                  id="btn_deleteTipoExintor"
                  name="btn_deleteTipoExintor"
                  content="Excluir"
                  danger={true}
                  icon={<TrashSimple size={24} />}
                  onClick={() =>
                    setIsVisible({
                      visible: true,
                      id: tipoExintor.id,
                      name: tipoExintor.name,
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
