// import { Camera, FireExtinguisher, Siren } from "@phosphor-icons/react";
// import { CommonButton } from "../../components/CommonButton/CommonButton";
// import { CommonInput } from "../../components/CommonInput/CommonInput";
// import { CommonTextarea } from "../../components/CommonTextarea/CommonTextarea";
// import Webcam from "react-webcam";
// import { useContext, useEffect, useRef, useState } from "react";
// import Select from "react-select";
// import { useForm, Controller } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { toast } from "react-toastify";
// import { AuthenticationContext } from "../../provider/AuthenticationProvider";

// export const UpdExtintor = ({ data }) => {
//   const [takePicture, setTakePicture] = useState(false);
//   const [picture, setPicture] = useState(null);
//   const { userData } = useContext(AuthenticationContext);
//   const webcamRef = useRef(null);

//   const {
//     register,
//     handleSubmit,
//     control,
//     setValue,
//     formState: { errors },
//   } = useForm();
//   const navigate = useNavigate();

//   function transformToOptions(data) {
//     const newData = data.map((d) => {
//       return { value: d.id, label: d.name };
//     });
//     return newData;
//   }


//   const handleAddTicket = async (data) => {
//     try {
//       if (picture) {
//         const imageData = await uploadPicture(picture);

//         if (imageData) {
//           const userId = userData.id;
//           if (addTicket(data, imageData.url, userId)) {
//             setTimeout(() => navigate("/home"), 1000);
//           }
//         }
//       } else {
//         if (addTicket(data, null, 1)) {
//           setTimeout(() => navigate("/home"), 1000);
//         }
//       }
//     } catch (e) {
//       toast.error("Valide os dados inseridos.", {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//     }
//   };

//   return (
//     <div className="flex flex-col flex-1 gap-5 w-full">
//       <h1 className="text-xl">Edição do extintor</h1>

//       <h2 className="font-bold">Dados do extintor</h2>

//       <h2 className="font-bold">Dados do extintor</h2>

//       <form
//         className="flex flex-col gap-8"
//         onSubmit={handleSubmit(handleAddTicket)}
//       >
//         <div className="flex flex-col">
//           <label htmlFor="in_cilindro">Chassi do extintor</label>
//           <CommonInput
//             id="in_cilindro"
//             name="in_cilindro"
//             extra={{
//               ...register("cilindro", {
//                 required: "O extintor deve possuir um número de série",
//               }),
//             }}
//           />
//           {errors?.cilindro?.message && (
//             <p className="text-red-500 text-right text-sm">
//               {errors.cilindro?.message}
//             </p>
//           )}
//         </div>

//         <div className="flex flex-col">
//           <label htmlFor="in_dataVencimento">Data de vencimento</label>
//           <Controller
//             control={control}
//             rules={{ required: "Esse campo é obrigatório" }}
//             name="in_dataVencimento"
//             render={({ field }) => (
//               <DatePicker
//                 {...field}
//                 selected={field.value}
//                 onChange={(date) => field.onChange(date)}
//                 dateFormat="dd/MM/yyyy"
//                 placeholderText="Selecione uma data"
//                 className="border rounded-md p-2 shadow-md w-full"
//               />
//             )}
//           />
//         </div>

//         <div className="flex flex-col">
//           <label htmlFor="in_dataVencimentoTesteHidroestatico">
//             Data de vencimento do teste hidroestático
//           </label>
//           <Controller
//             control={control}
//             name="in_dataVencimentoTesteHidroestatico"
//             render={({ field }) => (
//               <DatePicker
//                 {...field}
//                 selected={field.value}
//                 onChange={(date) => field.onChange(date)}
//                 dateFormat="dd/MM/yyyy"
//                 placeholderText="Selecione uma data"
//                 className="border rounded-md p-2 shadow-md w-full"
//               />
//             )}
//           />
//         </div>

//         <div className="flex flex-col">
//           <label htmlFor="in_eixo">Carga Nominal</label>
//           <CommonInput
//             id="in_cargaNominal"
//             name="in_cargaNominal"
//             type="number"
//             extra={{
//               ...register("cargaNominal", {
//                 required: "A carga nominal não pode ficar em branco",
//               }),
//             }}
//           />
//           {/* <Select
//             className="basic-single shadow-md"
//             classNamePrefix="select"
//             isSearchable={true}
//             name="in_eixo"
//             {...register("eixo", {
//               required: "É obrigatório a escolha do eixo",
//             })}
//             onChange={(option) => setValue("eixo", option?.value || "")}
//             options={transformToOptions(data.carga)}
//           /> */}
//           {errors?.cargaNominal?.message && (
//             <p className="text-red-500 text-right text-sm">
//               {errors.cargaNominal?.message}
//             </p>
//           )}
//         </div>

//         <div className="flex flex-col">
//           <label htmlFor="in_unidadeCargaNominal">
//             Unidade de carga nominal
//           </label>
//           <EnumUnidadeCarga />
//         </div>

