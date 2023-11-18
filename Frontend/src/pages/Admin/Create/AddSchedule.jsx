import { FloppyDisk } from "@phosphor-icons/react";
import { CommonButton } from "../../../components/CommonButton/CommonButton";
import { CommonInput } from "../../../components/CommonInput/CommonInput";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { useState } from "react";
import { addSchedule } from "../../../functions/scheduleManagement";

export const AddSchedule = ({ tasks, remarks, transformToOptions, customerPlan }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [listRemarkTask, setListRemarkTask] = useState([]);

  const navigate = useNavigate();

  const handleAddData = async (data) => {
    const request = await addSchedule(data);
    if (request) {
      setTimeout(() => navigate("/schedule"), 1000);
    }
  };

  const handleTaskChange = (id) => {
    setValue("remark", null);
    setListRemarkTask(
      transformToOptions(remarks.filter((d) => d.task.id === id))
    );
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">Add schedule</h1>

      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(handleAddData)}
      >
        <div className="flex flex-col">
          <label htmlFor="in_customerPlan">Customer Plan</label>
          <Select
            className="basic-single shadow-md"
            classNamePrefix="select"
            isMulti={false}
            isSearchable={false}
            name="in_customerPlan"
            {...register("customerPlanId")}
            onChange={(option) => {
              handleTaskChange(option?.value);
              setValue("customerPlanId", option?.value || "");
            }}
            options={customerPlan}
          />
          {errors?.customerPlanId?.message && (
            <p className="text-red-500 text-right text-sm mt-2">
              {errors.customerPlanId?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="in_task">Task</label>
          <Select
            className="basic-single shadow-md"
            classNamePrefix="select"
            isMulti={false}
            isSearchable={false}
            name="in_task"
            {...register("taskId", {
              required: "You must specify a task",
            })}
            onChange={(option) => {
              handleTaskChange(option?.value);
              setValue("taskId", option?.value || "");
            }}
            options={tasks}
          />
          {errors?.taskId?.message && (
            <p className="text-red-500 text-right text-sm mt-2">
              {errors.taskId?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="in_remark">Remark</label>
          <Select
            className="basic-single shadow-md"
            classNamePrefix="select"
            id="select-remark"
            isMulti={false}
            isSearchable={false}
            name="in_remark"
            {...register("remarkId", {
              required:
                "The remark is invalid, it is empty or not related to the task",
            })}
            onChange={(option) => setValue("remarkId", option?.value || "")}
            options={listRemarkTask}
          />
          {errors?.remarkId?.message && (
            <p className="text-red-500 text-right text-sm mt-2">
              {errors.remarkId?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="in_startsAfter">Starts After</label>
          <CommonInput
            type="number"
            name="in_startsAfter"
            value={0}
            extra={{
              ...register("startsAfter", {
                required: "The start date cannot be empty",
                valueAsNumber: "This field just accept numbers",
              }),
            }}
          />
          {errors?.startsAfter?.message && (
            <p className="text-red-500 text-right text-sm">
              {errors.startsAfter?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="in_daysToNextTask">Days to next execution</label>
          <CommonInput
            type="number"
            name="in_daysToNextTask"
            extra={{
              ...register("daysToNextTask", {
                required:
                  "The days to next execution cannot be empty but can be 0",
                valueAsNumber: "This field just accept numbers",
              }),
            }}
          />
          {errors?.daysToNextTask?.message && (
            <p className="text-red-500 text-right text-sm">
              {errors.daysToNextTask?.message}
            </p>
          )}
        </div>

        <CommonButton
          icon={<FloppyDisk size={24} />}
          id="btn_addSchedule"
          name="btn_addSchedule"
          content="Add Schedule"
        />
      </form>
    </div>
  );
};
