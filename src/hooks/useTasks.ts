"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import type { Task, TaskStatus, NewTaskInput } from "@/types/Task";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/AuthContext";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

const deriveStatus = (completed: boolean, archived: boolean): TaskStatus => {
  if (archived) return "archived";
  if (completed) return "completed";
  return "active";
};

export const useTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);

  // Subscribe to this user's tasks
  useEffect(() => {
    if (!user) return;

    const tasksRef = collection(db, "tasks");
    const q = query(tasksRef, where("userId", "==", user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const nextTasks: Task[] = snapshot.docs.map((docSnap) => {
        const data = docSnap.data() as Record<string, unknown>;

        return {
          id: docSnap.id,
          title: (data.title as string) ?? "",
          description: (data.description as string) ?? "",
          completed: (data.completed as boolean) ?? false,
          archived: (data.archived as boolean) ?? false,
          status:
            (data.status as TaskStatus | undefined) ??
            deriveStatus(
              (data.completed as boolean) ?? false,
              (data.archived as boolean) ?? false,
            ),
          createdAt: (data.createdAt as string) ?? "",
          updatedAt: (data.updatedAt as string | undefined) ?? undefined,
          dueDate: (data.dueDate as string | null | undefined) ?? undefined,
        };
      });

      setTasks(nextTasks);
    });

    return unsubscribe;
  }, [user]);

  // CRUD actions

  const addTask = useCallback(
    async (input: NewTaskInput) => {
      if (!user) return;

      const now = new Date().toISOString();

      await addDoc(collection(db, "tasks"), {
        userId: user.uid,
        title: input.title,
        description: input.description ?? "",
        completed: false,
        archived: false,
        status: "active",
        createdAt: now,
        updatedAt: now,
        dueDate: input.dueDate ?? null,
      });
    },
    [user],
  );

  const toggleComplete = useCallback(
    async (id: string) => {
      const task = tasks.find((t) => t.id === id);
      if (!task) return;

      const completed = !task.completed;
      const status = deriveStatus(completed, task.archived);

      await updateDoc(doc(db, "tasks", id), {
        completed,
        status,
        updatedAt: new Date().toISOString(),
      });
    },
    [tasks],
  );

  const archiveTask = useCallback(
    async (id: string) => {
      const task = tasks.find((t) => t.id === id);
      if (!task) return;

      const archived = true;
      const status = deriveStatus(task.completed, archived);

      await updateDoc(doc(db, "tasks", id), {
        archived,
        status,
        updatedAt: new Date().toISOString(),
      });
    },
    [tasks],
  );

  const unarchiveTask = useCallback(
    async (id: string) => {
      const task = tasks.find((t) => t.id === id);
      if (!task) return;

      const archived = false;
      const status = deriveStatus(task.completed, archived);

      await updateDoc(doc(db, "tasks", id), {
        archived,
        status,
        updatedAt: new Date().toISOString(),
      });
    },
    [tasks],
  );

  const deleteTask = useCallback(async (id: string) => {
    await deleteDoc(doc(db, "tasks", id));
  }, []);

  // Handy slices
  const activeTasks = useMemo(() => tasks.filter((t) => !t.archived), [tasks]);

  const archivedTasks = useMemo(() => tasks.filter((t) => t.archived), [tasks]);

  return {
    user,
    tasks,
    activeTasks,
    archivedTasks,
    addTask,
    toggleComplete,
    archiveTask,
    unarchiveTask,
    deleteTask,
  };
};