//         <div className="flex flex-col">
//           <label htmlFor="ticketTitle">Placa de Sinalização</label>
//           <Select
//             className="basic-single shadow-md"
//             classNamePrefix="select"
//             isSearchable={true}
//             name="in_placaSinalizacao"
//             {...register("placaSinalizacao", {
//               required: "É obrigatório dizer se há ou não placa de sinalização",
//             })}
//             onChange={(option) =>
//               setValue("placaSinalizacao", option?.value || "")
//             }
//             options={transformToOptions([
//               { id: 1, name: "Sim" },
//               { id: 2, name: "Não" },
//             ])}
//           />
//           {errors?.placaSinalizacao?.message && (
//             <p className="text-red-500 text-right text-sm">
//               {errors.placaSinalizacao?.message}
//             </p>
//           )}
//         </div>

//         <div className="flex flex-col">
//           <label htmlFor="in_eixo">Eixo</label>
//           <Select
//             className="basic-single shadow-md"
//             classNamePrefix="select"
//             isSearchable={true}
//             name="in_eixo"
//             {...register("eixo", {
//               required: "É obrigatório a escolha do eixo",
//             })}
//             onChange={(option) => setValue("eixo", option?.value || "")}
//             options={transformToOptions(data.eixo)}
//           />
//           {errors?.eixo?.message && (
//             <p className="text-red-500 text-right text-sm">
//               {errors.eixo?.message}
//             </p>
//           )}
//         </div>

//         <div className="flex flex-col">
//           <label htmlFor="in_tipoSuporte">Tipo do suporte</label>
//           <Select
//             className="basic-single shadow-md"
//             classNamePrefix="select"
//             isSearchable={true}
//             name="in_tipoSuporte"
//             {...register("tipoSuporte", {
//               required: "É obrigatório a escolha do tipo de suporte",
//             })}
//             onChange={(option) => setValue("tipoSuporte", option?.value || "")}
//             options={transformToOptions(data.tipoSuporte)}
//           />
//           {errors?.tipoSuporte?.message && (
//             <p className="text-red-500 text-right text-sm">
//               {errors.tipoSuporte?.message}
//             </p>
//           )}
//         </div>

//         <div className="flex flex-col">
//           <label htmlFor="in_tipoExtintor">Tipo do Extintor</label>
//           <Select
//             className="basic-single shadow-md"
//             classNamePrefix="select"
//             isMulti={true}
//             isSearchable={true}
//             name="in_tipoExtintor"
//             {...register("tipoExtintor", {
//               required: "É obrigatório a escolha do tipo de extintor",
//             })}
//             onChange={(option) => setValue("tipoExtintor", option?.value || "")}
//             options={transformToOptions(data.tipoExtintor)}
//           />
//           {errors?.tipoExtintor?.message && (
//             <p className="text-red-500 text-right text-sm">
//               {errors.tipoExtintor?.message}
//             </p>
//           )}
//         </div>

//         <div className="flex flex-col">
//           <label htmlFor="in_galpao">Galpão</label>
//           <Select
//             className="basic-single shadow-md"
//             classNamePrefix="select"
//             isMulti={true}
//             isSearchable={true}
//             name="in_galpao"
//             {...register("gapao", {
//               required: "É obrigatório a escolha do galpão",
//             })}
//             onChange={(option) => setValue("gapao", option?.value || "")}
//             options={transformToOptions(data.gapao)}
//           />
//           {errors?.gapao?.message && (
//             <p className="text-red-500 text-right text-sm">
//               {errors.gapao?.message}
//             </p>
//           )}
//         </div>

//         <div className="flex flex-col">
//           <label htmlFor="in_planta">Planta</label>
//           <Select
//             className="basic-single shadow-md"
//             classNamePrefix="select"
//             isMulti={true}
//             isSearchable={true}
//             name="in_planta"
//             {...register("planta", {
//               required: "É obrigatório a escolha da planta",
//             })}
//             onChange={(option) => setValue("planta", option?.value || "")}
//             options={transformToOptions(data.planta)}
//           />
//           {errors?.planta?.message && (
//             <p className="text-red-500 text-right text-sm">
//               {errors.planta?.message}
//             </p>
//           )}
//         </div>

//         <div className="flex flex-col">
//           <label htmlFor="in_local">Local</label>
//           <Select
//             className="basic-single shadow-md"
//             classNamePrefix="select"
//             isMulti={true}
//             isSearchable={true}
//             name="in_local"
//             {...register("local", {
//               required: "É obrigatório a escolha da planta",
//             })}
//             onChange={(option) => setValue("local", option?.value || "")}
//             options={transformToOptions(data.local)}
//           />
//           {errors?.local?.message && (
//             <p className="text-red-500 text-right text-sm">
//               {errors.local?.message}
//             </p>
//           )}
//         </div>

//         <CommonButton
//           id="btn_updExtintor"
//           name="btn_updExtintor"
//           icon={<FireExtinguisher size={24} />}
//           content="Atualizar extintor"
//           className="mb-8"
//         />
//       </form>
//     </div>
//   );
// };
