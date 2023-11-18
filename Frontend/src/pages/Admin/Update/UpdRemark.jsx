import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CommonInput } from "../../../components/CommonInput/CommonInput";
import { CommonButton } from "../../../components/CommonButton/CommonButton";
import { FloppyDisk } from "@phosphor-icons/react";
import Select from "react-select";
import { updateRemark } from "../../../functions/remarkManagement";

export const UpdRemark = ({ remark, tasks }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const handleUpdateData = async (data) => {
    const request = await updateRemark(data);
    if (request) {
      setTimeout(() => navigate("/remark"), 1000);
    }
  };

  useEffect(() => {
    setValue("id", remark.id);
    setValue("name", remark.name);
    setValue("price", remark.price);
    setValue("taskId", remark.task.id);
  }, []);

  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">Update remark</h1>

      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(handleUpdateData)}
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
            {...register("taskId", {
              required: "You must specify a task",
            })}
            defaultValue={{ value: remark.task.id, label: remark.task.name }}
            onChange={(option) => setValue("taskId", option?.value || "")}
            options={tasks}
          />
          {errors?.taskId?.message && (
            <p className="text-red-500 text-right text-sm mt-2">
              {errors.taskId?.message}
            </p>
          )}
        </div>

        <CommonButton
          icon={<FloppyDisk size={24} />}
          id="btn_updateRemark"
          name="btn_updateRemark"
          content="Update Remark"
        />
      </form>
    </div>
  );
};
