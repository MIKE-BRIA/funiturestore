import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { IoIosCart } from "react-icons/io";
import useUserDetails from "../hooks/useUserDetails";

const MainNavigation = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
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

    navigate("/login");
  };

  return (
    <main>
      <section className="flex justify-between maxWidth-large bg-slate-200 p-5">
        <div>
          <Link to="/" className="flex gap-2">
            <img src="/vite.svg" alt="Furniro Logo" className="w-8 h-8" />
            <h1 className="text-black">Furniro</h1>
          </Link>
        </div>
        <div>
          <nav className="space-x-16 text-black text-lg">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            {/* <Link to="/about">About</Link> */}
            <Link to="/contact">Contact</Link>
            {/* Conditionally render Admin link if userDetails exists and isAdmin is true */}
            {!loading && userDetails && userDetails.isAdmin && (
              <Link to="/admin">Admin</Link>
            )}
          </nav>
        </div>
        <div className="space-x-6 flex items-center">
          <button onClick={handleAccountClick}>
            <RiAccountPinCircleLine size={24} color="black" />
          </button>

          {showSearch ? (
            <form
              onSubmit={handleSearchSubmit}
              className="ml-4 flex items-center"
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                ref={searchInputRef}
                className="p-2 w-64 border border-gray-300 rounded"
              />
              <button type="submit" className="hidden">
                Submit
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
      </section>
    </main>
  );
};

export default MainNavigation;
