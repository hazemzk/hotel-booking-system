import { Link } from "react-router-dom";

function HotelCard({ hotel }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">

      {/* Image */}
      <div className="relative">
        <img
          src={
            hotel.images?.[0]
              ? `http://127.0.0.1:8000${hotel.images[0]}`
              : "https://via.placeholder.com/400x250"
          }
          alt={hotel.name}
          className="h-52 w-full object-cover"
        />

        {/* Rating badge */}
        <div className="absolute top-2 left-2 bg-yellow-400 text-white px-2 py-1 rounded text-sm font-semibold">
          ⭐ {hotel.rating || 0}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800">
          {hotel.name}
        </h2>

        <p className="text-gray-500 text-sm">
          📍 {hotel.location}
        </p>

        <p className="text-sm mt-2 text-gray-600 line-clamp-2">
          {hotel.description || "No description available"}
        </p>

        {/* Buttons */}
        <div className="mt-4 flex justify-between items-center gap-2">
          
          {/* View */}
          <Link
            to={`/hotels/${hotel.id}`}
            className="flex-1 text-center bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-2 rounded-md text-sm transition"
          >
            View
          </Link>

          {/* Book */}
          <Link
            to={`/hotels/${hotel.id}`}
            className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm transition"
          >
            Book Now
          </Link>

        </div>
      </div>
    </div>
  );
}

export default HotelCard;