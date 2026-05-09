import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/users/register/", form);

      alert("Registered successfully ✅");
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.detail || "Register failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Navbar/>
      <Sidebar/>
      <form
        onSubmit={register}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Account
        </h2>

        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
          className="w-full p-3 mb-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="first_name"
          placeholder="First Name"
          onChange={handleChange}
          className="w-full p-3 mb-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="last_name"
          placeholder="Last Name"
          onChange={handleChange}
          className="w-full p-3 mb-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full p-3 mb-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          required
          className="w-full p-3 mb-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 mb-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="confirm_password"
          type="password"
          placeholder="Confirm Password"
          onChange={handleChange}
          className="w-full p-3 mb-5 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        <button
          disabled={loading}
          className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition"
        >
          {loading ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
}