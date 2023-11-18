import { FloppyDisk } from "@phosphor-icons/react";
import { CommonButton } from "../../../components/CommonButton/CommonButton";
import { CommonInput } from "../../../components/CommonInput/CommonInput";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addEixo } from "../../functions/eixoManagement";
import { toast } from "react-toastify";

export const AddEixo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const handleAddEixo = async (data) => {
    const request = await addEixo(data);
    if (request) {
      toast.success("Eixo adicionado com sucesso.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => navigate("/eixo"), 1000);
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
      <h1 className="text-xl">Adicionar Eixo</h1>

      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(handleAddEixo)}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="in_eixo">Eixo</label>
          <CommonInput
            id="in_eixo"
            name="in_eixo"
            extra={{
              ...register("name", { required: "O eixo não pode ser vazio" }),
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
          id="btn_addEixo"
          name="btn_addEixo"
          content="Salvar eixo"
        />
      </form>
    </div>
  );
};
