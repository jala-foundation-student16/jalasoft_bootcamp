import { deleteUser, getUsers } from "../functions/reqres";
import { useState } from "react";
import { useEffect } from "react";
import { CommonButton } from "../components/CommonButton/CommonButton";
import { Pencil, Trash, Plus } from "@phosphor-icons/react";
import { ModalDelete } from "../components/ModalDelete/ModalDelete";

export const Home = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [isVisible, setIsVisible] = useState({
    visible: false,
    id: 0,
  });

  useEffect(() => {
    async function getData() {
      const data = await getUsers(page);
      setUsers(data.data);
      setPage(page + 1); //there is a better way to do it, but iḿ nervous
    }

    getData();
  }, []);

  async function handleRemove(id) {
    const newListUsers = users.filter((item) => item.id !== id);
    const request = deleteUser(id);
    if (request) {
      setUsers(newListUsers);
    }
  }

  async function getNewData() {
    const data = await getUsers(page);
    setUsers([...data]);
    setPage(page + 1); //there is a better way to do it, but iḿ nervous
    console.log(users);
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-xl">Users</h1>
        <CommonButton
          id="btn_addEixo"
          colored={false}
          icon={<Plus size={24} />}
          onClick={() => navigate("/usuario/new")}
        />
      </div>
      <ul className="flex flex-wrap gap-5 ">
        {users.map((e) => {
          return (
            <li
              key={e.id}
              className="flex flex-row gap-4 shadow-md hover:shadow-lg transition-all ease-in-out duration-300 p-3 rounded-md border border-slate-200"
            >
              <img src={e.avatar} alt={e.first_name} />
              <div className="flex flex-col gap-1">
                <p>Name: {e.first_name}</p>
                <p>Last name: {e.last_name}</p>
                <p>Email: {e.email}</p>

                <div className="flex flex-row gap-5">
                  <CommonButton
                    warn={true}
                    icon={<Pencil size={24} />}
                    onClick={() => {}}
                    content="Edit"
                  />

                  <CommonButton
                    danger={true}
                    icon={<Trash size={24} />}
                    onClick={() => {
                      setIsVisible({
                        visible: true,
                        id: e.id,
                        name: e.first_name+" "+e.last_name,
                      });
                    }}
                    content="Delete"
                  />
                </div>
              </div>
            </li>
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