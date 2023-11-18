import { PencilSimpleLine, TrashSimple } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { ModalDelete } from "../../components/ModalDelete/ModalDelete";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ViewUser = ({ user }) => {
  const [isVisible, setIsVisible] = useState({
    visible: false,
    id: 0,
  });

  const navigate = useNavigate();

  async function handleRemove(id) {
    const request = await deleteUser(id);
    if (request) {
      setTimeout(() => navigate("/usuario"), 1000);
    }
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">{user.name}</h1>

      <ul className="flex flex-col gap-2">
        <li>Email: {user.email}</li>
        <li>Matrícula: {user.matricula}</li>
        <li>
          Nível de acesso: {user.role == "USER" ? "Usuário" : "Administrador"}
        </li>
        <li className="flex gap-2">
          <CommonButton
            id="btn_editUser"
            name="btn_editUser"
            content="Editar usuário"
            warn={true}
            icon={<PencilSimpleLine size={24} />}
            onClick={() => navigate(`/usuario/update/${user.id}`)}
          />

          <CommonButton
            id="btn_deleteUser"
            name="btn_deleteUser"
            content="Excluir usuário"
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
        </li>
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
