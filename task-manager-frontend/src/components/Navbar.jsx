import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#343a40",
    color: "white",
    fontFamily: "sans-serif"
  };

  const linkStyle = {
    color: "#f8f9fa",
    textDecoration: "none",
    marginRight: "15px",
    fontWeight: "500"
  };

  // Safe check to extract the initial character of the user's registration profile name
  const getInitials = () => {
    if (!user || !user.name) return "?";
    return user.name.charAt(0).toUpperCase();
  };

  return (
    <nav style={navStyle}>
      <h3 style={{ margin: 0 }}>🚀 TaskManager</h3>
      <div style={{ display: "flex", alignItems: "center" }}>
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
            <Link to="/tasks" style={linkStyle}>My Tasks</Link>
            
            {/* 👤 DYNAMIC USER AVATAR BADGE */}
            <div style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              backgroundColor: "#007bff",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              marginRight: "15px",
              fontSize: "14px"
            }} title={user?.email || "User Profile"}>
              {getInitials()}
            </div>

            <button 
              onClick={logout} 
              style={{ backgroundColor: "#dc3545", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/register" style={linkStyle}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;