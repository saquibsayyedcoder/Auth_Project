import { Link, useNavigate } from "react-router-dom";

const BookModal = ({ book, close }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      
      {/* MODAL BOX */}
      <div className="bg-white max-w-2xl w-full rounded-2xl shadow-xl overflow-hidden relative">

        {/* CLOSE BUTTON */}
        <button
          onClick={close}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        {/* IMAGE */}
        <img
          src={`http://localhost:5000${book.image}`}
          alt={book.title}
          className="w-full h-64 object-cover"
        />

        {/* CONTENT */}
        <div className="p-6 space-y-3">
          <h2 className="text-2xl font-bold">{book.title}</h2>
          <p className="text-gray-500">by {book.author}</p>

          <p className="text-gray-700">{book.description}</p>

          <div className="flex justify-between items-center pt-4">
            <span className="text-xl font-bold text-indigo-600">
              ₹{book.price}
            </span>

            <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
              Stock: {book.stock}
            </span>
          </div>

          {/* ACTIONS */}
          <div className="pt-6 flex gap-3">
            {isAuthenticated ? (
              <Link
                to={`/edit-book/${book._id}`}
                className="flex-1 text-center bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-semibold"
              >
                ✏️ Edit Book
              </Link>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold"
                >
                  Login
                </button>

                <button
                  onClick={() => navigate("/register")}
                  className="flex-1 border border-indigo-600 text-indigo-600 hover:bg-indigo-50 py-2 rounded-lg font-semibold"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
