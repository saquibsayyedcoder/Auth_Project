import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-blue-600 tracking-tight"
        >
          📚 BookStore
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">

          {!isLoggedIn ? (
            <>
              <Link
                to="/"
                className="nav-link"
              >
                Home
              </Link>

              <Link
                to="/login"
                className="nav-link"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="btn-primary"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className="nav-link">
                View Books
              </Link>

              <Link to="/add-book" className="btn-success">
                Add Book
              </Link>

              <button
                onClick={logout}
                className="btn-danger"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-6 py-4 space-y-4">

          {!isLoggedIn ? (
            <>
              <Link to="/" className="mobile-link" onClick={() => setMenuOpen(false)}>
                Home
              </Link>

              <Link to="/login" className="mobile-link" onClick={() => setMenuOpen(false)}>
                Login
              </Link>

              <Link to="/signup" className="btn-primary w-full text-center" onClick={() => setMenuOpen(false)}>
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className="mobile-link" onClick={() => setMenuOpen(false)}>
                View Books
              </Link>

              <Link to="/add-book" className="btn-success w-full text-center" onClick={() => setMenuOpen(false)}>
                Add Book
              </Link>

              <button
                onClick={logout}
                className="btn-danger w-full"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
