import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CommonInput } from "../../../components/CommonInput/CommonInput";
import { CommonButton } from "../../../components/CommonButton/CommonButton";
import { MagnifyingGlass } from "@phosphor-icons/react";

export const SearchExtintor = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleSearchExtintor = async (data) => {
    navigate(`/extintor/${data.chassi}`);
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">Ler código de barras</h1>

      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(handleSearchExtintor)}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="in_chassi">Chassi do extintor</label>
          <CommonInput
            id="in_chassi"
            name="in_chassi"
            extra={{
              ...register("chassi", {
                required: "O chassi não pode ser vazio",
              }),
            }}
            className={errors?.chassi?.message ? "border-red-500" : ""}
          />
          {errors?.chassi?.message && (
            <p className="text-red-500 text-right text-sm">
              {errors.chassi?.message}
            </p>
          )}
        </div>

        <CommonButton
          icon={<MagnifyingGlass size={24} />}
          id="btn_searchChassi"
          name="btn_searchChassi"
          content="Buscar por chassi"
        />
      </form>
    </div>
  );
};
