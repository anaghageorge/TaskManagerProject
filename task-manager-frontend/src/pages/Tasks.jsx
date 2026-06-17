import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";
import toast from "react-hot-toast";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axiosInstance.get("/api/tasks");
        setTasks(res.data);
        setLoading(false);
      } catch (err) {
        toast.error("Failed to load your tasks from database. ❌");
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await axiosInstance.post("/api/tasks", { title, description, priority });
      setTasks([res.data, ...tasks]);
      setTitle("");
      setDescription("");
      setPriority("medium");
      toast.success("Task created successfully! 🎉");
    } catch (err) {
      toast.error("Could not save task. Check backend server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleComplete = async (id, currentStatus) => {
    const newStatus = currentStatus === "pending" ? "completed" : "pending";
    try {
      const res = await axiosInstance.put(`/api/tasks/${id}`, { status: newStatus });
      setTasks(tasks.map(task => task._id === id ? { ...task, status: res.data.status } : task));
      toast.success(newStatus === "completed" ? "Task marked complete! ✅" : "Task moved back to pending.");
    } catch (err) {
      toast.error("Failed to update status.");
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task? ⚠️")) {
      try {
        await axiosInstance.delete(`/api/tasks/${id}`);
        setTasks(tasks.filter(task => task._id !== id));
        toast.success("Task permanently deleted. 🗑️");
      } catch (err) {
        toast.error("Failed to delete task.");
      }
    }
  };

  const getPriorityStyle = (p) => {
    switch (p?.toLowerCase()) {
      case "high": 
        return { backgroundColor: "#dc3545", color: "white", padding: "4px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: "bold" };
      case "medium": 
        return { backgroundColor: "#ffc107", color: "#212529", padding: "4px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: "bold" };
      case "low": 
        return { backgroundColor: "#28a745", color: "white", padding: "4px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: "bold" };
      default: 
        return { backgroundColor: "#6c757d", color: "white", padding: "4px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: "bold" };
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "800px", margin: "0 auto" }}>
      <h2>📝 Task Workspace</h2>
      
      <div style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "8px", border: "1px solid #dee2e6", marginBottom: "30px" }}>
        <h3>➕ Add New Task</h3>
        <form onSubmit={handleAddTask}>
          <input type="text" placeholder="Task Title" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "4px", border: "1px solid #ccc" }} />
          <textarea placeholder="Task Description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "4px", border: "1px solid #ccc", height: "60px", resize: "none" }} />
          <div style={{ marginBottom: "15px" }}>
            <label style={{ marginRight: "10px" }}>Priority:</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)} style={{ padding: "6px", borderRadius: "4px" }}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <button type="submit" disabled={isSubmitting} style={{ backgroundColor: isSubmitting ? "#6c757d" : "#28a745", color: "white", border: "none", padding: "10px 15px", borderRadius: "4px", cursor: isSubmitting ? "not-allowed" : "pointer", fontWeight: "bold" }}>
            {isSubmitting ? "Creating Task..." : "Create Task"}
          </button>
        </form>
      </div>

      <hr />

      <h3>📋 My Live List</h3>
      {loading && <p style={{ color: "#007bff" }}>⏳ Loading backend records...</p>}
      {!loading && tasks.length === 0 && <p style={{ color: "#6c757d" }}>No tasks found yet.</p>}

      <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "15px" }}>
        {tasks.map((task) => (
          <div key={task._id} style={{ padding: "15px", borderRadius: "8px", backgroundColor: "#fff", borderLeft: task.status === "completed" ? "6px solid #28a745" : "6px solid #ffc107", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", border: "1px solid #dee2e6", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "15px" }}>
            <div style={{ flex: "1", minWidth: "250px" }}>
              <h4 style={{ margin: "0 0 5px 0", textDecoration: task.status === "completed" ? "line-through" : "none", color: task.status === "completed" ? "#6c757d" : "#000" }}>{task.title}</h4>
              <p style={{ color: "#495057", fontSize: "14px", margin: "0 0 10px 0" }}>{task.description || "No description provided."}</p>
              
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px" }}>
                <span style={{ fontSize: "11px", padding: "4px 8px", borderRadius: "4px", fontWeight: "bold", backgroundColor: task.status === "completed" ? "#e2f0d9" : "#fff3cd", color: task.status === "completed" ? "#2b5115" : "#856404" }}>
                  {task.status.toUpperCase()}
                </span>
                
                <span style={getPriorityStyle(task.priority)}>
                  {task.priority.toUpperCase()}
                </span>
              </div>
            </div>
            
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => handleToggleComplete(task._id, task.status)} style={{ backgroundColor: task.status === "completed" ? "#6c757d" : "#007bff", color: "white", border: "none", padding: "8px 12px", borderRadius: "4px", cursor: "pointer", fontSize: "12px" }}>
                {task.status === "completed" ? "Undo" : "Complete ✅"}
              </button>
              <button onClick={() => handleDeleteTask(task._id)} style={{ backgroundColor: "#dc3545", color: "white", border: "none", padding: "8px 12px", borderRadius: "4px", cursor: "pointer", fontSize: "12px" }}>
                Delete 🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;