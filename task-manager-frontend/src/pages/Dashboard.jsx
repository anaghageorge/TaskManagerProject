import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../services/axiosInstance";
import toast from "react-hot-toast";

function Dashboard() {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState({ total: 0, pending: 0, completed: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await axiosInstance.get("/api/tasks");
        const allTasks = res.data;
        
        // Calculate live statistics on the fly
        const total = allTasks.length;
        const completed = allTasks.filter(t => t.status === "completed").length;
        const pending = total - completed;
        
        setMetrics({ total, pending, completed });
      } catch (err) {
        console.error("Error loading metrics:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  // Theme Core Color Styles
  const pageContainerStyle = {
    padding: "40px 20px",
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    backgroundColor: "#f8fafc", // Modern ultra-light slate background
    minHeight: "calc(100vh - 56px)",
    color: "#1e293b"
  };

  const welcomeHeroStyle = {
    background: "linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)", // High-end blue/purple gradient
    padding: "35px",
    borderRadius: "16px",
    color: "white",
    marginBottom: "35px",
    boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.2)"
  };

  const gridContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "40px"
  };

  const cardBaseStyle = {
    padding: "24px",
    borderRadius: "12px",
    backgroundColor: "#fff",
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  };

  const actionLinkStyle = {
    display: "inline-block",
    padding: "12px 24px",
    backgroundColor: "#4f46e5",
    color: "white",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "600",
    boxShadow: "0 4px 6px -1px rgba(79, 70, 229, 0.2)",
    transition: "all 0.2s ease"
  };

  return (
    <div style={pageContainerStyle}>
      {/* 🌟 PREMIUM HERO BANNER ENTRY */}
      <div style={welcomeHeroStyle}>
        <h1 style={{ margin: "0 0 8px 0", fontSize: "28px", fontWeight: "700" }}>
          Welcome back, {user?.name || "Developer"}! 👋
        </h1>
        <p style={{ margin: 0, opacity: "0.9", fontSize: "16px" }}>
          Here is a quick breakdown of your productivity stream for today.
        </p>
      </div>

      {/* 📊 DYNAMIC STATS CARD ROW */}
      <h3 style={{ fontSize: "18px", color: "#64748b", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "15px" }}>
        Workspace Metrics
      </h3>
      
      <div style={gridContainerStyle}>
        {/* Total Tasks Card */}
        <div style={{ ...cardBaseStyle, borderTop: "5px solid #3b82f6" }}>
          <span style={{ color: "#64748b", fontSize: "14px", fontWeight: "600" }}>Total Logged</span>
          <h2 style={{ fontSize: "36px", margin: "10px 0 0 0", color: "#1e293b" }}>
            {loading ? "..." : metrics.total}
          </h2>
        </div>

        {/* Pending Card */}
        <div style={{ ...cardBaseStyle, borderTop: "5px solid #f59e0b" }}>
          <span style={{ color: "#64748b", fontSize: "14px", fontWeight: "600" }}>In Progress ⏳</span>
          <h2 style={{ fontSize: "36px", margin: "10px 0 0 0", color: "#d97706" }}>
            {loading ? "..." : metrics.pending}
          </h2>
        </div>

        {/* Completed Card */}
        <div style={{ ...cardBaseStyle, borderTop: "5px solid #10b981" }}>
          <span style={{ color: "#64748b", fontSize: "14px", fontWeight: "600" }}>Completed ✅</span>
          <h2 style={{ fontSize: "36px", margin: "10px 0 0 0", color: "#059669" }}>
            {loading ? "..." : metrics.completed}
          </h2>
        </div>
      </div>

      {/* 🚀 QUICK ACTION COMPONENT PANEL */}
      <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)" }}>
        <h3 style={{ margin: "0 0 10px 0", fontSize: "20px" }}>Ready to organize your agenda?</h3>
        <p style={{ color: "#64748b", margin: "0 0 20px 0", fontSize: "15px" }}>
          Open your live workspace to append custom descriptions, modify tracking urgency states, or clean out archive items.
        </p>
        <Link to="/tasks" style={actionLinkStyle}>
          Go to Task Workspace →
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;