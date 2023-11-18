import { CircleDashed, FloppyDisk } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { CommonInput } from "../../components/CommonInput/CommonInput";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addLocal } from "../../functions/localManagement";
import { toast } from "react-toastify";

export const AddLocal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const handleAddLocal = async (data) => {
    const request = await addLocal(data);
    if (request) {
      toast.success("Local adicionado com sucesso.", {
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
      <h1 className="text-xl">Adicionar local</h1>

      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(handleAddLocal)}
      >
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
          id="btn_addLocal"
          name="btn_addLocal"
          content="Salvar local"
        />
      </form>
    </div>
  );
};
