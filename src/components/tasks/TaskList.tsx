// src/components/tasks/TaskList.tsx
'use client';

import { useMemo } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { Button, Checkbox, Table, Card } from '@/ui';
import { Pencil, Archive, Trash2 } from 'lucide-react';
import type { Task } from '@/types/Task';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onEdit: (id: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskList({
  tasks,
  onToggleComplete,
  onEdit,
  onArchive,
  onDelete,
}: TaskListProps) {
  const columns = useMemo<ColumnDef<Task>[]>(
    () => [
      // Checkbox at start
      {
        id: 'select',
        header: () => null,
        cell: ({ row }) => (
          <Checkbox
            checked={row.original.completed}
            onChange={() => onToggleComplete(row.original.id)}
            aria-label="Mark task complete"
          />
        ),
        size: 32,
      },
      // Title
      {
        accessorKey: 'title',
        header: 'Title',
        cell: ({ row }) => {
          const task = row.original;
          return (
            <span
              className={
                task.completed ? 'line-through text-muted' : 'text-fg'
              }
            >
              {task.title}
            </span>
          );
        },
      },
      // Description
      {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => (
          <span className="text-xs text-muted">
            {row.original.description}
          </span>
        ),
      },
      // Actions at end
      {
        id: 'actions',
        header: () => null,
        cell: ({ row }) => {
          const task = row.original;
          return (
            <div className="flex items-center justify-end gap-1">
              <Button
                type="button"
                plain
                icon={<Pencil className="h-4 w-4" />}
                aria-label="Edit task"
                onClick={() => onEdit(task.id)}
              />
              <Button
                type="button"
                plain
                icon={<Archive className="h-4 w-4" />}
                aria-label="Archive task"
                onClick={() => onArchive(task.id)}
              />
              <Button
                type="button"
                plain
                text
                danger
                icon={<Trash2 className="h-4 w-4" />}
                aria-label="Delete task"
                onClick={() => onDelete(task.id)}
              />
            </div>
          );
        },
        size: 120,
      },
    ],
    [onToggleComplete, onEdit, onArchive, onDelete]
  );

  return (
    <Card>
      <Table<Task>
        data={tasks}
        columns={columns}
        filterColumnId="title"
        filterPlaceholder="Search tasks…"
        emptyMessage="No tasks yet. Add one above to get started."
      />
    </Card>
  );
}