import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await axiosInstance.post("/api/auth/login", { email, password });
      if (res.data.success) {
        login(res.data.token);
        toast.success("Welcome back! Login successful. 🚀");
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Modern Split Screen Styles
  const pageWrapper = {
    display: "flex",
    minHeight: "calc(100vh - 56px)",
    backgroundColor: "#f1f5f9",
    fontFamily: "'Segoe UI', Roboto, sans-serif",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px"
  };

  const cardStyle = {
    display: "flex",
    width: "850px",
    backgroundColor: "white",
    borderRadius: "16px",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    overflow: "hidden",
    flexWrap: "wrap"
  };

  const leftBanner = {
    flex: "1",
    minWidth: "300px",
    background: "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)", // Rich multi-color cosmic gradient
    padding: "40px",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  };

  const rightForm = {
    flex: "1.2",
    minWidth: "320px",
    padding: "45px 40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    margin: "8px 0 20px 0",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "15px",
    outline: "none",
    backgroundColor: "#f8fafc"
  };

  const btnStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#6366f1",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "16px",
    cursor: isSubmitting ? "not-allowed" : "pointer",
    boxShadow: "0 4px 6px -1px rgba(99, 102, 241, 0.4)",
    marginTop: "10px"
  };

  return (
    <div style={pageWrapper}>
      <div style={cardStyle}>
        
        {/* Colorful Left Brand Banner */}
        <div style={leftBanner}>
          <h2 style={{ fontSize: "32px", fontWeight: "800", margin: "0 0 10px 0" }}>TaskManager</h2>
          <p style={{ opacity: "0.9", lineHeight: "1.6" }}>Securely manage projects, compute statistics, and organize your daily work stream layout cleanly.</p>
        </div>

        {/* Form Interactive Processing Panel */}
        <div style={rightForm}>
          <h2 style={{ margin: "0 0 5px 0", color: "#1e293b", fontWeight: "700" }}>Account Login</h2>
          <p style={{ color: "#64748b", margin: "0 0 25px 0", fontSize: "14px" }}>Enter your registered email below to open your hub.</p>
          
          <form onSubmit={handleLogin}>
            <label style={{ fontWeight: "600", color: "#475569", fontSize: "14px" }}>Email Address</label>
            <input type="email" placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />

            <label style={{ fontWeight: "600", color: "#475569", fontSize: "14px" }}>Password</label>
            <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required style={inputStyle} />

            <button type="submit" disabled={isSubmitting} style={btnStyle}>
              {isSubmitting ? "Authenticating..." : "Sign In →"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "25px", color: "#64748b", fontSize: "14px" }}>
            Don't have an account? <Link to="/register" style={{ color: "#6366f1", fontWeight: "600", textDecoration: "none" }}>Register here</Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;