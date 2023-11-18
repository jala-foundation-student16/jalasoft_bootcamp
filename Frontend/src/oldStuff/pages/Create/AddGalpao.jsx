import { FloppyDisk } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { CommonInput } from "../../components/CommonInput/CommonInput";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addGalpao } from "../../functions/galpaoManagement";
import { toast } from "react-toastify";

export const AddGalpao = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const handleAddGalpao = async (data) => {
    const request = await addGalpao(data);
    if (request) {
      toast.success("Galpão adicionado com sucesso.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => navigate("/galpao"), 1000);
    } else {
      toast.error("Ops! houve algum erro na inserção", {
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
      <h1 className="text-xl">Adicionar Galpão</h1>

      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(handleAddGalpao)}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="in_galpao">Galpão</label>
          <CommonInput
            id="in_galpao"
            name="in_galpao"
            extra={{
              ...register("name", { required: "O galpão não pode ser vazio" }),
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
          id="btn_addGalpao"
          name="btn_addGalpao"
          content="Salvar galpão"
        />
      </form>
    </div>
  );
};
