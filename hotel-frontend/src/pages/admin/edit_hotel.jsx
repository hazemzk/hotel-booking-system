import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

export default function EditHotel() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState(null);
  const [form, setForm] = useState({});
  const [newImages, setNewImages] = useState([]);

  // ===== Fetch Hotel =====
  const fetchHotel = async () => {
    try {
      const res = await api.get(`/hotels/${id}`);
      setHotel(res.data);
      setForm(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchHotel();
  }, [id]);

  // ===== Update Hotel =====
  const updateHotel = async () => {
    try {
      await api.put(`/hotels/${id}`, {
        name: form.name,
        location: form.location,
        description: form.description,
      });

      alert("Updated successfully ✅");
      fetchHotel();
    } catch (err) {
      console.log(err);
      alert("Error updating ❌");
    }
  };

  // ===== Upload Single Image =====
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    await api.post(`/hotels/${id}/upload-image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  // ===== Upload Multiple Images =====
  const uploadImages = async () => {
    try {
      for (let file of newImages) {
        await uploadImage(file);
      }

      alert("Images uploaded ✅");
      setNewImages([]);
      fetchHotel();
    } catch (err) {
      console.log(err);
      alert("Upload failed ❌");
    }
  };

  // ===== Delete Image =====
  const deleteImage = async (imgUrl) => {
    try {
      await api.delete(`/hotels/images`, {
        data: { image_url: imgUrl },
      });

      fetchHotel();
    } catch (err) {
      console.log(err);
    }
  };

  if (!hotel) return <p className="p-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Sidebar />

      <div className="ml-64 p-6 max-w-5xl space-y-6">

        {/* HEADER */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h1 className="text-2xl font-bold mb-4">🏨 Edit Hotel</h1>

          <input
            className="border p-2 w-full mb-2"
            value={form.name || ""}
            placeholder="Hotel Name"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            className="border p-2 w-full mb-2"
            value={form.location || ""}
            placeholder="Location"
            onChange={(e) =>
              setForm({ ...form, location: e.target.value })
            }
          />

          <textarea
            className="border p-2 w-full mb-2"
            value={form.description || ""}
            placeholder="Description"
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <button
            onClick={updateHotel}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
        </div>

        {/* IMAGES */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-bold mb-4">📸 Hotel Images</h2>

          {/* Existing Images */}
          <div className="flex flex-wrap gap-3 mb-4">
            {hotel.images?.map((img, i) => (
              <div key={i} className="relative">
                <img
                  src={`http://127.0.0.1:8000${img}`}
                  className="w-32 h-32 object-cover rounded"
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

          {/* Upload */}
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