import { FloppyDisk } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { CommonInput } from "../../components/CommonInput/CommonInput";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Select from "react-select";
import { updateUser } from "../../functions/userManagement";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const UpdUser = ({ user }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm();

  const navigate = useNavigate();
  const userLevel = [
    { value: "USER", label: "Usuário" },
    { value: "ADMIN", label: "Administrador" },
  ];

  useEffect(() => {
    setValue("name", user.name);
    setValue("id", user.id);
    setValue("email", user.email);
    setValue("matricula", user.matricula);
    setValue("password", "");
    setValue("role", user.role);
  }, []);

  const handleUpdateUser = async (data) => {
    const request = updateUser(data);
    if (request) {
      toast.success("Usuario atualizado com sucesso", {
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
      toast.error("Valide os dados inseridos.", {
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

  const validateCampo = (value) => {
    if (isDirty && value.trim() === "") {
      setValue("password", "");
      return true;
    } else {
      if (isDirty && value.length < 8) {
        return "Mínimo de 8 caracteres";
      }
      return true;
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">Atualizar usuário</h1>

      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(handleUpdateUser)}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="in_id">ID</label>
          <CommonInput
            id="in_id"
            name="in_id"
            readOnly={true}
            extra={{
              ...register("id"),
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="in_name">Nome</label>
          <CommonInput
            id="in_name"
            name="in_name"
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
                validate: validateCampo,
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
          <label htmlFor="in_matricula">Nivel de acesso</label>
          <Select
            className="basic-single shadow-md"
            classNamePrefix="select"
            isMulti={false}
            name="in_role"
            {...register("role", {
              required: "É obrigatório a escolha do tipo de usuário",
            })}
            onChange={(option) => setValue("role", option?.value || "")}
            defaultValue={user.role == "USER" ? userLevel[0] : userLevel[1]}
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
          id="btn_updUser"
          name="btn_updUser"
          content="Atualizar Usuário"
        />
      </form>
    </div>
  );
};
