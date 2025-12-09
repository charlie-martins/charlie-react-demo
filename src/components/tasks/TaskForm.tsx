// src/components/tasks/TaskForm.tsx
'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { Card, Container, Input, Button } from '@/ui';
import { Plus } from 'lucide-react';

interface TaskFormValues {
  title: string;
  description: string;
}

interface TaskFormProps {
  initialValues?: Partial<TaskFormValues>;
  onSubmit: (values: TaskFormValues) => void;
  submitLabel?: string;
  isSubmitting?: boolean;
}

export function TaskForm({
  initialValues,
  onSubmit,
  submitLabel = 'Add task',
  isSubmitting = false,
}: TaskFormProps) {
  const [title, setTitle] = useState(initialValues?.title ?? '');
  const [description, setDescription] = useState(
    initialValues?.description ?? ''
  );
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle) {
      return;
    }

    onSubmit({
      title: trimmedTitle,
      description: trimmedDescription,
    });

    // You can decide later if this should clear fields or not
    // setTitle('');
    // setDescription('');
  };

  const disabled = isSubmitting;

  return (
    <Card className="w-full max-w-xl">
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Simple mode: title + add icon inline */}
        <Container direction="row" className="items-end gap-2">
          <div className="flex-1">
            <Input
              label="Title"
              name="title"
              placeholder="e.g. Ship the mango demo"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={disabled}
            />
          </div>

          <Button
            type="submit"
            primary
            icon={<Plus className="h-4 w-4" />}
            iconOnly
            aria-label={submitLabel}
            disabled={disabled}
          />
        </Container>

        {/* Advanced toggle */}
        <Container
          direction="row"
          className="items-center justify-between"
        >
          <Button
            type="button"
            text
            soft
            label={showAdvanced ? 'Hide advanced' : 'Advanced'}
            onClick={() => setShowAdvanced((prev) => !prev)}
          />
        </Container>

        {/* Advanced section */}
        {showAdvanced && (
          <Container direction="column" className="space-y-1">
            <label htmlFor="description" className="ui-input-label">
              Description
            </label>
            <div className="relative">
              <textarea
                id="description"
                name="description"
                placeholder="Optional details about this task"
                className="ui-input min-h-[80px] resize-none p-4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={disabled}
                maxLength={400}
              />
            </div>

          </Container>
        )}
      </form>
    </Card>
  );
}