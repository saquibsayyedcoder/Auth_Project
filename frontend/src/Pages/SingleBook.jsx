import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

const SingleBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    API.get(`/books/get-single-book/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      await API.delete(`/books/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Book deleted successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Failed to delete book");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!book) {
    return <p className="text-center mt-10 text-red-500">Book not found</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-6">
      <div className="bg-white rounded-2xl shadow-lg max-w-3xl w-full p-6">

        {/* IMAGE */}
        <img
          src={`http://localhost:5000${book.image}`}
          alt={book.title}
          className="w-full h-72 object-cover rounded-xl"
        />

        {/* TITLE */}
        <h1 className="text-3xl font-bold mt-4">{book.title}</h1>
        <p className="text-gray-500">by {book.author}</p>

        {/* DESCRIPTION */}
        <p className="mt-4 text-gray-700">{book.description}</p>

        {/* PRICE + STOCK */}
        <div className="flex justify-between items-center mt-6">
          <span className="text-2xl font-bold text-indigo-600">
            ₹{book.price}
          </span>
          <span className="text-sm">Stock: {book.stock}</span>
        </div>

        {/* ACTION BUTTONS */}
        {isLoggedIn && (
          <div className="flex gap-4 mt-8">
            <button
              onClick={() => navigate(`/edit-book/${book._id}`)}
              className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
            >
              Edit
            </button>

            <button
              onClick={handleDelete}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default SingleBook;
