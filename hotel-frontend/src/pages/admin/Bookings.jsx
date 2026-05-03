import { useEffect, useState } from "react";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";


export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await api.get("/bookings/");
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // ✅ تغيير الحالة
const updateStatus = async (id, status) => {
  try {
    await api.put(`/bookings/${id}`, {
      status: status,
    });
    fetchBookings();
  } catch (err) {
    console.error(err);
  }
};

  // ❌ حذف
  const deleteBooking = async (id) => {
    if (!confirm("Are you sure?")) return;

    try {
      await api.delete(`/bookings/${id}`);
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Sidebar />

      <div className="ml-64 p-6">
      <h2 className="text-2xl font-bold mt-10 mb-6">📊 All Bookings</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="bg-white shadow-md rounded-xl p-4 border"
          >
            <h3 className="text-lg font-semibold mb-2">
              Booking #{b.id}
            </h3>

            <p>🏨 {b.hotel_name}</p>
            <p>🚪 Room #{b.room_number}</p>
            <p>📅 Check-in: {b.check_in}</p>
            <p>📅 Check-out: {b.check_out}</p>

            <p className="mt-2">
              Status:
              <span
                className={`ml-2 px-2 py-1 rounded text-white ${
                  b.status === "accepted"
                    ? "bg-green-500"
                    : b.status === "rejected"
                    ? "bg-red-500"
                    : "bg-yellow-500"
                }`}
              >
                {b.status}
              </span>
            </p>

            {/* 🔥 تغيير الحالة */}
            <div className="flex gap-2 mt-4 flex-wrap">
              <button
                onClick={() => updateStatus(b.id, "confirmed")}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Accept
              </button>

              <button
                onClick={() => updateStatus(b.id, "cancelled")}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Reject
              </button>

              <button
                onClick={() => updateStatus(b.id, "pending")}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Pending
              </button>
            </div>

            {/* ❌ حذف */}
            <button
              onClick={() => deleteBooking(b.id)}
              className="mt-4 w-full bg-black text-white py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div></div>
  );
}