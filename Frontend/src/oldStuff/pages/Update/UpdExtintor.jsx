import { FloppyDisk } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { CommonInput } from "../../components/CommonInput/CommonInput";
import { useEffect, useState } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { updateExtintor } from "../../functions/extintorManagement";

export const UpdExtintor = ({
  eixo,
  tipoSuporte,
  tipoExtintor,
  galpao,
  planta,
  local,
  extintor,
}) => {
  const [styleRadio, setStyleRadio] = useState();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const parseDate = (date) => {
    const dateParts = date.split("/");
    const dia = parseInt(dateParts[0], 10);
    const mes = parseInt(dateParts[1], 10) - 1; // Subtrair 1 do mês, pois em JavaScript os meses são indexados a partir de 0 (janeiro é 0)
    const ano = parseInt(dateParts[2], 10);
    return new Date(ano, mes, dia);
  };

  useEffect(() => {
    setValue("id", extintor.id);
    setValue("cilindro", extintor.cilindro);
    setValue("dataVencimento", parseDate(extintor.data_vencimento));
    setValue("dataVencimentoTH", parseDate(extintor.vencimento_th));
    setValue("placaSinalizacao", extintor.placa_sinalizacao == true ? 1 : 0);
    setStyleRadio(extintor.placa_sinalizacao == true ? 1 : 0);
    setValue("cargaNominal", extintor.carga_nominal);
    setValue("unidadeCarga", extintor.unidade_carga);
    setValue("eixo", extintor.eixo.id);
    setValue("tipoSuporte", extintor.tipo_suporte.id);
    setValue("galpao", extintor.galpao.id);
    setValue("planta", extintor.planta.id);
    setValue("tipoExtintor", transformToOptions(extintor.tipo_extintores));
    setValue("local", extintor.local.id);
  }, []);

  const handleUpdateExtintor = async (data) => {
    const request = await updateExtintor(data);
    if (request) {
      toast.success("Extintor atualizado com sucesso.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => navigate("/extintor"), 1000);
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
    setValue("placaSinalizacao", e.target.value);
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
        onSubmit={handleSubmit(handleUpdateExtintor)}
      >
        {/* Input revisado */}
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

        {/* Input revisado */}
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

        {/* Select revisado */}
        <div className="flex flex-col">
          <label htmlFor="in_tipoExtintor">Tipo do Extintor</label>
          <Controller
            name="tipoExtintor"
            control={control}
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
                defaultValue={transformToOptions(extintor.tipo_extintores)}
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

        {/* Input revisado */}
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

        {/* Select revisado */}
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
            defaultValue={{
              value: extintor.unidade_carga,
              label: extintor.unidade_carga,
            }}
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

        {/* Select revisado */}
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
            defaultValue={{
              value: extintor.eixo.id,
              label: extintor.eixo.name,
            }}
            onChange={(option) => setValue("eixo", option?.value || "")}
            options={transformToOptions(eixo)}
          />
          {errors?.eixo?.message && (
            <p className="text-red-500 text-right text-sm mt-2">
              {errors.eixo?.message}
            </p>
          )}
        </div>

        {/* Select revisado */}
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
            defaultValue={{
              value: extintor.tipo_suporte.id,
              label: extintor.tipo_suporte.name,
            }}
            onChange={(option) => setValue("tipoSuporte", option?.value || "")}
            options={transformToOptions(tipoSuporte)}
          />
          {errors?.tipoSuporte?.message && (
            <p className="text-red-500 text-right text-sm mt-2">
              {errors.tipoSuporte?.message}
            </p>
          )}
        </div>

        {/* Radio revisado */}
        <div className="flex flex-col">
          <label htmlFor="in_placaSinalizacao">Há placa de sinalização?</label>
          <div className="flex flex-col md:flex-row gap-2">
            <label
              className={`${
                styleRadio == 1 ? "bg-green-500 text-white" : "bg-slate-400"
              } p-3 rounded-md shadow-sm w-full text-center`}
            >
              <input
                {...register("placaSinalizacao")}
                type="radio"
                value={1}
                onClick={(e) => getRadioChange(e)}
                checked={styleRadio == 1}
                // className="hidden"
              />
              Sim
            </label>
            <label
              className={`${
                styleRadio == 0 ? "bg-yellow-500 text-white" : "bg-slate-400"
              } p-3 rounded-md shadow-sm w-full text-center`}
            >
              <input
                {...register("placaSinalizacao")}
                type="radio"
                value={0}
                onClick={(e) => getRadioChange(e)}
                checked={styleRadio == 0}
                // className="hidden"
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
        {/* Select revisado */}
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
            defaultValue={{
              value: extintor.galpao.id,
              label: extintor.galpao.name,
            }}
            onChange={(option) => setValue("galpao", option?.value || "")}
            options={transformToOptions(galpao)}
          />
          {errors?.galpao?.message && (
            <p className="text-red-500 text-right text-sm mt-2">
              {errors.galpao?.message}
            </p>
          )}
        </div>
        {/* Sekect revisado */}
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
            defaultValue={{
              value: extintor.planta.id,
              label: extintor.planta.name,
            }}
            onChange={(option) => setValue("planta", option?.value || "")}
            options={transformToOptions(planta)}
          />
          {errors?.planta?.message && (
            <p className="text-red-500 text-right text-sm mt-2">
              {errors.planta?.message}
            </p>
          )}
        </div>
        {/* Select revisado */}
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
            defaultValue={{
              value: extintor.local.id,
              label: extintor.local.name,
            }}
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
          id="btn_updExtintor"
          name="btn_updExtintor"
          icon={<FloppyDisk size={24} />}
          content="Atualizar extintor"
          className="mb-5"
        />
      </form>
    </div>
  );
};
