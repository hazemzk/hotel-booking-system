import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";

export default function Hotels() {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  
    let role = null;
  
    try {
      if (token) {
        const decoded = jwtDecode(token);
        role = decoded.role;
      }
    } catch (err) {
      role = null;
    }
  
  const isAdmin = role === "admin";

  // ===== Fetch Hotels =====
  const fetchHotels = async () => {
    try {
      const res = await api.get("/hotels/");
      setHotels(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);


  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Sidebar />

      <div className="ml-64 p-6">
      <h1 className="text-2xl font-bold mt-10 mb-6">🏨 All Hotels</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="bg-white rounded-xl shadow overflow-hidden"
          >

            {/* IMAGE */}
            <img
              src={
                hotel.images?.[0]
                  ? `http://127.0.0.1:8000${hotel.images[0]}`
                  : "https://via.placeholder.com/300"
              }
              className="w-full h-40 object-cover"
            />

            {/* CONTENT */}
            <div className="p-4">

              <h2 className="text-xl font-bold">{hotel.name}</h2>
              <p className="text-gray-500">{hotel.location}</p>

              <p className="text-sm mt-2 text-gray-600">
                {hotel.description?.slice(0, 80)}...
              </p>

              {/* ACTIONS */}
              <div className="flex gap-2 mt-4">

               

                {/* ADMIN ACTIONS */}
                {isAdmin && (
                  <>
                    <button
                      onClick={() => navigate(`/admin/hotels/detail/${hotel.slug}`)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      View
                    </button>

                    <button
                      onClick={() => navigate(`/admin/hotels/edit/${hotel.slug}`)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                  </>
                )}

              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
    </div>
  );
}