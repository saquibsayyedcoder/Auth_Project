import { Link } from "react-router-dom";

const BookCards = ({ book }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300">
      <img
        src={`http://localhost:5000${book.image}`}
        alt={book.title}
        className="w-full h-48 object-cover rounded-t-xl"
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {book.title}
        </h2>

        <p className="text-sm text-gray-500 mb-2">
          by {book.author}
        </p>

        <p className="text-gray-700 text-sm line-clamp-2">
          {book.description}
        </p>

        <div className="flex justify-between items-center mt-4">
          <span className="font-bold text-green-600">
            ₹{book.price}
          </span>

          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
            Stock: {book.stock}
          </span>
        </div>
      </div>

      <Link
  to={`/edit-book/${book._id}`}
  className="px-3 py-1 bg-yellow-500 text-white rounded"
>
  Edit
</Link>

    </div>
  );
};

export default BookCards;
