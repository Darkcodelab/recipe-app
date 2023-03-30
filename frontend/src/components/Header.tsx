import { User } from "../store/user/slice";
import { useAppDispatch } from "../store/hooks";
import { userLogout } from "../store/user/actions";
import { useNavigate } from "react-router-dom";

// icons
import { HeartIcon, ArrowLeftCircleIcon } from "@heroicons/react/24/outline";

function Header({ user }: { user: User }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    dispatch(userLogout());
    navigate("/auth");
  };

  return (
    <header className="p-5 bg-primaryTeal text-primarySlate flex flex-col text-center items-center justify-between lg:flex-row lg:text-left">
      <div>
        <p className="text-lg">Welcome</p>
        <h2 className="text-3xl font-bold">{user.name}</h2>
      </div>
      <div className="mt-4 flex flex-col justify-center gap-y-2 lg:mt-0 lg:flex-row lg:gap-y-0 lg:gap-x-2">
        <button className="bg-primaryBlack px-6 py-2 rounded-md flex items-center gap-2 justify-center">
          <HeartIcon className="h-4" />
          Favorites
        </button>
        <button
          className="bg-primaryBlack px-6 py-2 rounded-md flex items-center gap-2 justify-center"
          onClick={logoutUser}
        >
          <ArrowLeftCircleIcon className="h-4" />
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
