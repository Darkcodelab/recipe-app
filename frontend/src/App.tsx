import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// pages
import Auth from "./pages/Auth";

function App() {
  return (
    <main>
      <Router>
        <Routes>
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
      <ToastContainer />
    </main>
  );
}
export default App;
