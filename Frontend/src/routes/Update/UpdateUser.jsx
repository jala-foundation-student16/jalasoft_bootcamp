import { useEffect, useState } from "react";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { UpdUser } from "../../pages/Update/UpdUser";
import { getUser } from "../../functions/userManagement";

export const UpdateUser = () => {
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
      <UpdUser user={user} />
    </LoadingComponent>
  );
};
