import { FloppyDisk, User } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { CommonInput } from "../../components/CommonInput/CommonInput";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select";
import { addUser } from "../../functions/userManagement";
import { useEffect } from "react";

export const AddUser = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const userLevel = [
    { value: "USER", label: "Usuário" },
    { value: "ADMIN", label: "Administrador" },
  ];

  useEffect(() => setValue("role", userLevel[0].value), []);

  const handleAddUser = async (data) => {
    const request = await addUser(data);
    if (request) {
      toast.success("Usuário adicionado com sucesso.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => navigate("/usuario"), 1000);
    } else {
      toast.error("Ops! houve algum erro na inserção.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">Adicionar usuário</h1>

      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(handleAddUser)}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="in_nome">Nome</label>
          <CommonInput
            id="in_nome"
            name="in_nome"
            extra={{
              ...register("name", {
                required: "O nome não pode ser vazio",
                maxLength: 30,
              }),
            }}
            className={errors?.name?.message ? "border-red-500" : ""}
          />
          {errors?.name?.message && (
            <p className="text-red-500 text-right text-sm">
              {errors.name?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="in_email">Email</label>
          <CommonInput
            id="in_email"
            name="in_email"
            type="email"
            extra={{
              ...register("email", {
                required: "O email não pode ser vazio",
                maxLength: 150,
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                  message: "Insira um e-mail válido",
                },
              }),
            }}
            className={errors?.email?.message ? "border-red-500" : ""}
          />
          {errors?.email?.message && (
            <p className="text-red-500 text-right text-sm">
              {errors.email?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="in_password">Senha</label>
          <CommonInput
            id="in_password"
            name="in_password"
            type="password"
            extra={{
              ...register("password", {
                required: "A senha não pode ser vazia",
                minLength: {
                  value: 8,
                  message: "A senha deve conter no mínimo 8 caracteres",
                },
              }),
            }}
            className={errors?.password?.message ? "border-red-500" : ""}
          />
          {errors?.password?.message && (
            <p className="text-red-500 text-right text-sm">
              {errors.password?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="in_matricula">Matricula</label>
          <CommonInput
            id="in_matricula"
            name="in_matricula"
            extra={{
              ...register("matricula", {
                required: "A matrícula não pode ser vazia",
              }),
            }}
            className={errors?.matricula?.message ? "border-red-500" : ""}
          />
          {errors?.matricula?.message && (
            <p className="text-red-500 text-right text-sm">
              {errors.matricula?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="in_role">Nivel de acesso</label>
          <Select
            className="basic-single shadow-md"
            classNamePrefix="select"
            isMulti={false}
            isSearchable={true}
            name="in_role"
            {...register("role", {
              required: "É obrigatório a escolha do tipo de usuário",
            })}
            onChange={(option) => setValue("role", option?.value || "")}
            defaultValue={userLevel[0]}
            options={userLevel}
          />
          {errors?.role?.message && (
            <p className="text-red-500 text-right text-sm">
              {errors.role?.message}
            </p>
          )}
        </div>

        <CommonButton
          icon={<FloppyDisk size={24} />}
          id="btnAddUser"
          name="btnAddUser"
          content="Adicionar Usuário"
        />
      </form>
    </div>
  );
};
