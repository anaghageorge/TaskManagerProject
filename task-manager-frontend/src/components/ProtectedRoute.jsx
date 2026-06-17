import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // Guard: If not logged in, force-redirect straight to the login screen
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;