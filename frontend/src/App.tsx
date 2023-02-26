import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
    </main>
  );
}
export default App;
