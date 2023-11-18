import { FloppyDisk, Hammer } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { CommonInput } from "../../components/CommonInput/CommonInput";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addTipoSuporte } from "../../functions/tipoSuporteManagement";
import { toast } from "react-toastify";

export const AddTipoSuporte = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const handleAddTipoSuporte = async (data) => {
    const request = addTipoSuporte(data);

    if (request) {
      toast.success("Tipo de suporte adicionado com sucesso.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => navigate("/tipo_suporte"), 1000);
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
      <h1 className="text-xl">Adicionar tipo de suporte</h1>

      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(handleAddTipoSuporte)}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="in_tipoSuporte">Tipo de suporte</label>
          <CommonInput
            id="in_tipoSuporte"
            name="in_tipoSuporte"
            extra={{
              ...register("name", {
                required: "O tipo de suporte não pode ser vazio",
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
          id="btn_addTipoSuporte"
          name="btn_addTipoSuporte"
          content="Salvar tipo de suporte"
        />
      </form>
    </div>
  );
};
