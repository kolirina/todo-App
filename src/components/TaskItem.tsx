// src/components/TaskItem.tsx
import React from "react";

interface TaskItemProps {
  id: number;
  title: string;
  completed: boolean;
  onToggle: (id: number) => void; // Функция для переключения состояния
}

const TaskItem: React.FC<TaskItemProps> = ({
  id,
  title,
  completed,
  onToggle,
}) => {
  return (
    <div className={`task-item ${completed ? "completed" : ""}`}>
      <div className="task-circle" onClick={() => onToggle(id)}>
        {completed && <span className="checkmark">✔</span>}{" "}
      </div>
      <span className={`task-title ${completed ? "task-completed" : ""}`}>
        {title}
      </span>
    </div>
  );
};
export default TaskItem;
