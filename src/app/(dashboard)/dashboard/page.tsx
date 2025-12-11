"use client";

import { TaskForm } from "@/components/tasks/TaskForm";
import { TaskList } from "@/components/tasks/TaskList";
import { useTasks } from "@/hooks/useTasks";

export default function DashboardPage() {
  const { activeTasks, addTask, toggleComplete, archiveTask, deleteTask } =
    useTasks();

  return (
    <>
      <TaskForm onSubmit={addTask} submitLabel="Add task" />

      <TaskList
        tasks={activeTasks}
        onToggleComplete={toggleComplete}
        onEdit={(id) => console.log("Edit task", id)}
        onArchive={archiveTask}
        onDelete={deleteTask}
      />
    </>
  );
}
