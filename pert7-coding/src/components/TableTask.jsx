import React, { useEffect, useState } from "react";
import Button from "./common/Button";
import axios from "axios";

export const TableTask = () => {
  const [tasks, setTasks] = useState([]);

  // Mendapatkan data dari API dan menyimpannya dalam state
  useEffect(() => {
    const getTasks = async () => {
      try {
        const res = await axios.get("http://localhost:8000"); // pastikan endpoint sesuai
        setTasks(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };
    getTasks();
  }, []);

  // Fungsi untuk memperbarui task menjadi complete
  const updateTask = async (taskId) => {
    try {
      const res = await fetch("http://localhost:8000", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: taskId }), // update status
      });
      const data = await res.json();
      window.location.reload();
      console.log(data);

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: "completed" } : task
        )
      );
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  // Fungsi untuk menghapus task
  const deleteTask = async (taskId) => {
    try {
      const res = await fetch("http://localhost:8000", {
        method: "DELETE",
        body: JSON.stringify({ id: taskId }),
      });
      const data = await res.json();
      console.log(data);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <table className="w-full table-auto border-collapse">
      <thead className="bg-gray-200">
        <tr className="text-center">
          <th className="border px-4 py-2 border-slate-400">ID</th>
          <th className="border px-4 py-2 border-slate-400">Task</th>
          <th className="border px-4 py-2 border-slate-400">Status</th>
          <th className="border px-4 py-2 border-slate-400">Action</th>
        </tr>
      </thead>
      <tbody>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <tr className="text-center" key={task.id}>
              <td className="border px-4 py-2 border-slate-400">{task.id}</td>
              <td className="border px-4 py-2 border-slate-400">{task.task}</td>
              <td className="border px-4 py-2 border-slate-400">
                {task.completed ? "completed" : "incomplete"}
              </td>
              <td className="flex gap-3 justify-center border border-slate-400 h-full">
                <Button
                  className={"bg-green-500 w-fit"}
                  onClick={() => updateTask(task.id)}
                >
                  Complete
                </Button>
                <Button
                  className={"bg-red-500 w-fit"}
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan="4"
              className="text-center py-4 border border-slate-400"
            >
              No tasks available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
