import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

const SingleBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    console.log("Book ID from URL:", id);

    API.get(`/books/get-single-book/${id}`)
      .then((res) => setBook(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!book) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-6">
      <div className="bg-white rounded-2xl shadow-lg max-w-3xl w-full p-6">
        <img
          src={`http://localhost:5000${book.image}`}
          alt={book.title}
          className="w-full h-72 object-cover rounded-xl"
        />

        <h1 className="text-3xl font-bold mt-4">{book.title}</h1>
        <p className="text-gray-500">by {book.author}</p>

        <p className="mt-4 text-gray-700">{book.description}</p>

        <div className="flex justify-between items-center mt-6">
          <span className="text-2xl font-bold text-indigo-600">
            ₹{book.price}
          </span>
          <span className="text-sm">Stock: {book.stock}</span>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
