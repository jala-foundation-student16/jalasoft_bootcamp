import { CommonInput } from "../CommonInput/CommonInput";
import { useForm } from "react-hook-form";

export const ModalCreate = ({
  onClickYes,
  isVisible,
  setIsVisible,
}) => {
  function close() {
    setIsVisible(false);
  }

  if (!isVisible) {
    return null;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div
      className="fixed flex inset-0 bg-black bg-opacity-20 backdrop-blur-sm h-full w-full justify-center items-center"
      id={`modal-create`}
    >
      <div className="relative flex flex-col bg-slate-50 p-5 rounded-md m-4 shadow-lg">
        <h1 className="text-lg text-center">Adding user</h1>

        <div className="flex mt-5 gap-5">
          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(onClickYes)}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="in_firstName">First name</label>
              <CommonInput
                id="in_firstName"
                name="in_firstName"
                extra={{
                  ...register("name", {
                    required: "First name cannot be blank",
                    maxLength: 100,
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
              <label htmlFor="in_lastName">Last name</label>
              <CommonInput
                id="in_lastName"
                name="in_lastName"
                extra={{
                  ...register("last_name", {
                    required: "Last name cannot be blank",
                    maxLength: 100,
                  }),
                }}
                className={errors?.last_name?.message ? "border-red-500" : ""}
              />
              {errors?.last_name?.message && (
                <p className="text-red-500 text-right text-sm">
                  {errors.last_name?.message}
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
                    required: "Email cannot be blank",
                    maxLength: 150,
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                      message: "Insira um e-mail válido",
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
              <label htmlFor="in_job">Job</label>
              <CommonInput
                id="in_job"
                name="in_job"
                extra={{
                  ...register("job", {
                    required: "Job cannot be blank",
                    maxLength: 50,
                  }),
                }}
                className={errors?.job?.message ? "border-red-500" : ""}
              />
              {errors?.job?.message && (
                <p className="text-red-500 text-right text-sm">
                  {errors.job?.message}
                </p>
              )}
            </div>

            <button className="w-full bg-green-700 p-2 rounded-md text-slate-50 shadow-md">
              Save
            </button>

            <button
              className="w-full bg-red-700 p-2 rounded-md text-slate-50 shadow-md"
              onClick={close}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
