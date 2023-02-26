import { Link } from "react-router-dom";
import { useForm, Resolver } from "react-hook-form";

// images
import AuthImage from "../assets/auth-image.jpg";

// icons
import { AtSymbolIcon, LockClosedIcon } from "@heroicons/react/24/outline";

type FormValues = {
  email: string;
  password: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.email && values.password ? values : {},
    errors: !values.email
      ? {
          email: {
            type: "required",
            message: "Email is required.",
          },
        }
      : !values.password
      ? {
          password: {
            type: "required",
            message: "Password is required.",
          },
        }
      : {},
  };
};

type setView = React.Dispatch<React.SetStateAction<"LOGIN" | "REGISTER">>;

function Login({ setView }: { setView: setView }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const handleFormSubmit = handleSubmit((data) => {
    console.log(data);
    // TODO: Handle Form submit
  });

  return (
    <div className="rounded-lg flex bg-primarySlate max-w-[800px] w-full flex-col-reverse lg:flex-row">
      <div className="grow w-full px-2 py-6 flex flex-col justify-center lg:px-4">
        <div className="text-center pb-4">
          <h2 className="font-medium text-2xl mb-2">Hello Again!</h2>
          <p>Welcome back you've been missed</p>
        </div>
        <form
          className="flex flex-col max-w-[600px] w-full mx-auto py-2 lg:py-4"
          onSubmit={handleFormSubmit}
        >
          <div className="bg-white p-4 rounded-lg mt-2 flex items-center gap-2 lg:mt-4">
            <AtSymbolIcon className="h-5" />
            <input
              type="email"
              placeholder="email address"
              className="bg-transparent text-md outline-none border-none w-full grow"
              {...register("email")}
              required
              autoComplete="username"
            />
            {errors?.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="bg-white p-4 rounded-lg mt-2 flex items-center gap-2 lg:mt-4">
            <LockClosedIcon className="h-5" />
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent text-md outline-none border-none w-full"
              {...register("password")}
              required
              autoComplete="current-password"
            />
            {errors?.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div className="mt-2 self-end text-blue-600">
            <Link to="/recoverPassword" className="text-sm">
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            className="py-4 bg-primaryTeal text-white rounded-lg mt-4 shadow-lg text-md lg:mt-8"
          >
            Sign In
          </button>
        </form>
      </div>
      <div className="bg-primaryTeal text-white grow w-full px-4 py-6 rounded-t-lg flex flex-col justify-center items-center lg:rounded-l-none lg:rounded-r-lg">
        <div className="my-2 lg:my-4">
          <img
            src={AuthImage}
            alt="Logo"
            className="max-w-sm w-full rounded-lg"
          />
        </div>
        <hr className="w-48 h-[2px] mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
        <div className="text-center text-sm">
          <p>If you don't have an account with us, create a new one</p>
          <button
            className="border px-6 py-2 rounded-lg my-2 lg:my-4"
            onClick={() => setView("REGISTER")}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
export default Login;
