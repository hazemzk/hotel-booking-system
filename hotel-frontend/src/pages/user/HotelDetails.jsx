import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";


function HotelDetails() {
  const { slug } = useParams();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await api.get(`/hotels/${slug}`);
        setHotel(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [slug]);

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (!hotel) return <div className="text-center p-10">Hotel not found</div>;
  const handleBooking = async (roomId) => {
    try {
      const res = await api.post("/bookings", {
        room_id: roomId,
        check_in: "2026-04-25",
        check_out: "2026-04-27"
      });

      alert("Booking successful ✅");
    } catch (err) {
      console.log(err);
      alert("Booking failed ❌");
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar/>
      {/* HOTEL INFO */}
      <div className="max-w-6xl mx-auto p-5 mt-5">
        <h1 className="text-3xl font-bold">{hotel.name}</h1>
        <p className="text-gray-500">{hotel.location}</p>

        {/* IMAGES */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
          {hotel.images.map((img, i) => (
            <img
              key={i}
              src={`http://127.0.0.1:8000${img}`}
              alt=""
              className="w-full h-40 object-cover rounded-lg"
            />
          ))}
        </div>

        {/* DESCRIPTION */}
        <p className="mt-5 text-gray-700">{hotel.description}</p>

        {/* ROOMS */}
        <h2 className="text-2xl font-semibold mt-10 mb-5">Available Rooms</h2>

        <div className="grid md:grid-cols-2 gap-5">
          {hotel.rooms.map((room) => (
            <div
              key={room.id}
              className="bg-white p-4 rounded-xl shadow"
            >
              {/* ROOM IMAGE */}
              {room.images.length > 0 && (
                <img
                  src={`http://127.0.0.1:8000${room.images[0]}`}
                  className="w-full h-40 object-cover rounded"
                />
              )}

              <h3 className="text-lg font-bold mt-3">
                Room #{room.number}
              </h3>

              <p className="text-gray-500">
                Capacity: {room.capacity} persons
              </p>

              <p className="text-blue-600 font-bold mt-2">
                ${room.price} / night
              </p>

              {/* AMENITIES */}
              <div className="flex flex-wrap gap-2 mt-2">
                {room.amenities.map((a, i) => (
                  <span
                    key={i}
                    className="bg-gray-200 px-2 py-1 text-sm rounded"
                  >
                    {a}
                  </span>
                ))}
              </div>

              {/* BOOK BUTTON */}
              <button
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                
                onClick={() =>{ 
                  console.log("ROOM DATA:", room);
                  console.log("ROOM NUMBER:", room.number);
                  navigate(`/room/${room.number}`)}}
              >
                View Room
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HotelDetails;