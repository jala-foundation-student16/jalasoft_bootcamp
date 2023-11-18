import { FloppyDisk } from "@phosphor-icons/react";
import { CommonButton } from "../../../components/CommonButton/CommonButton";
import { CommonInput } from "../../../components/CommonInput/CommonInput";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addTask } from "../../../functions/taskManagement";

export const AddTask = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleAddData = async (data) => {
    const request = await addTask(data);
    if (request) {
      setTimeout(() => navigate("/task"), 1000);
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">Add task</h1>

      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(handleAddData)}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="in_name">Task name</label>
          <CommonInput
            id="in_name"
            name="in_name"
            extra={{
              ...register("name", {
                required: "Task name cannot be empty.",
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
          <CommonInput
            type="checkbox"
            name="executeOnce"
            checkbox={true}
            content="Execute once?"
            className="w-6 h-6 p-4"
            value="true"
            extra={{
              ...register("executeOnce"),
            }}
          />
          {errors?.executeOnce?.message && (
            <p className="text-red-500 text-right text-sm">
              {errors.executeOnce?.message}
            </p>
          )}
        </div>

        <CommonButton
          icon={<FloppyDisk size={24} />}
          id="btn_addTask"
          name="btn_addTask"
          content="Add Task"
        />
      </form>
    </div>
  );
};
