import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import routing components
import Home from "./pages/Home";
import Login from "./components/Login"; // Assuming you have a Login page
import Register from "./components/Register"; // Assuming you have a Register page
import Dashboard from "./components/Dashboard"; // Assuming this is the protected Dashboard component
import './style/tailwind.css';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
