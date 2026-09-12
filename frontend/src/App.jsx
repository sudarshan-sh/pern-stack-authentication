import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import axios from "axios";
import { AUTH_API } from "./config/api";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";

axios.defaults.withCredentials = true;

function App() {
  const [user, setUser] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${AUTH_API}/me`);
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute user={user}>
              <Home user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login setUser={setUser} />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Signup setUser={setUser} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
