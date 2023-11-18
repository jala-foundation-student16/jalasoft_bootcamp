import { FloppyDisk } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { CommonInput } from "../../components/CommonInput/CommonInput";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { updateLocal } from "../../functions/localManagement";
import { toast } from "react-toastify";
import { useEffect } from "react";

export const UpdLocal = ({ local }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const handleUpdateLocal = async (data) => {
    const request = await updateLocal(data);
    if (request) {
      toast.success("Local atualizado com sucesso", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => navigate("/local"), 1000);
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

  useEffect(() => {
    setValue("name", local.name);
    setValue("id", local.id);
  }, []);

  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">Editar local</h1>

      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(handleUpdateLocal)}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="in_id">ID</label>
          <CommonInput
            id="in_id"
            name="in_id"
            readOnly={true}
            extra={{
              ...register("id", { required: "O ID não pode ser vazio" }),
            }}
            className={errors?.id?.message ? "border-red-500" : ""}
          />
          {errors?.id?.message && (
            <p className="text-red-500 text-right text-sm">
              {errors.id?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="in_local">Local</label>
          <CommonInput
            id="in_local"
            name="in_local"
            extra={{
              ...register("name", { required: "O local não pode ser vazio" }),
            }}
            className={errors?.name?.message ? "border-red-500" : ""}
          />
          {errors?.name?.message && (
            <p className="text-red-500 text-right text-sm">
              {errors.name?.message}
            </p>
          )}
        </div>

        <CommonButton
          icon={<FloppyDisk size={24} />}
          id="btn_updLocal"
          name="btn_updLocal"
          content="Atualizar local"
        />
      </form>
    </div>
  );
};
