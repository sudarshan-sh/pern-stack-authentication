import React from "react";

const Navbar = () => {
  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-xl">MyApp</div>
          <div>
            <a
              href="/"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              disabled={window.location.pathname === "/"}
            >
              Home
            </a>
            <a
              href="/login"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              disabled={window.location.pathname === "/login"}
            >
              Login
            </a>
            <a
              href="/register"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              disabled={window.location.pathname === "/register"}
            >
              Register
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
