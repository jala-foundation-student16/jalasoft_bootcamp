import { useEffect, useState } from "react";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { getUsers } from "../../functions/userManagement";
import { ViewUsers } from "../../pages/Read/ViewUsers";
import { toast } from "react-toastify";

export const ListUsers = () => {
  const [listUsers, setListUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getUsersList() {
      try {
        const data = await getUsers();

        if (data == null) {
          toast.error("Não há dados a ser carregados.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setIsLoading(false);
        } else {
          setListUsers(data);
          setIsLoading(false);
        }
      } catch (error) {
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
        console.log(error);
        setIsLoading(false);
      }
    }

    getUsersList();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <ViewUsers users={listUsers} setUsers={setListUsers} />
    </LoadingComponent>
  );
};
