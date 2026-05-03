import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Sidebar() {
  const location = useLocation();

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

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-white shadow-lg p-5 flex flex-col justify-between z-40">

      <div>
        <h1 className="text-2xl font-bold text-blue-600 mb-8">
          Dashboard
        </h1>

        <nav className="flex flex-col gap-3">

          <Link
            to="/"
            className={`px-4 py-2 rounded-lg ${
              isActive("/") ? "bg-blue-600 text-white" : "hover:bg-gray-100"
            }`}
          >
            🏠 Home
          </Link>

          <Link
            to="/admin/hotels"
            className={`px-4 py-2 rounded-lg ${
              isActive("/hotels") ? "bg-blue-600 text-white" : "hover:bg-gray-100"
            }`}
          >
            🏨 Hotels
          </Link>

          {/* ADMIN ONLY */}
          {isAdmin && (
            <>
              <Link to="/admin/hotels/create" className="px-4 py-2 hover:bg-gray-100 rounded-lg">
                ➕ Create Hotel
              </Link>

              <Link to="/admin/bookings" className="px-4 py-2 hover:bg-gray-100 rounded-lg">
                📊 All Bookings
              </Link>

              <Link to="/admin/users" className="px-4 py-2 hover:bg-gray-100 rounded-lg">
                👥 Users
              </Link>

              <Link to="/admin/dashboard" className="px-4 py-2 hover:bg-gray-100 rounded-lg">
                📈 Dashboard
              </Link>
            </>
          )}

          {/* USER ONLY */}
          {token && !isAdmin && (
            <>
              <Link to="/bookings/my" className="px-4 py-2 hover:bg-gray-100 rounded-lg">
                📅 My Bookings
              </Link>

              <Link to="/profile" className="px-4 py-2 hover:bg-gray-100 rounded-lg">
                👤 Profile
              </Link>
            </>
          )}

        </nav>
      </div>

      {/* logout */}
      {token && (
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.reload();
          }}
          className="bg-red-500 text-white py-2 rounded-lg"
        >
          Logout
        </button>
      )}
    </div>
  );
}

export default Sidebar;