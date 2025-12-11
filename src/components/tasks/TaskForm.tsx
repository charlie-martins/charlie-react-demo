// src/components/tasks/TaskForm.tsx
"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Card, Container, Input, Button } from "@/ui";
import { Plus } from "lucide-react";
import type { NewTaskInput } from "@/types/Task";

interface TaskFormProps {
  onSubmit: (values: NewTaskInput) => void;
  submitLabel?: string;
  isSubmitting?: boolean;
  initialValues?: Partial<NewTaskInput>;
}

export function TaskForm({
  onSubmit,
  submitLabel = "Add task",
  isSubmitting = false,
  initialValues,
}: TaskFormProps) {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [description, setDescription] = useState(
    initialValues?.description ?? "",
  );
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle) return;

    const payload: NewTaskInput = {
      title: trimmedTitle,
      description: trimmedDescription || undefined,
    };

    onSubmit(payload);

    // Reset simple path after submit
    setTitle("");
    setDescription("");
    setShowAdvanced(false);
  };

  const disabled = isSubmitting;

  return (
    <Card className="w-full">
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
            eventName="task_add_click"
            eventTags={["task_form"]}
          />
        </Container>

        {/* Advanced toggle */}
        <Container direction="row" className="items-center justify-between">
          <Button
            type="button"
            text
            soft
            label={showAdvanced ? "Hide advanced" : "Advanced"}
            onClick={() => setShowAdvanced((prev) => !prev)}
            eventName="task_form_toggle_advanced"
            eventTags={[
              "task_form",
              showAdvanced ? "hide_advanced" : "show_advanced",
            ]}
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
                className="ui-input min-h-[80px] resize-none p-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={disabled}
                maxLength={400}
              />
            </div>
            <p className="ui-input-helper">Max 400 characters.</p>
          </Container>
        )}
      </form>
    </Card>
  );
}
