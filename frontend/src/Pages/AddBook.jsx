import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    author: "",
    price: "",
    stock: "",
    description: "",
  });

  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach((key) => {
      data.append(key, form[key]);
    });
    data.append("image", image);

    await API.post("/books/create", data);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-lg p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          ➕ Add New Book
        </h2>

        {/* Title */}
        <input
          type="text"
          placeholder="Book Title"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          required
        />

        {/* Author */}
        <input
          type="text"
          placeholder="Author Name"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) =>
            setForm({ ...form, author: e.target.value })
          }
          required
        />

        {/* Price & Stock */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Price"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
            required
          />

          <input
            type="number"
            placeholder="Stock"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setForm({ ...form, stock: e.target.value })
            }
            required
          />
        </div>

        {/* Description */}
        <textarea
          rows="4"
          placeholder="Book Description"
          className="w-full mt-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          required
        />

        {/* Image Upload */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Book Image
          </label>
          <input
            type="file"
            className="w-full text-sm file:mr-4 file:py-2 file:px-4
                       file:rounded-lg file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700
                       hover:file:bg-blue-100"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
