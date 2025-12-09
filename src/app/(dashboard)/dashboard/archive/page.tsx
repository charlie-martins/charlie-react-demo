"use client";

import { Container } from "@/ui";
import { TaskList } from "@/components/tasks/TaskList";
import { useTasks } from "@/hooks/useTasks";

export default function ArchivePage() {
  const { user, archivedTasks, toggleComplete, unarchiveTask, deleteTask } =
    useTasks();

  if (!user) {
    return (
      <Container direction="column" className="w-lg gap-4">
        <h1 className="text-lg font-semibold">Archive</h1>
        <p className="text-sm text-muted">
          Please sign in to see your archive.
        </p>
      </Container>
    );
  }

  return (
    <>
      <TaskList
        tasks={archivedTasks}
        onToggleComplete={toggleComplete}
        onEdit={(id) => console.log("Edit archived task", id)}
        onArchive={unarchiveTask} // same button, different meaning here
        onDelete={deleteTask}
      />
    </>
  );
}
