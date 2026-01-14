import { useNavigate } from "react-router-dom";

const BookCards = ({ book }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/single-book/${book._id}`)}
      className="cursor-pointer group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <img
        src={`http://localhost:5000${book.image}`}
        alt={book.title}
        className="w-full h-52 object-cover"
      />

      <div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold">{book.title}</h2>
        <p className="text-sm text-gray-500">by {book.author}</p>
        <p className="text-sm text-gray-600 line-clamp-2">
          {book.description}
        </p>
      </div>

      <div className="flex justify-between px-4 py-3 border-t">
        <span className="font-bold">₹{book.price}</span>
        <span className="text-xs">Stock: {book.stock}</span>
      </div>
    </div>
  );
};

export default BookCards;
