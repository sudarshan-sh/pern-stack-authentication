import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AUTH_API } from "../config/api";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  // logout function
  const handleLogout = async () => {
    try {
      await axios.post(`${AUTH_API}/logout`);
      setUser(null);
      alert("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white font-bold text-xl">PERN Auth App</h1>
          <div>
            {user ? (
              <>
                <span className="text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                  Welcome, {user.name}
                </span>
                <button
                  onClick={() => handleLogout()}
                  className="bg-red-500 text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
