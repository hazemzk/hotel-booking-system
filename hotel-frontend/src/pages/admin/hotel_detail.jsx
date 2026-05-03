import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

export default function AdminHotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    api.get(`/hotels/${id}`).then((res) => setHotel(res.data));
  }, [id]);

  if (!hotel) return <p className="p-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Sidebar />

      <div className="ml-64 p-6">

        {/* HEADER */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h1 className="text-2xl font-bold">🏨 {hotel.name}</h1>
          <p className="text-gray-500">{hotel.location}</p>

          <button
            onClick={() => navigate(`/admin/hotels/edit/${id}`)}
            className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Edit Hotel
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded shadow">
            🏠 Rooms: {hotel.stats?.rooms_count || hotel.rooms?.length}
          </div>

          <div className="bg-white p-4 rounded shadow">
            📅 Bookings: {hotel.stats?.bookings_count || 0}
          </div>
        </div>

        {/* IMAGES */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2">Images</h2>

          <div className="flex gap-2">
            {hotel.images?.map((img, i) => (
              <img
                key={i}
                src={`http://127.0.0.1:8000${img}`}
                className="w-24 h-24 object-cover rounded"
              />
            ))}
          </div>
        </div>

        {/* ROOMS */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2">Rooms</h2>

          <div className="grid md:grid-cols-3 gap-3">
            {hotel.rooms?.map((r) => (
              <div key={r.id} className="border p-3 rounded">
                <p>🚪 Room #{r.number}</p>
                <p>💰 {r.price}$</p>
                <p>👥 {r.capacity}</p>
                <button
            onClick={() => navigate(`/admin/${hotel.slug}/rooms/edit/${r.number}`)}
            className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Edit Room
          </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}