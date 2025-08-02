import React, { useState } from "react";

function ToDoForm({ onAddTask }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter task description"
        style={{ padding: "8px", width: "70%", marginRight: "10px" }}
      />
      <button type="submit" style={{ padding: "8px 16px", background: "#007bff", color: "#fff", border: "none" }}>
        Add Task
      </button>
    </form>
  );
}

export default ToDoForm;
