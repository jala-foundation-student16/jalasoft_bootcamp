import { useNavigate } from "react-router-dom";

export const CardItemBoxed = ({ extintor, role }) => {
  const navigate = useNavigate();
  return (
    <a onClick={()=>navigate(`/extintor/${extintor.cilindro}`)} className="cursor-pointer">
      <li
        className={`flex flex-col gap-1 justify-between shadow-md hover:shadow-lg transition-all ease-in-out duration-300 p-3 rounded-md border border-slate-200 ${
          extintor.status == "DIVERGENTE"
            ? "bg-amber-200"
            : extintor.status == "OK"
            ? "bg-green-200"
            : "bg-red-200"
        }`}
      >
        <p className={`font-bold`}>{extintor.cilindro}</p>
        <p>Planta: {extintor.planta.name}</p>
        <p>Local: {extintor.local.name}</p>
        <p>Galpão: {extintor.galpao.name}</p>
        <p>
          Tipo:
          {extintor.tipo_extintores.map((tipo) => {
            return (
              <span
                className={`px-1 rounded-full text-white ${tipo.cor} mx-1 font-bold`}
                key={tipo.id}
              >
                {tipo.name}
              </span>
            );
          })}
        </p>
      </li>
    </a>
  );
};
