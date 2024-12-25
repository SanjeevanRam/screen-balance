import { useState } from "react";
import axiosInstance from "axios";
import { useNavigate } from "react-router-dom";
// import api from "../api";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axiosInstance.post("http://localhost:5000/api/users/login", {
      email,
      password,
    });

    const { token } = response.data;
    localStorage.setItem("token", token);
    navigate("/");
  } catch (err) {
    setError(err.response?.data?.message || "Login failed. Please try again.");
  }
};

  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-100 border border-red-400 p-3 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Login
          </button>
        </form>
        <p>
        Do not have an account?{" "}
        <a href="/register" style={{ color: "blue" }}>
          Register here
        </a>
      </p>

      </div>
    </div>
  );
};

export default Login;
