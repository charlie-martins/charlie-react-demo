"use client";

import { Container } from "@/ui";
import { TaskForm } from "@/components/tasks/TaskForm";
import { TaskList } from "@/components/tasks/TaskList";
import { useTasks } from "@/hooks/useTasks";

export default function DashboardPage() {
  const {
    user,
    activeTasks,
    addTask,
    toggleComplete,
    archiveTask,
    deleteTask,
  } = useTasks();

  if (!user) {
    return (
      <Container direction="column" className="w-xl gap-4">
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <p className="text-sm text-muted">Please sign in to see your tasks.</p>
      </Container>
    );
  }

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
