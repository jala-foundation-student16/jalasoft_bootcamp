import {
  Barbell,
  Barcode,
  BookOpenText,
  CircleDashed,
  FireExtinguisher,
  Garage,
  House,
  IdentificationBadge,
  Info,
  ListBullets,
  ListNumbers,
  MapPin,
  Person,
  Target,
  User,
} from "@phosphor-icons/react";
import { ButtonBottomNav } from "../ButtonBottomNav/ButtonBottomNav";
import { useContext } from "react";
import { AuthenticationContext } from "../../provider/AuthenticationProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { AgencyOwnerMenu } from "./AgencyOwnerMenu";
import { AdministratorMenu } from "./AdministratorMenu";

export const Footer = () => {
  const { isAuthenticated, userData } = useContext(AuthenticationContext);
  const location = useLocation();
  const navigate = useNavigate();

  const checkUrl = (url, place) => {
    const part = url.split("/");
    if (part[1] === place) {
      return true;
    }

    return false;
  };

  if (isAuthenticated) {
    return (
      <div
        className={`flex w-full p-2 text-center items-center overflow-x-scroll justify-between ${
          userData.role == "ADMIN" ? "bg-blue-950" : "bg-blue-600"
        }`}
      >
        <ButtonBottomNav
          active={location.pathname === "/home" ? true : false}
          icon={<House size={24} />}
          text="Home"
          onClick={() => navigate("/home")}
        />
        {userData.role === "ADMIN" && (
         <AdministratorMenu checkUrl={checkUrl} navigate={navigate} />
        )}
        {userData.role === "AGENCYOWNER" && (
         <AgencyOwnerMenu checkUrl={checkUrl} navigate={navigate} />
        )}
        <ButtonBottomNav
          active={location.pathname === "/about" ? true : false}
          icon={<Info size={24} />}
          text="About"
          onClick={() => navigate("/about")}
        />
      </div>
    );
  }

  return (
    <footer className="text-center bg-blue-700 text-white p-3">
      Projeto desenvolvido pela S1mple
    </footer>
  );
};
