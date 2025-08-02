import React from "react";

function ToDoList({ tasks, onDelete }) {
  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} style={styles.task}>
          <span>{task.text}</span>
          <button onClick={() => onDelete(task.id)} style={styles.deleteBtn}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

const styles = {
  task: {
    background: "#f4f4f4",
    margin: "8px 0",
    padding: "10px",
    borderRadius: "4px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteBtn: {
    background: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
  },
};

export default ToDoList;
