import { FloppyDisk } from "@phosphor-icons/react";
import { CommonButton } from "../../../components/CommonButton/CommonButton";
import { CommonInput } from "../../../components/CommonInput/CommonInput";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { updateCustomerPlan } from "../../../functions/customerPlanManagement";
import { useEffect } from "react";

export const UpdCustomerPlan = ({customerPlan}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleAddData = async (data) => {
    const request = await updateCustomerPlan(data);
    if (request) {
      setTimeout(() => navigate("/customer_plan"), 1000);
    }
  };

  useEffect(()=>{
    setValue("id", customerPlan.id);
    setValue("minimumValue", customerPlan.minimumValue);
    setValue("maximumValue", customerPlan.maximumValue);
    setValue("name", customerPlan.name)
  }, [])

  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">Update plan</h1>

      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(handleAddData)}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="in_name">Plan name</label>
          <CommonInput
            id="in_name"
            name="in_name"
            extra={{
              ...register("name", {
                required: "Plan name cannot be empty.",
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
          <label htmlFor="minimum_value">Minimum budget</label>
          <CommonInput
            type="number"
            name="minimum_value"
            extra={{
              ...register("minimumValue", {
                required: "The minimum budget cannot be empty",
                valueAsNumber: "This field just accept numbers",
              }),
            }}
          />
          {errors?.minimumValue?.message && (
            <p className="text-red-500 text-right text-sm">
              {errors.minimumValue?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="maximum_value">Maximum budget</label>
          <CommonInput
            type="number"
            name="maximum_value"
            extra={{
              ...register("maximumValue", {
                required: "The maximum budget cannot be empty",
                valueAsNumber: "This field just accept numbers",
              }),
            }}
          />
          {errors?.maximumValue?.message && (
            <p className="text-red-500 text-right text-sm">
              {errors.maximumValue?.message}
            </p>
          )}
        </div>

        <CommonButton
          icon={<FloppyDisk size={24} />}
          id="btn_updCustomerPlan"
          name="btn_updCustomerPlan"
          content="Update Customer Plan"
        />
      </form>
    </div>
  );
};
