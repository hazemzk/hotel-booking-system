import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // ✅ مهم
import api from "../../api/axios";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function Home() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        const res = await api.get("/hotels/");
        setHotels(res.data || []);
      } catch (err) {
        console.log(err);
        setError("Failed to load hotels");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />
      <Sidebar />

      <div className="ml-64 pt-20 mr-10">
          {/* HERO */}
          <div className="bg-blue-600 text-white py-12  text-center">
            <h2 className="text-4xl font-bold mb-3">
              Find Your Perfect Stay
            </h2>

            <p className="text-blue-100">
              Explore the best hotels and rooms at the best prices
            </p>
          </div>

          {/* CONTENT */}
          <div className="max-w-6xl mx-auto px-4 py-8">

            {/* Loading */}
            {loading && (
              <p className="text-center text-gray-500">Loading hotels...</p>
            )}

            {/* Error */}
            {error && (
              <p className="text-center text-red-500">{error}</p>
            )}

            {/* Hotels */}
            {!loading && !error && (
              <>
                {hotels.length === 0 ? (
                  <p className="text-center text-gray-500">
                    No hotels available
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {hotels.map((hotel) => (
                      <div
                        key={hotel.id}
                        className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
                      >
                        <img
                          src={hotel.images?.[0] ? `http://127.0.0.1:8000{hotel.images}` : "https://picsum.photos/400/250"}
                          alt={hotel.name}
                          className="w-full h-60 object-cover rounded-xl mb-4"
                        />

                        <div className="p-4 text-center">
                          <h3 className="text-xl font-semibold">
                            {hotel.name}
                          </h3>

                          <p className="text-gray-500">
                            {hotel.location}
                          </p>

                          <p className="text-yellow-500">
                            ⭐ {hotel.rating || 0}
                          </p>

                          <p className="text-gray-600 text-sm mt-2">
                            {hotel.description || "No description available"}
                          </p>

                          <Link
                            to={`/hotels/${hotel.id}`}
                            className="inline-block mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                          >
                            View & Book
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

          </div>
        </div>
      </div>
  );
}

export default Home;