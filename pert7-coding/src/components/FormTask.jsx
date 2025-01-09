import React, { useState } from "react";
import Button from "./common/Button";

export const FormTask = () => {
  const [task, setTask] = useState({
    title: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // untuk mengelola loading state
  const [error, setError] = useState(null); // untuk mengelola error

  const handleAddTasks = async (e) => {
    e.preventDefault();

    if (!task.title) {
      setError("Task title is required!");
      return;
    }

    setIsSubmitting(true); // mulai proses submit
    setError(null); // reset error

    try {
      const res = await fetch("http://localhost:8000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: task.title }),
      });

      if (!res.ok) {
        throw new Error("Failed to add task");
      }

      const data = await res.json();
      window.location.reload();
      console.log(data);

      setTask({ title: "" }); // reset input form setelah sukses
    } catch (err) {
      console.error(err);
      setError(err.message || "An error occurred while adding the task.");
    } finally {
      setIsSubmitting(false); // selesai proses submit
    }
  };

  return (
    <form
      onSubmit={handleAddTasks}
      id="createTaskForm"
      className="mb-4 flex gap-3 items-center"
    >
      <input
        className="p-2 border-2 border-gray-400 rounded-lg flex-grow"
        type="text"
        id="taskInput"
        value={task.title}
        placeholder="Enter new task"
        onChange={(e) => setTask({ title: e.target.value })}
        required
      />

      <Button
        className="bg-blue-500 text-white p-2 w-32 rounded-md"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Adding..." : "Add Task"}
      </Button>

      {/* Menampilkan error jika ada */}
      {error && <p className="text-red-500 text-sm ml-2">{error}</p>}
    </form>
  );
};
