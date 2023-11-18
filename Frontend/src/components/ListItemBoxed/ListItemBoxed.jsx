import { useNavigate } from "react-router-dom";
import { CommonButton } from "../CommonButton/CommonButton";
import { Eye, PencilSimpleLine, TrashSimple } from "@phosphor-icons/react";
export const ListItemBoxed = ({ extintor, role }) => {
  const navigate = useNavigate();
  return (
    <>
      <li className="flex flex-col gap-2 justify-between">
        <p
          className={`text-white ${
            extintor.status == "DIVERGENTE"
              ? "bg-amber-300"
              : extintor.status == "OK"
              ? "bg-green-300"
              : "bg-red-300"
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
              <span className={`px-1 rounded-full text-white ${tipo.cor} mx-1 font-bold`}>
                {tipo.name}
              </span>
            );
          })}
        </p>

        <div className="flex justify-between gap-3">
          <CommonButton
            name={`btn-ver-detalhes-${extintor.id}`}
            id={`btn-ver-detalhes-${extintor.id}`}
            onClick={() => navigate(`/extintor/${extintor.id}`)}
            icon={<Eye size={24} />}
          />

          {role === "ADMIN" && (
            <>
              <CommonButton
                id="btn_editExtintor"
                name="btn_editExtintor"
                warn={true}
                icon={<PencilSimpleLine size={24} />}
                onClick={() => navigate(`/extintor/update/${extintor.id}`)}
              />

              <CommonButton
                id="btn_deleteExtintor"
                name="btn_deleteExtintor"
                danger={true}
                icon={<TrashSimple size={24} />}
                onClick={() => handleRemove(extintor.id)}
              />
            </>
          )}
        </div>
      </li>
      <hr></hr>
    </>
  );
};
