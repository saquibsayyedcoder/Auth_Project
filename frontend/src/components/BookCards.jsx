import { useState } from "react";
import BookModal from "./BookModal";

const BookCards = ({ book }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* CARD */}
      <div
        onClick={() => setOpen(true)}
        className="cursor-pointer group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
      >
        {/* IMAGE */}
        <img
          src={`http://localhost:5000${book.image}`}
          alt={book.title}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* CONTENT */}
        <div className="p-4 space-y-2">
          <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
            {book.title}
          </h2>

          <p className="text-sm text-gray-500">
            by <span className="font-medium">{book.author}</span>
          </p>

          <p className="text-sm text-gray-600 line-clamp-2">
            {book.description}
          </p>
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between px-4 py-3 border-t">
          <span className="text-lg font-bold text-indigo-600">
            ₹{book.price}
          </span>

          <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
            Stock: {book.stock}
          </span>
        </div>
      </div>

      {/* MODAL */}
      {open && <BookModal book={book} close={() => setOpen(false)} />}
    </>
  );
};

export default BookCards;
