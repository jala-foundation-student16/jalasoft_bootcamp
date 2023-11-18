import { useForm } from "react-hook-form";
import { CommonButton } from "../CommonButton/CommonButton";
import { CommonInput } from "../CommonInput/CommonInput";
import { registerAgency } from "../../functions/auth";
import { Link, useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../provider/AuthenticationProvider";
import { useContext, useEffect } from "react";
import Select from "react-select";
// Phone
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import "react-phone-number-input/style.css";
// Validator
import validator from "validator";
export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const { isAuthenticated } = useContext(
    AuthenticationContext
  );

  const navigate = useNavigate();

  async function registerUser(data) {
    const response = await registerAgency(data);
    if (response) {
      navigate("/");
      return;
    }
  }

  const validatePasswordRule = (value) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      return true;
    } else {
      return "Your password must have lower and upper case letters, symbols and numbers";
    }
  };

  const validatePhoneNumber = (value) => {
    const phoneNumber = parsePhoneNumberFromString(value);
    if (!phoneNumber || !phoneNumber.isValid()) {
      return "Invalid phone number";
    }
    return true;
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated]);

  return (
    <div className="flex flex-1 columns-2 gap-8">
      <div className="hidden lg:flex h-auto flex-col flex-1 justify-center items-center bg-[url('https://images.unsplash.com/photo-1513682121497-80211f36a7d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2488&q=80')] bg-cover h-screen"></div>
      <div className="flex flex-col flex-1 justify-center items-center py-10 m-auto">
        <h1 className="text-xl font-bold mb-4">Creating Account</h1>
        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit(registerUser)}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="in_fullname">Your full name</label>
            <CommonInput
              id="in_fullname"
              name="in_fullname"
              extra={{
                ...register("fullName", {
                  required: "Name cannot be empty.",
                  maxLength: 30,
                }),
              }}
              className={
                errors?.fullName?.message ? "border-red-500 w-72" : "w-72"
              }
            />
            {errors?.fullName?.message && (
              <p className="text-red-500 text-right text-sm">
                {errors.fullName?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="in_email">Email</label>
            <CommonInput
              id="in_email"
              name="in_email"
              type="email"
              extra={{
                ...register("email", {
                  required: "Email cannot be empty.",
                  maxLength: 150,
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                    message: "Insert a valid email address",
                  },
                }),
              }}
              className={errors?.email?.message ? "border-red-500" : ""}
            />
            {errors?.email?.message && (
              <p className="text-red-500 text-right text-sm">
                {errors.email?.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="in_agency_name">Agency name</label>
            <CommonInput
              id="in_agency_name"
              name="in_agency_name"
              extra={{
                ...register("agencyName", {
                  required: "Name cannot be empty.",
                  maxLength: 30,
                }),
              }}
              className={errors?.agencyName?.message ? "border-red-500" : ""}
            />
            {errors?.agencyName?.message && (
              <p className="text-red-500 text-right text-sm">
                {errors.agencyName?.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="in_agency_email">Agency email</label>
            <CommonInput
              id="in_agency_email"
              name="in_agency_email"
              extra={{
                ...register("agencyEmail", {
                  required: "Email cannot be empty.",
                  maxLength: 150,
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                    message: "Insert a valid email address",
                  },
                }),
              }}
              className={errors?.agencyEmail?.message ? "border-red-500" : ""}
            />
            {errors?.agencyEmail?.message && (
              <p className="text-red-500 text-right text-sm">
                {errors.agencyEmail?.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="agencyCompany_phone">Agency phone</label>
            <PhoneInputWithCountry
              name="agencyCompany_phone"
              control={control}
              className="border rounded-md p-2 shadow-md"
              rules={{
                required: "Phone number cannot be empty.",
                validate: validatePhoneNumber,
              }}
            />
            {errors?.agencyCompany_phone?.message && (
              <p className="text-red-500 text-right text-sm">
                {errors.agencyCompany_phone?.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="in_agency_website">Agency website</label>
            <CommonInput
              id="in_agency_website"
              name="in_agency_website"
              extra={{
                ...register("agencyWebsite", {
                  required: "Website cannot be empty.",
                  maxLength: 150,
                }),
              }}
              className={errors?.agencyWebsite?.message ? "border-red-500" : ""}
            />
            {errors?.agencyWebsite?.message && (
              <p className="text-red-500 text-right text-sm">
                {errors.agencyWebsite?.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="in_plan">Plan</label>
            <Select
              className="basic-single shadow-md"
              classNamePrefix="select"
              isMulti={false}
              isSearchable={true}
              name="in_plan"
              {...register("agencyPlan", {
                required: "You need to choose a plan.",
              })}
              onChange={(option) => setValue("agencyPlan", option?.value || "")}
              defaultValue={{ value: "FREE", label: "Free ($0.00/mo)" }}
              options={[
                { value: "FREE", label: "Free ($0.00/mo)" },
                {
                  value: "SEMIDEDICATED",
                  label: "Semi-dedicated ($199.90/mo)",
                },
                { value: "DEDICATED", label: "Dedicated ($499.90/mo)" },
              ]}
            />
            {errors?.agencyPlan?.message && (
              <p className="text-red-500 text-right text-sm">
                {errors.agencyPlan?.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="in_password">Password</label>
            <CommonInput
              id="in_password"
              name="in_password"
              type="password"
              extra={{
                ...register("password", {
                  required: "Password cannot be blank.",
                  validate: validatePasswordRule,
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                }),
              }}
              className={errors?.password?.message ? "border-red-500" : ""}
            />
            {errors?.password?.message && (
              <p className="text-red-500 text-right text-sm w-72">
                {errors.password?.message}
              </p>
            )}
          </div>

          <CommonButton id="btnLogin" name="btnLogin" content="Register" />
        </form>

        <Link
          to="/"
          className="mt-5 text-blue-600 hover:text-blue-900 transition-colors ease-in duration-300"
        >
          Already have an account? Sign in
        </Link>
      </div>
    </div>
  );
};
