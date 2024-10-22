import React, { useState } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [nextId, setNextId] = useState(1);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all"); // Фильтр задач

  const addTask = (title: string) => {
    if (title) {
      setTasks([...tasks, { id: nextId, title, completed: false }]);
      setNextId(nextId + 1);
    }
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const filteredTasks =
    filter === "active"
      ? tasks.filter((task) => !task.completed)
      : filter === "completed"
      ? tasks.filter((task) => task.completed)
      : tasks;

  const activeTaskCount = tasks.filter((task) => !task.completed).length;

  return (
    <div className="container">
      <div className="title">todos</div>
      <div className="inputListFilters">
        <TaskInput addTask={addTask} />
        <TaskList tasks={filteredTasks} onToggle={toggleTask} />

        <div className="footer">
          <span className="itemsLeft">{activeTaskCount} items left</span>
          <div className="filterButtons">
            <button
              onClick={() => setFilter("all")}
              className={filter === "all" ? "active" : ""}
            >
              All
            </button>
            <button
              onClick={() => setFilter("active")}
              className={filter === "active" ? "active" : ""}
            >
              Active
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={filter === "completed" ? "active" : ""}
            >
              Completed
            </button>
          </div>

          <button onClick={clearCompleted}>Clear completed</button>
        </div>
      </div>
      <div className="paper-sheet sheet-1"></div>
      <div className="paper-sheet sheet-2"></div>
    </div>
  );
};

export default App;
