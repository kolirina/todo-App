import React, { useState } from "react";

interface TaskInputProps {
  addTask: (task: string) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ addTask }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && inputValue.trim()) {
      addTask(inputValue.trim());
      setInputValue("");
    }
  };

  const handleClick = () => {
    if (inputValue.trim()) {
      addTask(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <div className="task-input-container">
      <div className="checkbox"></div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder="✓  What needs to be done?"
        className="task-input"
      />
      <button
        onClick={handleClick}
        className="add-button"
        disabled={!inputValue.trim()}
      >
        Add
      </button>
    </div>
  );
};

export default TaskInput;
