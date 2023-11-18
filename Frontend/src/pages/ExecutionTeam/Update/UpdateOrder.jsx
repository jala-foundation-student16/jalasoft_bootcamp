import { useNavigate } from "react-router-dom";
import { deleteTask } from "../../../functions/taskManagement";
import { useForm } from "react-hook-form";
import { CommonInput } from "../../../components/CommonInput/CommonInput";

export const ViewOrder = ({ order }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  async function handleRemove(id) {
    const request = await deleteTask(id);
    if (request) {
      setTimeout(() => navigate("/task"), 1000);
    }
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">Order #{order.id}</h1>

      <p>Client {order.order.customer.company_name}</p>
      <p>Task: {order.schedule.remark.task.name}</p>
      <p>Remark: {order.schedule.remark.name}</p>

      <form action="">
        <div className="flex flex-col gap-2">
          <label htmlFor="in_daysToNextExecution">Days to next execution</label>
          <CommonInput
            type="number"
            name="in_daysToNextExecution"
            extra={{
              ...register("daysToNextTask", {
                required: "The day cannot be empty",
                valueAsNumber: "This field just accept numbers",
              }),
            }}
            onChange={()=>{}}
          />
          {errors?.daysToNextTask?.message && (
            <p className="text-red-500 text-right text-sm">
              {errors.daysToNextTask?.message}
            </p>
          )}
        </div>

        <p>Next Execution: {order.schedule.remark.name}</p>
      </form>
    </div>
  );
};
