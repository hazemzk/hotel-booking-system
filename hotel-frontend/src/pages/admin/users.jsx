import { useEffect, useState } from "react";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users-with-bookings");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
      alert("Error loading users ❌");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Sidebar />

      <div className="ml-64 p-6">
        <h1 className="text-2xl font-bold mb-6">👨‍💼 Users & Bookings</h1>

        <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-3">ID</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Bookings</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{user.id}</td>
                  <td className="p-3">{user.email}</td>

                  <td className="p-3">
                    {user.is_admin ? "Admin 👑" : "User"}
                  </td>

                  <td className="p-3 font-bold">
                    {user.bookings_count}
                  </td>

                  <td className="p-3">
                    {user.bookings_count > 0 ? (
                      <span className="text-green-600">Has Bookings ✅</span>
                    ) : (
                      <span className="text-red-500">No Bookings ❌</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <p className="text-center p-4">No users found</p>
          )}
        </div>
      </div>
    </div>
  );
}