import { useEffect, useState } from "react";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ هات التوكن
  const token = localStorage.getItem("token");

  const fetchBookings = async () => {
    try {
      const res = await api.get("/bookings/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load bookings ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // ✅ حذف حجز
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;

    try {
      await api.delete(`/bookings/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings(bookings.filter((b) => b.id !== id));
    } catch (err) {
      console.log(err);
      alert("Delete failed ❌");
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 ml-64">
      <Navbar />
      <Sidebar />
      <h1 className="text-2xl mt-10 font-bold mb-6">My Bookings</h1>

      {bookings.length === 0 ? (
        <p>No bookings found 😢</p>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white shadow rounded-xl p-4 flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold text-lg">
                  {booking.hotel_name || "Hotel"}
                </h2>
                <p>Room: {booking.room_number}</p>
                <p>From: {booking.check_in}</p>
                <p>To: {booking.check_out}</p>
                <p>Status: {booking.status}</p>
              </div>

              <button
                onClick={() => handleDelete(booking.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}