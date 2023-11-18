import { FloppyDisk } from "@phosphor-icons/react";
import { CommonButton } from "../../../components/CommonButton/CommonButton";
import { CommonInput } from "../../../components/CommonInput/CommonInput";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addRemark } from "../../../functions/remarkManagement";
import Select from "react-select";

export const AddRemark = ({tasks}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleAddData = async (data) => {
    const request = await addRemark(data);
    if (request) {
      setTimeout(() => navigate("/remark"), 1000);
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">Add remark</h1>

      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(handleAddData)}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="in_name">Remark name</label>
          <CommonInput
            id="in_name"
            name="in_name"
            
            extra={{
              ...register("name", {
                required: "Remark name cannot be empty.",
                maxLength: 50,
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

        <div className="flex flex-col gap-2">
          <label htmlFor="in_price">Price</label>
          <CommonInput
            type="number"
            name="in_price"
            extra={{
              ...register("price", {
                required: "The price cannot be empty",
                valueAsNumber: "This field just accept numbers",
              }),
            }}
          />
          {errors?.price?.message && (
            <p className="text-red-500 text-right text-sm">
              {errors.price?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="in_task">Task related</label>
          <Select
            className="basic-single shadow-md"
            classNamePrefix="select"
            isMulti={false}
            isSearchable={false}
            name="in_task"
            {...register("task", {
              required: "You must specify a task",
            })}
            onChange={(option) => setValue("task", option?.value || "")}
            options={tasks}
          />
          {errors?.task?.message && (
            <p className="text-red-500 text-right text-sm mt-2">
              {errors.task?.message}
            </p>
          )}
        </div>

        <CommonButton
          icon={<FloppyDisk size={24} />}
          id="btn_addRemark"
          name="btn_addRemark"
          content="Add Remark"
        />
      </form>
    </div>
  );
};
