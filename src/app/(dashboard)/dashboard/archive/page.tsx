"use client";

import { Container } from "@/ui";
import { TaskList } from "@/components/tasks/TaskList";
import { useTasks } from "@/hooks/useTasks";

export default function ArchivePage() {
  const { archivedTasks, toggleComplete, unarchiveTask, deleteTask } =
    useTasks();

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
