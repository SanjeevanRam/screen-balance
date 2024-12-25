import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import Home from "./pages/Home";
import Login from "./components/Login"; 
import Register from "./components/Register"; 
import Dashboard from "./components/Dashboard"; 
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
