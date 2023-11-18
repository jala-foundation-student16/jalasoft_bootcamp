import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { updateTask } from "../../../functions/taskManagement";
import { useNavigate } from "react-router-dom";
import { CommonInput } from "../../../components/CommonInput/CommonInput";
import { CommonButton } from "../../../components/CommonButton/CommonButton";
import { FloppyDisk } from "@phosphor-icons/react";

export const UpdTask = ({task}) =>{
    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm();
      const navigate = useNavigate();

    const handleUpdateData = async (data) => {
      const request = await updateTask(data);
      if (request) {
        setTimeout(() => navigate("/task"), 1000);
      }
    };

    useEffect(()=>{
        setValue("id", task.id);
        setValue("name", task.name);
        setValue("executeOnce", task.executeOnce ? true : false);
    }, [])

    return (
      <div className="flex flex-col gap-5 w-full">
        <h1 className="text-xl">Update task</h1>

        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit(handleUpdateData)}
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
            id="btn_updateTask"
            name="btn_updateTask"
            content="Update Task"
          />
        </form>
      </div>
    );
}