import { ListBullets, Person } from "@phosphor-icons/react";
import { ButtonBottomNav } from "../ButtonBottomNav/ButtonBottomNav";

export const AgencyOwnerMenu = ({navigate, checkUrl}) => {
return (
  <>
    <ButtonBottomNav
      active={checkUrl(location.pathname, "customer")}
      icon={<Person size={24} />}
      text="Customers"
      onClick={() => navigate("/customer")}
    />

    <ButtonBottomNav
      active={checkUrl(location.pathname, "order")}
      icon={<ListBullets size={24} />}
      text="Orders"
      onClick={() => navigate("/order")}
    />
  </>
);
}