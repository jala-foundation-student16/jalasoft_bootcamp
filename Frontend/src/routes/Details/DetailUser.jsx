import { useNavigate, useParams } from "react-router-dom";
import { ViewUser } from "../../pages/Read/ViewUser";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUser } from "../../functions/userManagement";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";

export const DetailUser = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserUnity() {
      try {
        const data = await getUser(id);
        if (data == null) {
          toast.error(
            "Houve um erro no carregamento dos dados, tente novamente.",
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
          setIsLoading(false);
          navigate("/usuario");
        } else {
          setUser(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        toast.error(
          "Houve um erro no carregamento dos dados, tente novamente.",
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
        setIsLoading(false);
        navigate("/usuario");
      }
    }

    getUserUnity();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <ViewUser user={user} />
    </LoadingComponent>
  );
};
