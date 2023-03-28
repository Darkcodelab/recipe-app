import { useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import { userRegister } from "../store/user/actions";
import { toast } from "react-toastify";

// images
import AuthImage from "../assets/auth-image.jpg";

// icons
import {
  AtSymbolIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

type FormValues = {
  name: string;
  email: string;
  password: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.email && values.password && values.name ? values : {},
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
      : !values.name
      ? {
          name: {
            type: "required",
            message: "Name is required",
          },
        }
      : {},
  };
};

type setView = React.Dispatch<React.SetStateAction<"LOGIN" | "REGISTER">>;

function Register({ setView }: { setView: setView }) {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const handleFormSubmit = handleSubmit(async (data) => {
    setLoading(true);
    const res = await userRegister({
      user: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
    setLoading(false);
    if (res.success === true) {
      toast.success("Successfully Registered!.");
      toast.success("Log in to your new account");
      setView("LOGIN");
    } else {
      toast.error(res.error);
    }
  });

  return (
    <div className="rounded-lg flex bg-primarySlate max-w-[800px] w-full flex-col-reverse lg:flex-row">
      <div className="grow w-full px-2 py-6 flex flex-col justify-center lg:px-4">
        <div className="text-center pb-4">
          <h2 className="font-medium text-2xl mb-2">Hello there!</h2>
          <p>Create a new account with us</p>
        </div>
        <form
          className="flex flex-col max-w-[600px] w-full mx-auto py-2 lg:py-4"
          onSubmit={handleFormSubmit}
        >
          <div className="bg-white p-4 rounded-lg mt-2 flex items-center gap-2">
            <UserIcon className="h-5" />
            <input
              type="text"
              placeholder="Name"
              className="bg-transparent text-md outline-none border-none w-full"
              {...register("name")}
              required
              autoComplete="name"
            />
            {errors?.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="bg-white p-4 rounded-lg mt-2 flex items-center gap-2">
            <AtSymbolIcon className="h-5" />
            <input
              type="text"
              placeholder="email address"
              className="bg-transparent text-md outline-none border-none w-full"
              {...register("email")}
              required
              autoComplete="email"
            />
            {errors?.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="bg-white p-4 rounded-lg mt-2 flex items-center gap-2">
            <LockClosedIcon className="h-5" />
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent text-md outline-none border-none w-full"
              {...register("password")}
              required
              autoComplete="new-password"
            />
            {errors?.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="py-4 bg-primaryTeal text-white rounded-lg mt-4 shadow-lg text-md"
            disabled={loading}
          >
            Register
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
          <p>If you already have an account with us, log in</p>
          <button
            className="border px-6 py-2 rounded-lg my-2 lg:my-4"
            onClick={() => setView("LOGIN")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
export default Register;
