import { FloppyDisk } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { CommonInput } from "../../components/CommonInput/CommonInput";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { updateCustomer } from "../../functions/customerManagement";
// Phone
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import "react-phone-number-input/style.css";

export const UpdCustomer = ({ customer }) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const validatePhoneNumber = (value) => {
    const phoneNumber = parsePhoneNumberFromString(value);
    if (!phoneNumber || !phoneNumber.isValid()) {
      return "Invalid phone number";
    }
    return true;
  };

  useEffect(() => {
    setValue("id", customer.id);
    setValue("ceo", customer.ceo);
    setValue("company_name", customer.company_name);
    setValue("company_phone", customer.company_phone);
    setValue("company_address", customer.company_address);
    setValue("company_email", customer.company_email);
    setValue("company_website", customer.company_website);
    setValue("website_login", customer.website_login);
    setValue("website_username", customer.website_username);
    setValue("website_password", customer.website_password);
    setValue("keywords", customer.keywords);
  }, []);

  const handleUpdate = async (data) => {
    const request = updateCustomer(data);
    if (request) {
      toast.success("Customer updated successfully.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => navigate("/customer"), 1000);
    } else {
      toast.error("Please, check the data you're trying to update.", {
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

  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">Update customer</h1>

      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(handleUpdate)}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="in_ceo">CEO Name</label>
          <CommonInput
            id="in_ceo"
            name="in_ceo"
            extra={{
              ...register("ceo", {
                required: "CEO cannot be empty.",
                maxLength: 50,
              }),
            }}
            className={errors?.ceo?.message ? "border-red-500" : ""}
          />
          {errors?.ceo?.message && (
            <p className="text-red-500 text-right text-sm">
              {errors.ceo?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="in_company_name">Company Name</label>
          <CommonInput
            id="in_company_name"
            name="in_company_name"
            extra={{
              ...register("company_name", {
                required: "Company name cannot be empty.",
                maxLength: 50,
              }),
            }}
            className={errors?.company_name?.message ? "border-red-500" : ""}
          />
          {errors?.company_name?.message && (
            <p className="text-red-500 text-right text-sm">
              {errors.company_name?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="company_phone">Company phone</label>
          <PhoneInputWithCountry
            name="company_phone"
            control={control}
            className="border rounded-md p-2 shadow-md"
            rules={{
              required: "Phone number cannot be empty.",
              validate: validatePhoneNumber,
            }}
          />
          {errors?.company_phone?.message && (
            <p className="text-red-500 text-right text-sm">
              {errors.company_phone?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="in_company_address">Company Address</label>
          <CommonInput
            id="in_company_address"
            name="in_company_address"
            extra={{
              ...register("company_address", {
                required: "Company address cannot be empty.",
                maxLength: 100,
              }),
            }}
            className={errors?.company_address?.message ? "border-red-500" : ""}
          />
          {errors?.company_address?.message && (
            <p className="text-red-500 text-right text-sm">
              {errors.company_address?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="in_company_email">Company email</label>
          <CommonInput
            id="in_company_email"
            name="in_company_email"
            type="company_email"
            extra={{
              ...register("company_email", {
                required: "E-mail cannot be empty.",
                maxLength: 100,
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                  message: "Insert a valid email address",
                },
              }),
            }}
            className={errors?.company_email?.message ? "border-red-500" : ""}
          />
          {errors?.company_email?.message && (
            <p className="text-red-500 text-right text-sm">
              {errors.company_email?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="in_company_website">Company website</label>
          <CommonInput
            id="in_company_website"
            name="in_company_website"
            extra={{
              ...register("company_website", {
                required: "Website cannot be empty.",
                maxLength: 150,
              }),
            }}
            className={errors?.company_website?.message ? "border-red-500" : ""}
          />
          {errors?.company_website?.message && (
            <p className="text-red-500 text-right text-sm">
              {errors.company_website?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="in_website_login">Website login</label>
          <CommonInput
            id="in_website_login"
            name="in_website_login"
            extra={{
              ...register("website_login", {
                required: "Website login cannot be empty.",
                maxLength: 100,
              }),
            }}
            className={errors?.website_login?.message ? "border-red-500" : ""}
          />
          {errors?.website_login?.message && (
            <p className="text-red-500 text-right text-sm">
              {errors.website_login?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="in_website_username">Website username</label>
          <CommonInput
            id="in_website_username"
            name="in_website_username"
            extra={{
              ...register("website_username", {
                required: "Website username cannot be empty.",
                maxLength: 60,
              }),
            }}
            className={
              errors?.website_username?.message ? "border-red-500" : ""
            }
          />
          {errors?.website_username?.message && (
            <p className="text-red-500 text-right text-sm">
              {errors.website_username?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="in_website_password">Password</label>
          <CommonInput
            id="in_website_password"
            name="in_website_password"
            type="website_password"
            extra={{
              ...register("website_password", {
                required: "Password cannot be empty.",
              }),
            }}
            className={
              errors?.website_password?.message ? "border-red-500" : ""
            }
          />
          {errors?.website_password?.message && (
            <p className="text-red-500 text-right text-sm">
              {errors.website_password?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="in_keywords">Keywords</label>
          <CommonInput
            id="in_keywords"
            name="in_keywords"
            extra={{
              ...register("keywords", {
                required: "Keywords cannot be empty.",
              }),
            }}
            className={errors?.keywords?.message ? "border-red-500" : ""}
          />
          {errors?.keywords?.message && (
            <p className="text-red-500 text-right text-sm">
              {errors.keywords?.message}
            </p>
          )}
        </div>

        <CommonButton
          icon={<FloppyDisk size={24} />}
          id="btn_updCustomer"
          name="btn_updCustomer"
          content="Update customer"
        />
      </form>
    </div>
  );
};
