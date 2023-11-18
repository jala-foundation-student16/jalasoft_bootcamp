import {
  PencilSimpleLine,
  Plus,
  TrashSimple,
  User,
} from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthenticationContext } from "../../provider/AuthenticationProvider";
import { toast } from "react-toastify";
import { deleteUser } from "../../functions/userManagement";
import { ModalDelete } from "../../components/ModalDelete/ModalDelete";

export const ViewUsers = ({ users, setUsers }) => {
  const { userData } = useContext(AuthenticationContext);
  const [isVisible, setIsVisible] = useState({
    visible: false,
    id: 0,
  });

  async function handleRemove(id) {
    if (id == userData.id) {
      toast.error("Não é possivel se excluir.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      const newListUsers = users.filter((item) => item.id !== id);
      const request = await deleteUser(id);
      if (request) {
        setUsers(newListUsers);
        toast.success("Usuário excluído com sucesso.", {
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
        toast.error(
          "Não é possivel excluir porque há informações vinculadas a esse usuário.",
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
      }
    }
  }

  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-xl">Lista de usuários</h1>
        <CommonButton
          id="btn_addEixo"
          colored={false}
          icon={<Plus size={24} />}
          onClick={() => navigate("/usuario/new")}
        />
      </div>

      <ul className="flex flex-col gap-4">
        {users.map((user) => {
          return (
            <div key={user.id}>
              <li className="py-3 flex flex-col gap-2">
                <h2 className="font-bold">{user.name}</h2>
                <p>{user.email}</p>
                <p>{user.role}</p>
                <div className="flex justify-between gap-2">
                  <CommonButton
                    id="editUser"
                    name="editUser"
                    content="Editar"
                    warn={true}
                    icon={<PencilSimpleLine size={24} />}
                    onClick={() => navigate(`/usuario/update/${user.id}`)}
                  />

                  <CommonButton
                    id="editUser"
                    name="editUser"
                    content="Detalhes"
                    icon={<User size={24} />}
                    onClick={() => navigate(`/usuario/detail/${user.id}`)}
                  />

                  <CommonButton
                    id="btn_deleteUser"
                    name="btn_deleteUser"
                    content="Excluir"
                    danger={true}
                    icon={<TrashSimple size={24} />}
                    onClick={() =>
                      setIsVisible({
                        visible: true,
                        id: user.id,
                        name: user.name,
                      })
                    }
                  />
                </div>
              </li>
              <hr></hr>
            </div>
          );
        })}
      </ul>
      <ModalDelete
        isVisible={isVisible.visible}
        setIsVisible={setIsVisible}
        idEntity={isVisible.id}
        nameEntity={isVisible.name}
        onClickYes={() => handleRemove(isVisible.id)}
      />
    </div>
  );
};
