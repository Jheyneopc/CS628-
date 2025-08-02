import React, { useState } from "react";
import ToDoForm from "./ToDoForm";
import ToDoList from "./ToDoList";

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (taskText) => {
    if (taskText.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: taskText,
    };

    setTasks([...tasks, newTask]);
  };

  const deleteTask = (taskId) => {
    const filtered = tasks.filter((task) => task.id !== taskId);
    setTasks(filtered);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>ToDo List App</h1>
      <ToDoForm onAddTask={addTask} />
      <ToDoList tasks={tasks} onDelete={deleteTask} />
    </div>
  );
}

const styles = {
  container: {
    width: "400px",
    margin: "40px auto",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    marginBottom: "20px",
  },
};

export default App;
