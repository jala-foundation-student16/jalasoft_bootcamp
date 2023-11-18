import { CircleDashed, FloppyDisk } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { CommonInput } from "../../components/CommonInput/CommonInput";
import { useForm } from "react-hook-form";
// import { addSector } from "../../functions/sectorManagement";
import { useNavigate } from "react-router-dom";
import { updatePlanta } from "../../functions/plantaManagement";
import { toast } from "react-toastify";
import { useEffect } from "react";

export const UpdPlanta = ({ planta }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    setValue("name", planta.name);
    setValue("id", planta.id);
  }, []);

  const handleUpdatePlanta = async (data) => {
    const request = await updatePlanta(data);
    if (request) {
      toast.success("Planta atualizada com sucesso", {
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

  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">Editar planta</h1>

      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(handleUpdatePlanta)}
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
          id="btn_updPlanta"
          name="btn_updPlanta"
          content="Atualizar planta"
        />
      </form>
    </div>
  );
};
