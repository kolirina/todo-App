import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskItem from "./TaskItem";

describe("TaskItem", () => {
  const task = {
    id: 1,
    title: "Test Task",
    completed: false,
  };

  const onToggleMock = jest.fn();

  test("should render task title", () => {
    render(
      <TaskItem
        id={task.id}
        title={task.title}
        completed={task.completed}
        onToggle={onToggleMock}
      />
    );

    const titleElement = screen.getByText(task.title);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass("task-title");
  });

  test("should render completed task with checkmark", () => {
    render(
      <TaskItem
        id={task.id}
        title={task.title}
        completed={true}
        onToggle={onToggleMock}
      />
    );

    const checkmarkElement = screen.getByText("✔");
    expect(checkmarkElement).toBeInTheDocument();
    expect(checkmarkElement).toHaveClass("checkmark");

    const titleElement = screen.getByText(task.title);
    expect(titleElement).toHaveClass("task-completed");
  });
});
