'use client';

import { useState, type ReactNode } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Container } from '@/ui';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import {
  // Settings, 
  // Calendar1, 
  Archive,
  House,
  // ListTodo,
  Cat
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: House },
  // { href: '/dashboard/tasks', label: 'Tasks', icon: ListTodo },
  // { href: '/dashboard/calendar', label: 'Calendar', icon: Calendar1 },
  // { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  { href: '/dashboard/archive', label: 'Archive', icon: Archive },
  { href: '/dashboard/ui', label: 'UI Kit', icon: Cat },
];

interface DashboardShellProps {
  children: ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const router = useRouter();

const handleLogout = async () => {
  await signOut(auth);
  router.replace('/login');
};

  return (
    <Container
      fullHeight
      direction="row"
      className="bg-bg text-fg h-screen overflow-hidden"
    >
      {/* LEFT COLUMN – sidebar */}
      <Sidebar isOpen={sidebarOpen} menuData={navItems} onLogout={handleLogout}/>

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
          <div className="flex items-center justify-center  px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </div>
      </Container>
    </Container>
  );
}