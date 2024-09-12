import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { IoIosCart } from "react-icons/io";
import useUserDetails from "../hooks/useUserDetails";
import { HiMenu } from "react-icons/hi";

const MainNavigation = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const isAuthenticated = useAuth();
  const { userDetails, loading } = useUserDetails();

  useEffect(() => {
    console.log("User Details: ", userDetails);
  }, [userDetails]);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 100);
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`/shop?search=${encodeURIComponent(searchValue)}`);
    setShowSearch(false);
    setSearchValue("");
  };

  const handleAccountClick = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      navigate("/profile");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user-threads");
    window.location.reload();
    navigate("/");
  };

  return (
    <main>
      <section className="relative flex justify-between maxWidth-large bg-slate-200 p-2 md:p-5">
        <div className="flex items-center gap-2">
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <HiMenu size={24} color="black" />
          </button>
          <Link to="/" className="flex gap-2 items-center">
            <img
              src="/vite.svg"
              alt="Furniro Logo"
              className="w-8 hidden md:block h-8"
            />
            <h1 className="text-black">Furniro</h1>
          </Link>
        </div>

        <div
          className={`md:flex items-center space-x-6 ${
            menuOpen ? "hidden" : "block"
          } md:space-x-6`}
        >
          {/* Regular Navigation Items */}
          <nav className="hidden md:flex space-x-16 text-black text-lg">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/contact">Contact</Link>
            {!loading && userDetails && userDetails.isAdmin && (
              <Link to="/admin">Admin</Link>
            )}
          </nav>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <button onClick={handleAccountClick}>
            <RiAccountPinCircleLine size={24} color="black" />
          </button>
          {showSearch ? (
            <form
              onSubmit={handleSearchSubmit}
              className="relative flex items-center"
            >
              <input
                type="text"
                placeholder="Search products, brands and category"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                ref={searchInputRef}
                className="p-2 pl-10 w-full border border-gray-300 rounded-xl"
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
              >
                <CiSearch size={20} color="gray" />
              </button>
            </form>
          ) : (
            <button onClick={toggleSearch}>
              <CiSearch size={24} color="black" />
            </button>
          )}
          <button>
            <CiHeart size={24} color="black" />
          </button>
          <Link to="/cart">
            <button>
              <IoIosCart size={24} color="black" />
            </button>
          </Link>
          {!loading && userDetails ? (
            <button className="text-white" onClick={handleLogout}>
              logout
            </button>
          ) : (
            <Link to="/login">
              <button>login</button>
            </Link>
          )}
        </div>

        {/* Sliding Menu for Small Devices */}
        <div
          className={`fixed top-0 left-0 h-full bg-slate-200 w-3/4 transform ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 z-50`}
        >
          <nav className="flex flex-col items-center justify-center h-full space-y-12 text-lg">
            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `p-2 rounded ${
                  isActive
                    ? "bg-blue-500 w-full text-center text-white"
                    : "text-black"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/shop"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `p-2 rounded ${
                  isActive
                    ? "bg-blue-500 w-full text-center text-white"
                    : "text-black"
                }`
              }
            >
              Shop
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `p-2 rounded ${
                  isActive
                    ? "bg-blue-500 w-full text-center text-white"
                    : "text-black"
                }`
              }
            >
              Contact
            </NavLink>
            {!loading && userDetails && userDetails.isAdmin && (
              <NavLink
                to="/admin"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `p-2 rounded ${
                    isActive
                      ? "bg-blue-500 w-full text-center text-white"
                      : "text-black"
                  }`
                }
              >
                Admin
              </NavLink>
            )}
            {!loading && userDetails ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <Link to="/login">
                <button>Login</button>
              </Link>
            )}
          </nav>
        </div>
        {/* For small devices: Only show Cart and Profile icons */}
        <div className="gap-4 flex md:hidden items-center justify-center mr-1">
          <button onClick={handleAccountClick}>
            <RiAccountPinCircleLine size={24} color="black" />
          </button>
          <Link to="/cart">
            <button>
              <IoIosCart size={24} color="black" />
            </button>
          </Link>
        </div>
      </section>

      {/* For small devices: Only show Search */}
      <section className="bg-slate-200 md:hidden w-full p-2">
        <div className="w-full px-4">
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex items-center w-full"
          >
            <input
              type="text"
              placeholder="Search products, brands and categories"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              ref={searchInputRef}
              className="p-2 pl-10 w-full text-md border border-gray-300 rounded-2xl"
            />
            <button
              type="submit"
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            >
              <CiSearch size={20} color="gray" />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default MainNavigation;
