import { useEffect, useState } from "react";
import api from "../../api/axios.js";
import Navbar from "../../components/Navbar.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import {useAuth} from '../../context/AuthContext.jsx'

function AdminDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/admin/dashboard")
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  if (!data) return <p className="p-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Sidebar />

      <div className="p-6 ml-10 mt-10 space-y-6">

        {/* 🔥 Overview */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card title="Hotels" value={data.overview.total_hotels} />
          <Card title="Rooms" value={data.overview.total_rooms} />
          <Card title="Bookings" value={data.overview.total_bookings} />
        </div>

        {/* 🔥 Booking Status */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card title="Confirmed" value={data.bookings.confirmed} color="green" />
          <Card title="Pending" value={data.bookings.pending} color="yellow" />
          <Card title="Cancelled" value={data.bookings.cancelled} color="red" />
        </div>

        {/* 🔥 Revenue */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card 
            title="Total Revenue" 
            value={`$${data.revenue.total}`} 
            big 
          />
          <Card 
            title="Avg Booking" 
            value={`$${data.revenue.average_booking}`} 
            big 
          />
        </div>

        {/* 🔥 Metrics */}
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h3 className="text-gray-500 mb-2">Occupancy Rate</h3>
          <p className="text-3xl font-bold text-blue-600">
            {data.metrics.occupancy_rate}%
          </p>
        </div>

      </div>
    </div>
  );
}

function Card({ title, value, color = "blue", big = false }) {
  const colors = {
    blue: "text-blue-600",
    green: "text-green-600",
    red: "text-red-600",
    yellow: "text-yellow-500",
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow text-center">
      <h3 className="text-gray-500">{title}</h3>
      <p className={`${big ? "text-3xl" : "text-2xl"} font-bold ${colors[color]}`}>
        {value}
      </p>
    </div>
  );
}

export default AdminDashboard;