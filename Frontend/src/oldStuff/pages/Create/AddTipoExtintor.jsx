import { CircleDashed, FloppyDisk, UsersFour } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { CommonInput } from "../../components/CommonInput/CommonInput";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addTipoExtintor } from "../../functions/tipoExtintorManagement";
import { toast } from "react-toastify";

export const AddTipoExtintor = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const handleAddTipoExtintor = async (data) => {
    const request = await addTipoExtintor(data);
    if (request) {
      toast.success("Tipo de extintor adicionado com sucesso.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => navigate("/tipo_extintor"), 1000);
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
      <h1 className="text-xl">Adicionar Tipo de Extintor</h1>

      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(handleAddTipoExtintor)}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="in_tipoExtintor">Tipo de Extintor</label>
          <CommonInput
            id="in_tipoExtintor"
            name="in_tipoExtintor"
            extra={{
              ...register("name", {
                required: "O tipo do extintor não pode ser vazio",
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

        <CommonButton
          icon={<FloppyDisk size={24} />}
          id="btn_addTipoExtintor"
          name="btn_addTipoExintor"
          content="Salvar Tipo de Extintor"
        />
      </form>
    </div>
  );
};
