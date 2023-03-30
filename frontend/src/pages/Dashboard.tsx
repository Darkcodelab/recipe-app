import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

// components
import SearchForm from "../components/SearchForm";
import Header from "../components/Header";

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
      <Header user={user} />
      <section className="mt-8 px-1">
        <SearchForm />
      </section>
    </div>
  );
}
export default Dashboard;
