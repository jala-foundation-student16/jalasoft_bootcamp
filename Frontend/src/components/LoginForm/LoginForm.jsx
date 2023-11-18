import { useForm } from "react-hook-form";
import { CommonButton } from "../CommonButton/CommonButton";
import { CommonInput } from "../CommonInput/CommonInput";
import { authUser } from "../../functions/auth";
import { Link, useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../provider/AuthenticationProvider";
import { useContext, useEffect } from "react";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isAuthenticated, setUserData, setIsAuthenticated } = useContext(
    AuthenticationContext
  );

  const navigate = useNavigate();

  async function authenticateUser(data) {
    const response = await authUser(data, setIsAuthenticated, setUserData);
    if (response) {
      navigate("/home");
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated]);

  return (
    <div className="flex flex-1 columns-2 gap-8">
      <div className="hidden lg:flex flex-col flex-1 justify-center items-center bg-[url('https://images.unsplash.com/photo-1529619768328-e37af76c6fe5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80')] bg-cover"></div>
      <div className="flex flex-col flex-1 justify-center items-center">
        <h1 className="text-xl font-bold mb-4">Welcome!</h1>
        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit(authenticateUser)}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="inputEmailLogin">Email</label>
            <CommonInput
              type="email"
              id="inputEmailLogin"
              extra={{
                ...register("email", {
                  required: "Email cannot be empty",
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
            <label htmlFor="inputPasswordLogin">Password</label>
            <CommonInput
              type="password"
              id="inputPasswordLogin"
              extra={{
                ...register("password", {
                  required: "Password cannot be blank",
                  minLength: {
                    value: 8,
                    message: "Password must contain at least 8 characters",
                  },
                }),
              }}
              className={errors?.password?.message ? "border-red-500" : ""}
            />
            {errors?.password?.message && (
              <p className="text-red-500 text-right text-sm">
                {errors.password?.message}
              </p>
            )}
          </div>

          <CommonButton id="btnLogin" name="btnLogin" content="Sign In" />
        </form>
      </div>
    </div>
  );
};
