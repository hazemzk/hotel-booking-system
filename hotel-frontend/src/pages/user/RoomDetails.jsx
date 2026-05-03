import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function RoomDetails() {
  const { id } = useParams();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [message, setMessage] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);

  const token = localStorage.getItem("token");

  // 🔥 fetch room
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await api.get(`/hotels/rooms/${id}`);
        setRoom(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  // 🔥 booking
  const handleBooking = async () => {
    setMessage("");

    if (!checkIn || !checkOut) {
      return setMessage("Please select dates ❌");
    }

    if (checkOut <= checkIn) {
      return setMessage("Check-out must be after check-in ❌");
    }

    try {
      setBookingLoading(true);

      await api.post(
        "/bookings/",
        {
          room_id: Number(id),
          check_in: checkIn,
          check_out: checkOut,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Booking successful ✅");
    } catch (err) {
      console.log(err);
      setMessage(
        err.response?.data?.detail || "Booking failed ❌"
      );
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <p className="text-center p-10">Loading...</p>;

  if (!room)
    return <p className="text-center p-10">Room not found</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Sidebar />

      <div className="max-w-6xl mt-10 ml-10 mx-auto p-6 grid md:grid-cols-2 gap-6">

        {/* Images */}
        <div>
          <img
            src={
              room.images?.[0]
                ? `http://127.0.0.1:8000${room.images[0]}`
                : "https://via.placeholder.com/500"
            }
            alt=""
            className="w-full h-80 object-cover rounded-xl"
          />

          <div className="flex gap-2 mt-3">
            {room.images?.map((img, i) => (
              <img
                key={i}
                src={`http://127.0.0.1:8000${img}`}
                className="w-20 h-20 object-cover rounded"
              />
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-2xl font-bold mb-2">
            Room #{room.number}
          </h2>

          <p className="text-gray-500 mb-2">
            Capacity: {room.capacity} persons
          </p>

          <p className="text-blue-600 text-xl font-semibold mb-4">
            ${room.price} / night
          </p>

          {/* Amenities */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Amenities:</h3>
            <ul className="flex flex-wrap gap-2">
              {room.amenities?.map((a, i) => (
                <li
                  key={i}
                  className="bg-gray-200 px-2 py-1 rounded text-sm"
                >
                  {a}
                </li>
              ))}
            </ul>
          </div>

          {/* Booking */}
          <div className="border-t pt-4 mt-4">
            <h3 className="font-semibold mb-3">
              Book this room
            </h3>

            <div className="flex gap-2 mb-3">
              <input
                type="date"
                className="border p-2 rounded w-full"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />

              <input
                type="date"
                className="border p-2 rounded w-full"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>

            <button
              onClick={handleBooking}
              disabled={bookingLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
            >
              {bookingLoading ? "Booking..." : "Book Now"}
            </button>

            {message && (
              <p className="mt-3 text-center text-sm">
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomDetails;