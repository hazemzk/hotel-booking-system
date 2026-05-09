import { useEffect, useState } from "react";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function Profile() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  });

  useEffect(() => {
    api.get("/users/profile").then((res) => {
      setUser(res.data);
      setForm({
        username: res.data.username || "",
        first_name: res.data.first_name || "",
        last_name: res.data.last_name || "",
        email: res.data.email || "",
        phone: res.data.phone || "",
        password: "",
        confirm_password: "",
      });
    });
  }, []);

  const updateProfile = async () => {
    if (form.password !== form.confirm_password) {
      alert("Passwords do not match ❌");
      return;
    }

    const res = await api.put("/users/profile", form);
    setUser(res.data);

    alert("Updated successfully ✅");
  };

  const deleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Your account will be deleted after 30 days. Continue?"
    );

    if (!confirmDelete) return;

    await api.delete("/users/profile");

    localStorage.clear();
    window.location.href = "/login";
  };

  if (!user)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="p-6 flex justify-center">
          <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8">

            <h1 className="text-2xl font-bold mb-6">Profile</h1>

            {/* First Name */}
            <input
              className="w-full mb-3 p-3 border rounded"
              placeholder="First Name"
              value={form.first_name}
              onChange={(e) =>
                setForm({ ...form, first_name: e.target.value })
              } 
            />
            {/* Last Name */}
            <input  
              className="w-full mb-3 p-3 border rounded"
              placeholder="Last Name"
              value={form.last_name}
              onChange={(e) =>
                setForm({ ...form, last_name: e.target.value })
              }
            />  

            {/* Email */}
            <input
              className="w-full mb-3 p-3 border rounded"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            {/* Phone */}
            <input
              className="w-full mb-3 p-3 border rounded"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />

            {/* Password */}
            <input
              type="password"
              className="w-full mb-3 p-3 border rounded"
              placeholder="New Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            {/* Confirm Password */}
            <input
              type="password"
              className="w-full mb-3 p-3 border rounded"
              placeholder="Confirm Password"
              value={form.confirm_password}
              onChange={(e) =>
                setForm({ ...form, confirm_password: e.target.value })
              }
            />

            <button
              onClick={updateProfile}
              className="bg-blue-600 text-white px-6 py-2 rounded mr-3"
            >
              Update Profile
            </button>

            <button
              onClick={deleteAccount}
              className="bg-red-600 text-white px-6 py-2 rounded"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;