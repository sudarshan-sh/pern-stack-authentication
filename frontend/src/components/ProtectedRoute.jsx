import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ user, children }) => {
  const navigate = useNavigate();
  if (!user) {
    navigate("/login");
    return null;
  }
  return children;
};

export default ProtectedRoute;
