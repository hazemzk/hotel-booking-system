import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

export default function EditRoom() {
  const { hotelSlug, roomId } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [form, setForm] = useState({});
  const [newImages, setNewImages] = useState([]);

  // ===== Fetch Room =====
  const fetchRoom = async () => {
    try {
      const res = await api.get(`/hotels/rooms/${roomId}`);
      setRoom(res.data);
      setForm(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRoom();
  }, [roomId]);

  // ===== Update Room =====
  const updateRoom = async () => {
    try {
      await api.put(`/rooms/${roomId}`, {
        number: form.number,
        price: form.price,
        capacity: form.capacity,
        is_available: form.is_available,
      });

      alert("Room updated ✅");
      fetchRoom();
    } catch (err) {
      console.log(err);
      alert("Error updating room ❌");
    }
  };

  // ===== Upload Images =====
  const uploadImages = async () => {
    try {
      for (let img of newImages) {
        const formData = new FormData();
        formData.append("file", img);

        await api.post(`/hotels/rooms/${roomId}/upload-image`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      alert("Images uploaded ✅");
      setNewImages([]);
      fetchRoom();
    } catch (err) {
      console.log(err);
      alert("Upload failed ❌");
    }
  };

  // ===== Delete Image (لو عندك endpoint) =====
  const deleteImage = async (imgUrl) => {
    try {
      await api.delete(`/rooms/images`, {
        data: { image_url: imgUrl },
      });

      fetchRoom();
    } catch (err) {
      console.log(err);
    }
  };

  if (!room) return <p className="p-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Sidebar />

      <div className="ml-64 p-6 max-w-4xl space-y-6">

        {/* HEADER */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h1 className="text-2xl font-bold mb-4">🛏 Edit Room</h1>

          <input
            className="border p-2 w-full mb-2"
            value={form.number || ""}
            placeholder="Room Number"
            onChange={(e) =>
              setForm({ ...form, number: e.target.value })
            }
          />

          <input
            className="border p-2 w-full mb-2"
            value={form.price || ""}
            placeholder="Price"
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
          />

          <input
            className="border p-2 w-full mb-2"
            value={form.capacity || ""}
            placeholder="Capacity"
            onChange={(e) =>
              setForm({ ...form, capacity: e.target.value })
            }
          />

          <label className="flex items-center gap-2 mb-3">
            <input
              type="checkbox"
              checked={form.is_available || false}
              onChange={(e) =>
                setForm({ ...form, is_available: e.target.checked })
              }
            />
            Available
          </label>

          <button
            onClick={updateRoom}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
        </div>

        {/* IMAGES */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-bold mb-4">📸 Room Images</h2>

          {/* Existing Images */}
          <div className="flex flex-wrap gap-3 mb-4">
            {room.images?.map((img, i) => (
              <div key={i} className="relative">
                <img
                  src={`http://127.0.0.1:8000${img}`}
                  className="w-28 h-28 object-cover rounded"
                />

                <button
                  onClick={() => deleteImage(img)}
                  className="absolute top-1 right-1 bg-red-500 text-white px-2 rounded"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Upload New Images */}
          <input
            type="file"
            multiple
            onChange={(e) => setNewImages([...e.target.files])}
            className="mb-3"
          />

          <button
            onClick={uploadImages}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Upload Images
          </button>
        </div>

        {/* NAVIGATION */}
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          ⬅ Back
        </button>

      </div>
    </div>
  );
}