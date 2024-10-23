import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskInput from "./TaskInput";

describe("TaskInput", () => {
  test("renders input field and button", () => {
    const addTaskMock = jest.fn();
    render(<TaskInput addTask={addTaskMock} />);

    const inputElement = screen.getByPlaceholderText(
      /What needs to be done/i
    ) as HTMLInputElement;
    const buttonElement = screen.getByText("Add");

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test("calls addTask function on button click", () => {
    const addTaskMock = jest.fn();
    render(<TaskInput addTask={addTaskMock} />);

    const inputElement = screen.getByPlaceholderText(
      /What needs to be done/i
    ) as HTMLInputElement;
    const buttonElement = screen.getByText("Add");

    fireEvent.change(inputElement, { target: { value: "New Task" } });
    fireEvent.click(buttonElement);

    expect(addTaskMock).toHaveBeenCalledWith("New Task");
    expect(inputElement.value).toBe("");
  });

  test("calls addTask function on Enter key press", () => {
    const addTaskMock = jest.fn();
    render(<TaskInput addTask={addTaskMock} />);

    const inputElement = screen.getByPlaceholderText(
      /what needs to be done/i
    ) as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: "New Task" } });
    fireEvent.keyPress(inputElement, { key: "Enter", charCode: 13 });

    expect(addTaskMock).toHaveBeenCalledWith("New Task");
    expect(inputElement.value).toBe("");
  });

  test("does not call addTask if input is empty", () => {
    const addTaskMock = jest.fn();
    render(<TaskInput addTask={addTaskMock} />);

    const inputElement = screen.getByPlaceholderText(
      /what needs to be done/i
    ) as HTMLInputElement;
    const buttonElement = screen.getByText("Add");

    fireEvent.click(buttonElement);
    expect(addTaskMock).not.toHaveBeenCalled();
  });
});
