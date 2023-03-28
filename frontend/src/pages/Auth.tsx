import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

// components
import Login from "../components/Login";
import Register from "../components/Register";

function Auth() {
  const [view, setView] = useState<"LOGIN" | "REGISTER">("LOGIN");
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (user?.id) {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-[100vh] flex justify-center items-center bg-primaryBlack p-2">
      {view === "LOGIN" ? (
        <Login setView={setView} />
      ) : (
        <Register setView={setView} />
      )}
    </div>
  );
}

export default Auth;
