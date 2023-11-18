import { FloppyDisk } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { CommonInput } from "../../components/CommonInput/CommonInput";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { updateTipoExtintor } from "../../functions/tipoExtintorManagement";
import { toast } from "react-toastify";
import { useEffect } from "react";

export const UpdTipoExintor = ({ tipoExtintor }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    setValue("name", tipoExtintor.name);
    setValue("id", tipoExtintor.id);
  }, []);

  const handleUpdateTipoExtintor = async (data) => {
    const request = await updateTipoExtintor(data);
    if (request) {
      toast.success("Tipo de extintor atualizado com sucesso", {
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
      <h1 className="text-xl">Editar tipo de extintor</h1>

      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(handleUpdateTipoExtintor)}
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
          <label htmlFor="in_tipoExtintor">Tipo de Extintor</label>
          <CommonInput
            id="in_tipoExtintor"
            name="in_tipoExtintor"
            extra={{
              ...register("name", {
                required: "O tipo de extintor não pode ser vazio",
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
          id="btn_updTipoExtintor"
          name="btn_updTipoExtintor"
          content="Atualizar tipo de extintor"
        />
      </form>
    </div>
  );
};
