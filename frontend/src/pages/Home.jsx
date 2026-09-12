import React from "react";

const Home = ({ user }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-10">
        Welcome to the PERN Auth App!
      </h1>
      {user && (
        <p className="text-center text-gray-600 mt-4">
          Hello, {user.name}! You are logged in.
        </p>
      )}
    </div>
  );
};

export default Home;
