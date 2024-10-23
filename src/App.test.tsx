import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("renders without tasks initially", () => {
    render(<App />);
    const itemsLeftElement = screen.getByText(/0 items left/i);
    expect(itemsLeftElement).toBeInTheDocument();
  });

  test("adds a new task", () => {
    render(<App />);

    const inputElement = screen.getByPlaceholderText(/What needs to be done/i);
    const addButton = screen.getByRole("button", { name: /add/i });

    fireEvent.change(inputElement, { target: { value: "New Task" } });
    fireEvent.click(addButton);

    const taskElement = screen.getByText("New Task");
    expect(taskElement).toBeInTheDocument();

    const itemsLeftElement = screen.getByText(/1/i);
    expect(itemsLeftElement).toBeInTheDocument();
  });

  test("toggles task completion", () => {
    render(<App />);

    const inputElement = screen.getByPlaceholderText(/What needs to be done/i);
    const addButton = screen.getByRole("button", { name: /add/i });

    fireEvent.change(inputElement, { target: { value: "New Task" } });
    fireEvent.click(addButton);

    const taskElement = screen.getByText("New Task");
    const taskCircle = screen.getByTestId("task-circle");
    fireEvent.click(taskCircle);

    expect(taskElement).toHaveClass("task-completed");

    const itemsLeftElement = screen.getByText(/0/i);
    expect(itemsLeftElement).toBeInTheDocument();
  });

  test("clears completed tasks", () => {
    render(<App />);

    const inputElement = screen.getByPlaceholderText(/What needs to be done/i);
    const addButton = screen.getByRole("button", { name: /add/i });

    fireEvent.change(inputElement, { target: { value: "Task 1" } });
    fireEvent.click(addButton);

    const task1 = screen.getByText("Task 1");
    const taskCircle = screen.getByTestId("task-circle");
    fireEvent.click(taskCircle);

    const clearCompletedButton = screen.getByText("Clear completed");
    fireEvent.click(clearCompletedButton);

    expect(task1).not.toBeInTheDocument();

    const itemsLeftElement = screen.getByText(/0/i);
    expect(itemsLeftElement).toBeInTheDocument();
  });
});
