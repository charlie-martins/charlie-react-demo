// src/components/layout/DashboardShell.tsx
'use client';

import { useState, type ReactNode } from 'react';
import { Container } from '@/ui';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Settings, Calendar1, Archive, House, ListTodo, Cat  } from 'lucide-react';

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: House },
    { href: '/dashboard/tasks', label: 'Tasks', icon: ListTodo },
    { href: '/dashboard/archive', label: 'Archive', icon: Archive },
    { href: '/dashboard/calendar', label: 'Calendar', icon: Calendar1 },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings },
    { href: '/dashboard/ui', label: 'UI Kit', icon: Cat },
  ];

interface DashboardShellProps {
  children: ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <Container
      fullHeight
      direction="row"
      className="bg-bg text-fg h-screen overflow-hidden"
    >
      {/* LEFT COLUMN – sidebar */}
      <Sidebar isOpen={sidebarOpen} menuData={navItems} />

      {/* RIGHT COLUMN – header + scrollable content */}
      <Container
        direction="column"
        className="flex-1 min-w-0 h-full"
      >
        <Header
          toggleSidebar={toggleSidebar}
          sidebarOpen={sidebarOpen}
        />

        {/* SCROLLABLE CONTENT ROW */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-4">
            {children}
          </div>
        </div>
      </Container>
    </Container>
  );
}