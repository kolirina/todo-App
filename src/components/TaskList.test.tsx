import React from "react";
import { render, screen } from "@testing-library/react";
import TaskList from "./TaskList";
import "@testing-library/jest-dom/extend-expect";

describe("TaskList", () => {
  const tasks = [
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: true },
    { id: 3, title: "Task 3", completed: false },
  ];

  const mockOnToggle = jest.fn();

  test("renders a list of tasks", () => {
    render(<TaskList tasks={tasks} onToggle={mockOnToggle} />);

    tasks.forEach((task) => {
      expect(screen.getByText(task.title)).toBeInTheDocument();
    });
  });

  test("applies the task-completed class to completed tasks", () => {
    render(<TaskList tasks={tasks} onToggle={mockOnToggle} />);

    const completedTask = screen.getByText("Task 2");
    expect(completedTask).toHaveClass("task-completed");
  });

  test("does not apply the task-completed class to active tasks", () => {
    render(<TaskList tasks={tasks} onToggle={mockOnToggle} />);

    const activeTask1 = screen.getByText("Task 1");
    const activeTask2 = screen.getByText("Task 3");

    expect(activeTask1).not.toHaveClass("task-completed");
    expect(activeTask2).not.toHaveClass("task-completed");
  });
});
