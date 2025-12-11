"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useAuth } from "@/lib/AuthContext";
import { db } from "@/lib/firebaseClient";
import type { NewTaskInput, Task } from "@/types/Task";

type FirestoreTask = Omit<Task, "id" | "status"> & {
  status?: Task["status"]; // tolerate older records without status
};

const deriveStatus = (task: FirestoreTask): Task["status"] => {
  if (task.archived) return "archived";
  if (task.completed) return "completed";
  return task.status ?? "active";
};

export function useTasks() {
  const { user, loading: authLoading } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksLoading, setTasksLoading] = useState(false);

  // Subscribe to the user's tasks collection
  useEffect(() => {
    if (!user) {
      setTasks([]);
      return undefined;
    }

    setTasksLoading(true);
    const tasksRef = collection(db, "users", user.uid, "tasks");
    const q = query(tasksRef, orderBy("createdAt", "asc"));

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const next: Task[] = snapshot.docs.map((docSnap) => {
          const data = docSnap.data() as FirestoreTask;
          return {
            id: docSnap.id,
            title: data.title,
            description: data.description,
            completed: data.completed ?? false,
            archived: data.archived ?? false,
            status: deriveStatus(data),
            createdAt: data.createdAt ?? "",
            updatedAt: data.updatedAt,
            dueDate: data.dueDate ?? null,
          };
        });
        setTasks(next);
        setTasksLoading(false);
      },
      (error) => {
        console.error("Failed to load tasks", error);
        setTasks([]);
        setTasksLoading(false);
      },
    );

    return () => unsub();
  }, [user]);

  const addTask = useCallback(
    async (input: NewTaskInput) => {
      if (!user) return;
      const tasksRef = collection(db, "users", user.uid, "tasks");
      const now = new Date().toISOString();
      await addDoc(tasksRef, {
        title: input.title,
        description: input.description ?? null,
        completed: false,
        archived: false,
        status: "active",
        createdAt: now,
        updatedAt: now,
        dueDate: input.dueDate ?? null,
        _serverUpdated: serverTimestamp(),
      });
    },
    [user],
  );

  const toggleComplete = useCallback(
    async (id: string) => {
      if (!user) return;
      const target = doc(db, "users", user.uid, "tasks", id);
      const existing = tasks.find((t) => t.id === id);
      const nextCompleted = existing ? !existing.completed : true;
      const nextStatus = nextCompleted ? "completed" : "active";
      await updateDoc(target, {
        completed: nextCompleted,
        status: nextStatus,
        updatedAt: new Date().toISOString(),
        _serverUpdated: serverTimestamp(),
      });
    },
    [tasks, user],
  );

  const archiveTask = useCallback(
    async (id: string) => {
      if (!user) return;
      const target = doc(db, "users", user.uid, "tasks", id);
      await updateDoc(target, {
        archived: true,
        status: "archived",
        updatedAt: new Date().toISOString(),
        _serverUpdated: serverTimestamp(),
      });
    },
    [user],
  );

  const unarchiveTask = useCallback(
    async (id: string) => {
      if (!user) return;
      const target = doc(db, "users", user.uid, "tasks", id);
      const existing = tasks.find((t) => t.id === id);
      const nextStatus = existing?.completed ? "completed" : "active";
      await updateDoc(target, {
        archived: false,
        status: nextStatus,
        updatedAt: new Date().toISOString(),
        _serverUpdated: serverTimestamp(),
      });
    },
    [tasks, user],
  );

  const deleteTask = useCallback(
    async (id: string) => {
      if (!user) return;
      const target = doc(db, "users", user.uid, "tasks", id);
      await deleteDoc(target);
    },
    [user],
  );

  const activeTasks = useMemo(
    () => tasks.filter((task) => !task.archived),
    [tasks],
  );

  const archivedTasks = useMemo(
    () => tasks.filter((task) => task.archived),
    [tasks],
  );

  return {
    user,
    loading: authLoading || tasksLoading,
    tasks,
    activeTasks,
    archivedTasks,
    addTask,
    toggleComplete,
    archiveTask,
    unarchiveTask,
    deleteTask,
  };
}
