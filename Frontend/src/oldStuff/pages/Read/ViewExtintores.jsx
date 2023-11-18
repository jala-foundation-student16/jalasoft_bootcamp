import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  PencilSimpleLine,
  Plus,
  TrashSimple,
} from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { ModalDelete } from "../../components/ModalDelete/ModalDelete";
import { deleteExtintor } from "../../functions/extintorManagement";

export const ViewExtintores = ({ extintores, setExtintores, role }) => {
  const [isVisible, setIsVisible] = useState({
    visible: false,
    id: 0,
  });

  async function handleRemove(id) {
    const newListExtintores = extintores.filter((item) => item.id !== id);
    const request = await deleteExtintor(id);
    if (request) {
      setExtintores(newListExtintores);
      toast.success("Extintor excluído com sucesso", {
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
        "Não é possivel excluir porque há informações vinculadas a esse extintor",
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
    <div className="flex flex-col gap-10 w-full">
      <section id="openTickets" className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h1 className="text-xl">Lista de extintores</h1>
          {role === "ADMIN" && (
            <CommonButton
              id="btn_addEixo"
              colored={false}
              icon={<Plus size={24} />}
              onClick={() => navigate("/extintor/new")}
            />
          )}
        </div>

        <ul className="flex flex-col gap-4">
          {extintores.map((extintor) => (
            <li
              className="flex flex-col gap-2 justify-between"
              key={extintor.id}
            >
              <p
                className={`text-white ${
                  extintor.status == "DIVERGENTE"
                    ? "bg-amber-600"
                    : extintor.status == "OK"
                    ? "bg-green-600"
                    : "bg-red-600"
                } py-2 px-4 w-fit rounded-full`}
              >
                {extintor.cilindro}
              </p>
              <p>Planta: {extintor.planta.name}</p>
              <p>Local: {extintor.local.name}</p>
              <p>Galpão: {extintor.galpao.name}</p>
              <p>
                Tipo:
                {extintor.tipo_extintores.map((tipo) => {
                  return (
                    <span
                      className={`px-1 rounded-full text-white ${tipo.cor} mx-1 font-bold`}
                      key={`tipo-${tipo.id}`}
                    >
                      {tipo.name}
                    </span>
                  );
                })}
              </p>

              <div className="flex justify-between gap-3">
                <CommonButton
                  name={`btn-ver-detalhes-${extintor.id}`}
                  id={`btn-ver-detalhes-${extintor.id}`}
                  onClick={() => navigate(`/extintor/${extintor.cilindro}`)}
                  icon={<Eye size={24} />}
                />

                {role === "ADMIN" && (
                  <>
                    <CommonButton
                      id="btn_editExtintor"
                      name="btn_editExtintor"
                      warn={true}
                      icon={<PencilSimpleLine size={24} />}
                      onClick={() =>
                        navigate(`/extintor/update/${extintor.id}`)
                      }
                    />

                    <CommonButton
                      id="btn_deleteExtintor"
                      name="btn_deleteExtintor"
                      danger={true}
                      icon={<TrashSimple size={24} />}
                      onClick={() =>
                        setIsVisible({
                          visible: true,
                          id: extintor.id,
                          name: extintor.cilindro,
                        })
                      }
                    />
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

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
