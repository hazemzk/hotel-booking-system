import { useState } from "react";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

export default function AddHotel() {
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    name: "",
    location: "",
    description: "",
    rooms: []
  });

  const [room, setRoom] = useState({
    number: "",
    price: "",
    capacity: "",
    amenities: ""
  });

  const [hotelImages, setHotelImages] = useState([]);
  const [roomImages, setRoomImages] = useState([]);

  // ===== Add Room =====
  const addRoom = () => {
    setForm({
      ...form,
      rooms: [
        ...form.rooms,
        {
          ...room,
          amenities: room.amenities.split(",").map(a => a.trim()),
          images: roomImages
        }
      ]
    });

    setRoom({
      number: "",
      price: "",
      capacity: "",
      amenities: ""
    });

    setRoomImages([]);
  };

  // ===== Submit Hotel =====
  const submitHotel = async () => {
    try {
      const res = await api.post(
        "/hotels/",
        {
          ...form,
          images: []
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const hotelId = res.data.hotel_id;

      // Upload hotel images
      for (let img of hotelImages) {
        const fd = new FormData();
        fd.append("file", img);

        await api.post(`/hotels/${hotelId}/upload-image`, fd, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        });
      }

      alert("Hotel Created Successfully ✅");
    } catch (err) {
      console.log(err);
      alert("Error creating hotel ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Sidebar />

      <div className="ml-64 p-6">

      <h1 className="text-2xl mt-10 font-bold mb-6">🏨 Add Hotel (Admin)</h1>

      {/* HOTEL INFO */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <input
          className="border p-2 w-full mb-2"
          placeholder="Hotel Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="border p-2 w-full mb-2"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />

        <textarea
          className="border p-2 w-full"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>

      {/* HOTEL IMAGES */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <h3 className="font-bold mb-2">Hotel Images</h3>

        <input
          type="file"
          multiple
          onChange={(e) => setHotelImages([...e.target.files])}
        />
      </div>

      {/* ROOM */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <h3 className="font-bold mb-2">Add Room</h3>

        <div className="grid grid-cols-2 gap-2">
          <input
            className="border p-2"
            placeholder="Room Number"
            value={room.number}
            onChange={(e) => setRoom({ ...room, number: e.target.value })}
          />

          <input
            className="border p-2"
            placeholder="Price"
            value={room.price}
            onChange={(e) => setRoom({ ...room, price: e.target.value })}
          />

          <input
            className="border p-2"
            placeholder="Capacity"
            value={room.capacity}
            onChange={(e) => setRoom({ ...room, capacity: e.target.value })}
          />

          <input
            className="border p-2"
            placeholder="Amenities (comma separated)"
            value={room.amenities}
            onChange={(e) => setRoom({ ...room, amenities: e.target.value })}
          />
        </div>

        <input
          type="file"
          multiple
          className="mt-2"
          onChange={(e) => setRoomImages([...e.target.files])}
        />

        <button
          onClick={addRoom}
          className="mt-3 bg-blue-500 text-white px-4 py-2 rounded"
        >
          + Add Room
        </button>
      </div>

      {/* ROOMS LIST */}
      <div className="mb-4">
        {form.rooms.map((r, i) => (
          <div key={i} className="bg-white p-3 rounded shadow mb-2">
            🚪 Room {r.number} | 💰 {r.price} | 👥 {r.capacity}
          </div>
        ))}
      </div>

      {/* SUBMIT */}
      <button
        onClick={submitHotel}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        Create Hotel
      </button>
    </div></div>
  );
}