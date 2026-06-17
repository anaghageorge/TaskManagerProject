import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import toast from "react-hot-toast";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await axiosInstance.post("/api/auth/register", { name, email, password });
      if (res.data.success) {
        toast.success("Account created successfully! Please log in. 🎉");
        navigate("/login");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed. Try a different email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Layout Styles
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
    flexWrap: "wrap",
    flexDirection: "row-reverse" // Flips the banner color side for visual flair!
  };

  const leftBanner = {
    flex: "1",
    minWidth: "300px",
    background: "linear-gradient(135deg, #ec4899 0%, #f43f5e 50%, #f97316 100%)", // Vibrant sunset register gradient
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
    margin: "6px 0 16px 0",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "15px",
    outline: "none",
    backgroundColor: "#f8fafc"
  };

  const btnStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#f43f5e",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "16px",
    cursor: isSubmitting ? "not-allowed" : "pointer",
    boxShadow: "0 4px 6px -1px rgba(244, 63, 94, 0.4)",
    marginTop: "10px"
  };

  return (
    <div style={pageWrapper}>
      <div style={cardStyle}>
        
        {/* Colorful Side Banner */}
        <div style={leftBanner}>
          <h2 style={{ fontSize: "32px", fontWeight: "800", margin: "0 0 10px 0" }}>Join Us!</h2>
          <p style={{ opacity: "0.9", lineHeight: "1.6" }}>Create your workspace dashboard record parameters to calculate processing status updates on the fly.</p>
        </div>

        {/* Input Processing Section */}
        <div style={rightForm}>
          <h2 style={{ margin: "0 0 5px 0", color: "#1e293b", fontWeight: "700" }}>Get Started</h2>
          <p style={{ color: "#64748b", margin: "0 0 25px 0", fontSize: "14px" }}>Set up your master credentials in just a few clicks.</p>
          
          <form onSubmit={handleRegister}>
            <label style={{ fontWeight: "600", color: "#475569", fontSize: "14px" }}>Full Name</label>
            <input type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required style={inputStyle} />

            <label style={{ fontWeight: "600", color: "#475569", fontSize: "14px" }}>Email Address</label>
            <input type="email" placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />

            <label style={{ fontWeight: "600", color: "#475569", fontSize: "14px" }}>Password</label>
            <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required style={inputStyle} />

            <button type="submit" disabled={isSubmitting} style={btnStyle}>
              {isSubmitting ? "Creating Profile..." : "Create Account →"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "25px", color: "#64748b", fontSize: "14px" }}>
            Already have an account? <Link to="/login" style={{ color: "#f43f5e", fontWeight: "600", textDecoration: "none" }}>Log in</Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Register;