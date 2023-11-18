import { ClipboardText } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { useForm } from "react-hook-form";
import { CommonTextarea } from "../../components/CommonTextarea/CommonTextarea";
import { useEffect, useState } from "react";
import { addHistorico } from "../../functions/historicoManagement";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AddHistorico = ({ id }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [styleRadio, setStyleRadio] = useState("");

  useEffect(() => {
    setValue("id", id);
  }, []);

  const handleAddHistorico = async (data) => {
    const request = await addHistorico(data);
    if (request) {
      toast.success("Avaliação realizada com sucesso.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => navigate("/pesquisa"), 1000);
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

  const getRadioChange = (e) => {
    setStyleRadio(e.target.value);
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">Realizar avaliação</h1>

      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(handleAddHistorico)}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="in_matricula">Status</label>
          <div className="flex flex-col md:flex-row gap-2">
            <label
              className={`${
                styleRadio == "OK" ? "bg-green-500 text-white" : "bg-slate-400"
              } p-3 rounded-md shadow-sm w-full text-center`}
            >
              <input
                {...register("status", {
                  required: "É preciso escolher o status do extintor",
                })}
                type="radio"
                value="OK"
                onClick={(e) => getRadioChange(e)}
                className="hidden"
              />
              OK
            </label>
            <label
              className={`${
                styleRadio == "DIVERGENTE"
                  ? "bg-yellow-500 text-white"
                  : "bg-slate-400"
              } p-3 rounded-md shadow-sm w-full text-center`}
            >
              <input
                {...register("status", {
                  required: "É preciso escolher o status do extintor",
                })}
                type="radio"
                value="DIVERGENTE"
                onClick={(e) => getRadioChange(e)}
                className="hidden"
              />
              Divergência
            </label>
            <label
              className={`${
                styleRadio == "PROBLEMA"
                  ? "bg-red-500 text-white"
                  : "bg-slate-400"
              } p-3 rounded-md shadow-sm w-full text-center`}
            >
              <input
                {...register("status", {
                  required: "É preciso escolher o status do extintor",
                })}
                type="radio"
                value="PROBLEMA"
                onClick={(e) => getRadioChange(e)}
                className="hidden"
              />
              Problema
            </label>
          </div>
          {errors?.status?.message && (
            <p className="text-red-500 text-right text-sm">
              {errors.status?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="in_observacao">Observação</label>
          <CommonTextarea
            id="in_observacao"
            name="in_observacao"
            extra={{
              ...register("observacao", {
                required: "A observação não pode ser vazia",
              }),
            }}
            className={errors?.observacao?.message ? "border-red-500" : ""}
          />
          {errors?.observacao?.message && (
            <p className="text-red-500 text-right text-sm">
              {errors.observacao?.message}
            </p>
          )}
        </div>

        <CommonButton
          icon={<ClipboardText size={24} />}
          id="btn_AddHistorico"
          name="btn_AddHistorico"
          content="Realizar avaliação"
        />
      </form>
    </div>
  );
};
