import { useState } from "react";

// components
import Login from "../components/Login";
import Register from "../components/Register";

function Auth() {
  const [view, setView] = useState<"LOGIN" | "REGISTER">("LOGIN");
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
