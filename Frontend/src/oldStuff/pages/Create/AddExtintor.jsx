import { FloppyDisk } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { CommonInput } from "../../components/CommonInput/CommonInput";
import { useRef, useState } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { addExtintor } from "../../functions/extintorManagement";

export const AddExtintor = ({
  eixo,
  tipoSuporte,
  tipoExtintor,
  galpao,
  planta,
  local,
}) => {
  const [styleRadio, setStyleRadio] = useState(2);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const handleAddExtintor = async (data) => {
    const request = await addExtintor(data)
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

  const getRadioChange = (e) => {
    setStyleRadio(e.target.value);
  };

  function transformToOptions(data) {
    const newData = data.map((d) => {
      return { value: d.id, label: d.name };
    });
    return newData;
  }

  return (
    <div className="flex flex-col flex-1 gap-5 w-full">
      <h1 className="text-xl">Cadastro de novo extintor</h1>

      <h2 className="font-bold">Dados do extintor</h2>

      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(handleAddExtintor)}
      >
        <div className="flex flex-col">
          <label htmlFor="in_cilindro">Cilindro do extintor</label>
          <CommonInput
            id="in_cilindro"
            name="in_cilindro"
            extra={{
              ...register("cilindro", {
                required: "O extintor deve possuir um número de série",
              }),
            }}
          />
          {errors?.cilindro?.message && (
            <p className="text-red-500 text-right text-sm mt-2">
              {errors.cilindro?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="in_tipoExtintor">Tipo do Extintor</label>
          <Controller
            name="tipoExtintor"
            control={control}
            defaultValue={[]}
            rules={{
              validate: (value) =>
                value.length > 0 || "Selecione pelo menos uma opção",
            }}
            render={({ field }) => (
              <Select
                className="basic-single shadow-md"
                classNamePrefix="select"
                isMulti={true}
                isSearchable={true}
                name="in_tipoExtintor"
                onChange={field.onChange}
                options={transformToOptions(tipoExtintor)}
              />
            )}
          />
          {errors?.tipoExtintor?.message && (
            <p className="text-red-500 text-right text-sm mt-2">
              {errors.tipoExtintor?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="in_eixo">Carga Nominal</label>
          <CommonInput
            id="in_cargaNominal"
            name="in_cargaNominal"
            type="number"
            extra={{
              ...register("cargaNominal", {
                required: "A carga nominal não pode ficar em branco",
              }),
            }}
          />
          {errors?.cargaNominal?.message && (
            <p className="text-red-500 text-right text-sm mt-2">
              {errors.cargaNominal?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="in_unidadeCargaNominal">
            Unidade da carga nominal
          </label>
          <Select
            className="basic-single shadow-md"
            classNamePrefix="select"
            isMulti={false}
            isSearchable={true}
            name="in_unidadeCarga"
            {...register("unidadeCarga", {
              required: "É obrigatório a escolha do tipo de unidade",
            })}
            onChange={(option) => setValue("unidadeCarga", option?.value || "")}
            options={[
              { value: "QUILOS", label: "Quilos" },
              { value: "LITROS", label: "Litros" },
            ]}
          />
          {errors?.unidadeCarga?.message && (
            <p className="text-red-500 text-right text-sm mt-2">
              {errors.unidadeCarga?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="in_eixo">Eixo</label>
          <Select
            className="basic-single shadow-md"
            classNamePrefix="select"
            isSearchable={true}
            isMulti={false}
            name="in_eixo"
            {...register("eixo", {
              required: "É obrigatório a escolha do eixo",
            })}
            onChange={(option) => setValue("eixo", option?.value || "")}
            options={transformToOptions(eixo)}
          />
          {errors?.eixo?.message && (
            <p className="text-red-500 text-right text-sm mt-2">
              {errors.eixo?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="in_tipoSuporte">Tipo do suporte</label>
          <Select
            className="basic-single shadow-md"
            classNamePrefix="select"
            isSearchable={true}
            isMulti={false}
            name="in_tipoSuporte"
            {...register("tipoSuporte", {
              required: "É obrigatório a escolha do tipo de suporte",
            })}
            onChange={(option) => setValue("tipoSuporte", option?.value || "")}
            options={transformToOptions(tipoSuporte)}
          />
          {errors?.tipoSuporte?.message && (
            <p className="text-red-500 text-right text-sm mt-2">
              {errors.tipoSuporte?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="in_placaSinalizacao">Há placa de sinalização?</label>
          <div className="flex flex-col md:flex-row gap-2">
            <label
              className={`${
                styleRadio == 1 ? "bg-green-500 text-white" : "bg-slate-400"
              } p-3 rounded-md shadow-sm w-full text-center`}
            >
              <input
                {...register("placaSinalizacao", {
                  required: "É preciso informar se há placa no local",
                })}
                type="radio"
                value={1}
                onClick={(e) => getRadioChange(e)}
                className="hidden"
              />
              Sim
            </label>
            <label
              className={`${
                styleRadio == 0 ? "bg-yellow-500 text-white" : "bg-slate-400"
              } p-3 rounded-md shadow-sm w-full text-center`}
            >
              <input
                {...register("placaSinalizacao", {
                  required: "É preciso informar se há placa no local",
                })}
                type="radio"
                value={0}
                onClick={(e) => getRadioChange(e)}
                className="hidden"
              />
              Não
            </label>
          </div>
          {errors?.placaSinalizacao?.message && (
            <p className="text-red-500 text-right text-sm mt-2">
              {errors.placaSinalizacao?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="in_dataVencimento">
            Data de vencimento do agente
          </label>
          <Controller
            name="dataVencimento"
            control={control}
            defaultValue={null}
            rules={{ required: "É preciso preencher a validade do agente" }}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                placeholderText="Selecione uma data"
                className="border rounded-md p-2 shadow-md w-full"
              />
            )}
          />

          {errors?.dataVencimento?.message && (
            <p className="text-red-500 text-right text-sm mt-2">
              {errors.dataVencimento?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="in_dataVencimentoTesteHidroestatico">
            Data de vencimento do teste hidroestático
          </label>
          <Controller
            name="dataVencimentoTH"
            control={control}
            defaultValue={null}
            rules={{ required: "Este campo é obrigatório" }}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                placeholderText="Selecione uma data"
                className="border rounded-md p-2 shadow-md w-full"
              />
            )}
          />
          {errors?.dataVencimentoTH?.message && (
            <p className="text-red-500 text-right text-sm mt-2">
              {errors.dataVencimentoTH?.message}
            </p>
          )}
        </div>

        <h2 className="font-bold">Dados do local do extintor</h2>

        <div className="flex flex-col">
          <label htmlFor="in_galpao">Galpão</label>
          <Select
            className="basic-single shadow-md"
            classNamePrefix="select"
            isMulti={false}
            isSearchable={true}
            name="in_galpao"
            {...register("galpao", {
              required: "É obrigatório a escolha do galpão",
            })}
            onChange={(option) => setValue("galpao", option?.value || "")}
            options={transformToOptions(galpao)}
          />
          {errors?.galpao?.message && (
            <p className="text-red-500 text-right text-sm mt-2">
              {errors.galpao?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="in_planta">Planta</label>
          <Select
            className="basic-single shadow-md"
            classNamePrefix="select"
            isMulti={false}
            isSearchable={true}
            name="in_planta"
            {...register("planta", {
              required: "É obrigatório a escolha da planta",
            })}
            onChange={(option) => setValue("planta", option?.value || "")}
            options={transformToOptions(planta)}
          />
          {errors?.planta?.message && (
            <p className="text-red-500 text-right text-sm mt-2">
              {errors.planta?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="in_local">Local</label>
          <Select
            className="basic-single shadow-md"
            classNamePrefix="select"
            isMulti={false}
            isSearchable={true}
            name="in_local"
            {...register("local", {
              required: "É obrigatório a escolha da planta",
            })}
            onChange={(option) => setValue("local", option?.value || "")}
            options={transformToOptions(local)}
          />
          {errors?.local?.message && (
            <p className="text-red-500 text-right text-sm mt-2">
              {errors.local?.message}
            </p>
          )}
        </div>

        <CommonButton
          id="btn_addExtintor"
          name="btn_addExtintor"
          icon={<FloppyDisk size={24} />}
          content="Adicionar extintor"
          className="mb-8"
        />
      </form>
    </div>
  );
};
