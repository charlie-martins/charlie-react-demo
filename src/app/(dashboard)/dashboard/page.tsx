'use client';

import { Search, Container } from "@/components/UI";
import { TaskForm } from "@/components/tasks/TaskForm";

export default function DashboardHome() {
  return (
    <div className="max-w-lg w-full gap-4 flex flex-col">



      <TaskForm
        onSubmit={(values) => {
          console.log('Submitted task:', values);
        }}
      />
            <Container>
        <Search />
      </Container>
    </div>
  );
}