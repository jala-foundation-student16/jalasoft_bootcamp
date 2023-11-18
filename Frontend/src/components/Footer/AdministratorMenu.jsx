import { ClipboardText, Clock, ListNumbers, NotePencil, Warehouse } from "@phosphor-icons/react";
import { ButtonBottomNav } from "../ButtonBottomNav/ButtonBottomNav";

export const AdministratorMenu = ({checkUrl, navigate}) => {
  return (
    <>
      <ButtonBottomNav
        active={checkUrl(location.pathname, "agency")}
        icon={<Warehouse size={24} />}
        text="Agencies"
        onClick={() => navigate("/agency")}
      />
      <ButtonBottomNav
        active={checkUrl(location.pathname, "task")}
        icon={<ClipboardText size={24} />}
        text="Tasks"
        onClick={() => navigate("/task")}
      />
      <ButtonBottomNav
        active={checkUrl(location.pathname, "remark")}
        icon={<NotePencil size={24} />}
        text="Remark"
        onClick={() => navigate("/remark")}
      />
      <ButtonBottomNav
        active={checkUrl(location.pathname, "customer_plan")}
        icon={<ListNumbers size={24} />}
        text="Customer Plan"
        onClick={() => navigate("/customer_plan")}
      />
      <ButtonBottomNav
        active={checkUrl(location.pathname, "schedule")}
        icon={<Clock size={24} />}
        text="Schedule"
        onClick={() => navigate("/schedule")}
      />
      {/*<ButtonBottomNav
        active={checkUrl(location.pathname, "galpao")}
        icon={<Garage size={24} />}
        text="Galpão"
        onClick={() => navigate("/galpao")}
      />
      <ButtonBottomNav
        active={checkUrl(location.pathname, "local")}
        icon={<Target size={24} />}
        text="Local"
        onClick={() => navigate("/local")}
      />
      <ButtonBottomNav
        active={checkUrl(location.pathname, "planta")}
        icon={<MapPin size={24} />}
        text="Planta"
        onClick={() => navigate("/planta")}
      />
      <ButtonBottomNav
        active={checkUrl(location.pathname, "tipo_extintor")}
        icon={<ListNumbers size={24} />}
        text="Tipo do Extintor"
        onClick={() => navigate("/tipo_extintor")}
      />

      <ButtonBottomNav
        active={checkUrl(location.pathname, "tipo_suporte")}
        icon={<Barbell size={24} />}
        text="Tipo de Suporte"
        onClick={() => navigate("/tipo_suporte")}
      />

      <ButtonBottomNav
        active={checkUrl(location.pathname, "usuario")}
        icon={<IdentificationBadge size={24} />}
        text="Gerenciamento de usuário"
        onClick={() => navigate("/usuario")}
      />

      <ButtonBottomNav
        active={checkUrl(location.pathname, "relatorio")}
        icon={<BookOpenText size={24} />}
        text="Relatórios"
        onClick={() => navigate("/relatorio")}
      /> */}
    </>
  );
};
