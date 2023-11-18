import { FloppyDisk } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { CommonInput } from "../../components/CommonInput/CommonInput";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addPlanta } from "../../functions/plantaManagement";
import { toast } from "react-toastify";

export const AddPlanta = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const handleAddPlanta = async (data) => {
    const request = await addPlanta(data);
    if (request) {
      toast.success("Planta adicionada com sucesso.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => navigate("/planta"), 1000);
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
      <h1 className="text-xl">Adicionar Planta</h1>

      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(handleAddPlanta)}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="in_planta">Planta</label>
          <CommonInput
            id="in_planta"
            name="in_planta"
            extra={{
              ...register("name", {
                required: "A planta não pode ser vazia",
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
          id="btn_addPlanta"
          name="btn_addPlanta"
          content="Salvar planta"
        />
      </form>
    </div>
  );
};
