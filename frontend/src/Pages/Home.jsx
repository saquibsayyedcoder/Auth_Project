import React, { useEffect, useState } from "react";
import API from "../api/axios";
import BookCards from "../components/BookCards";

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    API.get("/books/all-books")
      .then((res) => {
        setBooks(res.data.books || res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Book Store
      </h1>

      {books.length === 0 ? (
        <p className="text-center text-gray-500">No books available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCards key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
