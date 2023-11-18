import { SignOut } from "@phosphor-icons/react";
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../provider/AuthenticationProvider";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { LoadingComponent } from "../LoadingComponent/LoadingComponent";
import { Footer } from "../Footer/Footer";
import { toast } from "react-toastify";
import { ButtonBottomNav } from "../ButtonBottomNav/ButtonBottomNav";
import { getEmail, getToken } from "../../functions/localstorage";
import { logoutUser } from "../../functions/auth";


export const Header = () => {
  const { isAuthenticated, setIsAuthenticated } =
    useContext(AuthenticationContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  async function getData() {
    try {
      console.log(getToken())
      // User is not authenticated
      if (getToken() === null) {
        // User is not authenticated and trying to access a protected route
        if (location.pathname !== "/login") {
          toast.error("You need to be authenticated", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/login");
          setIsAuthenticated(false);
          setIsLoading(false);
          return false;
        }

        navigate("/login");
        setIsAuthenticated(false);
        setIsLoading(false);
        return false;
      }

      // User is authenticated
      setIsAuthenticated(true)
      setIsLoading(false);
      return true;
    } catch {
      // Error on trying
      setIsLoading(false);
      return false;
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <header className="w-full">
        <nav className="flex bg-blue-700 text-white p-3 justify-between items-center">
          <div className="flex gap-5 items-center">
            <p className="text-xl">{getEmail() !== "" ? getEmail() :"Jalasoft"}</p>
          </div>

          <div className="flex items-center">
            <ButtonBottomNav
              icon={<SignOut size={24} />}
              onClick={() => {
                if (getToken() !== "") {
                  logoutUser(setIsAuthenticated);
                  navigate("/login");
                  toast.success("See you later!", {
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
                  toast.error("It was not possible to logout", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                }
              }}
              className={``}
            />
          </div>
        </nav>
      </header>

      <main className="flex flex-1 overflow-y-scroll no-scrollbar">
        <Outlet />
      </main>

      <Footer />
    </LoadingComponent>
  );
};
