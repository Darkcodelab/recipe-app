import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

// components
import SearchForm from "../components/SearchForm";

// icons
import { HeartIcon } from "@heroicons/react/24/outline";

function Dashboard() {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!user?.id) {
      navigate("/auth");
    }
  }, []);

  return (
    <div className="bg-primaryBlack min-h-[100vh] text-white">
      <section className="p-5 bg-primaryTeal text-primarySlate flex flex-col text-center items-center justify-between lg:flex-row lg:text-left">
        <div>
          <p className="text-lg">Welcome</p>
          <h2 className="text-3xl font-bold">{user.name}</h2>
        </div>
        <div className="mt-4 lg:mt-0">
          <button className="bg-primaryBlack px-8 py-2 rounded-md flex items-center gap-2">
            <HeartIcon className="h-4" />
            Favorites
          </button>
        </div>
      </section>
      <section className="mt-8 px-1">
        <SearchForm />
      </section>
    </div>
  );
}
export default Dashboard;
