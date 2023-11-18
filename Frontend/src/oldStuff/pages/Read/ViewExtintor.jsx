import { Barcode, ClipboardText } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { useNavigate } from "react-router-dom";

export const ViewExtintor = ({ extintor }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-lg">Extintor {extintor.cilindro}</h1>

      <ul className="flex flex-col gap-1">
        <li className="font-bold">Localização</li>
        <li>Planta: {extintor.planta.name}</li>
        <li>Local: {extintor.local.name}</li>
        <li>Galpão: {extintor.galpao.name}</li>
      </ul>

      <hr></hr>

      <ul className="flex flex-col gap-1">
        <li className="font-bold">Sobre o extintor</li>
        <li>
          Tipo:{" "}
          {extintor.tipo_extintores.map((tipo) => {
            return (
          <span className={`px-1 rounded-full text-white ${tipo.cor} mx-1 font-bold`} key={tipo.id}>
            {tipo.name}
          </span>
           );
          })}
        </li>
        <li>Suporte: {extintor.tipo_suporte.name}</li>
        <li>Eixo: {extintor.eixo.name}</li>
        <li>Cilindro: {extintor.cilindro}</li>
        <li>Vencimento: {extintor.data_vencimento}</li>
        <li>Vencimento do teste hidroestático: {extintor.vencimento_th}</li>
        <li>Ultimo Bombeiro que avaliou: {extintor.ultima_avaliacao}</li>
        <li>Matricula: {extintor.matricula}</li>
      </ul>

      <CommonButton
        icon={<ClipboardText size={24} />}
        name="btn-realizar-avaliacao"
        id="btn-realizar-avaliacao"
        content="Realizar Avaliação"
        onClick={()=>navigate(`/avaliacao/${extintor.id}`)}
      />
      <CommonButton
        icon={<Barcode size={24} />}
        name="btn-ler-qrcode"
        id="btn-ler-qrcode"
        content="Ler novo QR Code"
        onClick={()=>navigate("/pesquisa")}
      />
    </div>
  );
};
