import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    author: "",
    price: "",
    stock: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  // 🔄 Fetch existing book
  useEffect(() => {
    API.get(`/books/get-single-book/${id}`)
      .then((res) => {
        setForm(res.data);
        setPreview(res.data.image);
      })
      .catch(() => alert("Failed to load book"));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach((key) => {
      data.append(key, form[key]);
    });

    if (image) data.append("image", image);

    await API.put(`/books/update/${id}`, data);
    alert("Book Updated");
    navigate("/");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Edit Book</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="input"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Title"
        />

        <input
          className="input"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          placeholder="Author"
        />

        <input
          className="input"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          placeholder="Price"
        />

        <input
          className="input"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
          placeholder="Stock"
        />

        <textarea
          className="input"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Description"
        />

        {preview && (
          <img
            src={`http://localhost:5000${preview}`}
            alt="preview"
            className="h-40 object-cover rounded"
          />
        )}

        <input type="file" onChange={(e) => setImage(e.target.files[0])} />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Update Book
        </button>
      </form>
    </div>
  );
};

export default EditBook;
