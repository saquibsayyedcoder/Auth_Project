import { useNavigate } from "react-router-dom";

const BookCards = ({ book }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/single-book/${book._id}`)}
      className="
        cursor-pointer group
        bg-white rounded-2xl overflow-hidden
        shadow-sm hover:shadow-xl
        transition-all duration-300
        hover:-translate-y-1
        flex flex-col
      "
    >
      {/* IMAGE */}
      <div className="relative w-full aspect-[3/4] overflow-hidden">
        <img
          src={`http://localhost:5000${book.image}`}
          alt={book.title}
          className="
            w-full h-full object-cover
            transition-transform duration-500
            group-hover:scale-105
          "
        />

        {/* PRICE BADGE */}
        <span className="
          absolute top-3 right-3
          bg-blue-600 text-white
          text-sm font-semibold
          px-3 py-1 rounded-full
          shadow-md
        ">
          ₹{book.price}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-base md:text-lg font-semibold text-gray-900 line-clamp-2">
          {book.title}
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          by {book.author}
        </p>

        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {book.description}
        </p>

        {/* FOOTER */}
        <div className="mt-auto pt-4 flex justify-between items-center text-sm">
          <span
            className={`font-medium ${
              book.stock > 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {book.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>

          <span className="text-gray-400 text-xs">
            Stock: {book.stock}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookCards;
