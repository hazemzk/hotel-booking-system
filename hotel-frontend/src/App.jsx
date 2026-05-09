import { BrowserRouter, Routes, Route } from "react-router-dom";

// user pages
import Home from "./pages/user/Home";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import HotelDetails from "./pages/user/HotelDetails";
import RoomDetail from "./pages/user/RoomDetails";
import Profile from "./pages/user/Profile";
import Bookings from "./pages/user/Bookings";

// admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminBookings from "./pages/admin/Bookings";
import AddHotel from "./pages/admin/create_hotel";
import Hotels from "./pages/admin/hotels";
import AdminHotelDetails from "./pages/admin/hotel_detail";
import EditHotel from "./pages/admin/edit_hotel";
import EditRoom from "./pages/admin/room_edit";
import AdminUsers from "./pages/admin/users";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🌍 PUBLIC */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 👤 USER LAYOUT */}
          <Route path="/" element={<Home />} />
          <Route path="/hotels/:slug" element={<HotelDetails />} />
          <Route path="/room/:number" element={<RoomDetail />} />
          <Route path="/profile/:name" element={<Profile />} />
          <Route path="/bookings/my" element={<Bookings />} />

        {/* 🛡️ ADMIN LAYOUT */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="/admin/hotels" element={<Hotels />} />
          <Route path="/admin/hotels/create" element={<AddHotel />} />
          <Route path="/admin/hotels/detail/:slug" element={<AdminHotelDetails />} />
          <Route path="/admin/hotels/edit/:slug" element={<EditHotel />} />
          <Route path="/admin/rooms/edit/:number" element={<EditRoom />} />
          <Route path="/admin/users" element={<AdminUsers />} />

      </Routes>
    </BrowserRouter>
  );
}