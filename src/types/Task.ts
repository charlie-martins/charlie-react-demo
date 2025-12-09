// src/types/Task.ts

export type TaskId = string;

export type TaskStatus = "active" | "completed" | "archived";

export interface Task {
  id: TaskId;

  /** Short title shown in lists and tables */
  title: string;

  /** Optional description (limited to 400 chars in the form) */
  description?: string;

  /** Completion flag (controls checkbox + strike-through) */
  completed: boolean;

  /** Archive flag (used to move tasks out of the main list) */
  archived: boolean;

  /** Status derived from the flags above if you want a single field */
  status: TaskStatus;

  /** ISO string timestamps so they play nicely with Firestore/JSON */
  createdAt: string;
  updatedAt?: string;

  /** Optional due date as ISO string; null when unset */
  dueDate?: string | null;
}

/**
 * Shape used when creating a new task from the UI before it has an id or timestamps.
 * This is what your TaskForm onSubmit can emit.
 */
export interface NewTaskInput {
  title: string;
  description?: string;
  dueDate?: string | null;
}
