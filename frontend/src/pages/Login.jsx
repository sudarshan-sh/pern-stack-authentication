import React from "react";
import axios from "axios";
import { AUTH_API } from "../config/api";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${AUTH_API}/login`, form, {
        headers: { "Content-Type": "application/json" },
      });
      setUser(response.data.user);
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed. Please try again.",
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-100">
      <form
        action="#"
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-md shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Enter Email"
          className="border border-gray-300 rounded-md p-2 mb-4 w-full"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Enter Password"
          className="border border-gray-300 rounded-md p-2 mb-6 w-full"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <p className="mb-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500">
            Register
          </Link>
        </p>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600 disabled:bg-gray-400"
          disabled={!form.email || !form.password}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
