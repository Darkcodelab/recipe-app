import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

function Dashboard() {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!user?.id) {
      navigate("/auth");
    }
  }, []);

  return <div>Dashboard</div>;
}
export default Dashboard;
