import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");

      if (userData && userData !== "undefined") {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } else if (token) {
        const decoded = jwtDecode(token);
        setUser(decoded);
      }
    } catch (err) {
      console.log("Error parsing user data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("token");
  const displayName = user?.username || user?.first_name || user?.email || "User";

  return (
    <nav className="fixed top-0 left-64 right-0 bg-white shadow px-6 py-4 flex justify-between items-center z-30">
      
      <Link to="/" className="text-2xl font-bold text-blue-600">
        🏨 HotelBooking
      </Link>

      <div className="flex gap-4 items-center">
        <Link to="/" className="hover:text-blue-600 transition">Home</Link>

        {!isLoggedIn ? (
          <>
            <Link to="/login" className="hover:text-blue-600 transition">Login</Link>
            <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Register
            </Link>
          </>
        ) : (
          <>
            <Link 
              to={`/profile/${user?.id}`}
              className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
            >
              <span className="text-sm font-semibold text-blue-600">👤</span>
              <span className="font-semibold text-gray-700">{displayName}</span>
            </Link>

            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
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