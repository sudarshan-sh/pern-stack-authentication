const Home = ({ user }) => {
  return (
    <div>
      {user && (
        <p className="text-2xl text-center mt-4">
          Hello, {user.name}! Welcome back to the PERN Auth App.
        </p>
      )}
    </div>
  );
};

export default Home;
