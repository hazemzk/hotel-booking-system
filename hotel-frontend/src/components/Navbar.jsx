import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Navbar() {
  const token = localStorage.getItem("token");

  const decoded = token ? jwtDecode(token) : null;

  const storedUser = localStorage.getItem("user");

  const user =
    storedUser && storedUser !== "undefined"
      ? JSON.parse(storedUser)
      : null;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <nav className="fixed top-0 left-64 right-0 bg-white shadow px-6 py-4 flex justify-between items-center z-30">
      
      <Link to="/" className="text-2xl font-bold text-blue-600">
        🏨 HotelBooking
      </Link>

      <div className="flex gap-4 items-center">
        <Link to="/">Home</Link>

        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded">
              Register
            </Link>
          </>
        ) : (
          <>
            <span className="font-semibold text-gray-700">
              👋 {user?.username || decoded?.username || user?.email || "User"}
            </span>

            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;