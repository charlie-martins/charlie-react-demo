import type { ReactNode } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/UI/ThemeToggle';

interface DashboardLayoutProps {
  children: ReactNode;
}

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/dashboard/tasks', label: 'Tasks' },
  { href: '/dashboard/archive', label: 'Archive' },
  { href: '/dashboard/calendar', label: 'Calendar' },
  { href: '/dashboard/settings', label: 'Settings' },
  { href: '/dashboard/ui', label: 'UI Kit' },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex bg-bg text-fg">
      {/* Sidebar */}
      <aside className="w-56 border-r border-border-subtle bg-surface px-4 py-3 flex flex-col gap-4">
        <div className="text-xs font-semibold tracking-wide uppercase text-muted">
          Demo
        </div>
        <nav className="space-y-1 text-xs">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-input px-2 py-1.5 hover:bg-surface/80"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main column */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-border-subtle bg-surface/80 backdrop-blur-sm px-4 py-2 flex items-center justify-between">
          <div className="text-xs font-medium text-muted">
            Demo Dashboard
          </div>

        </header>

        {/* Page content */}
        <main className="flex-1 p-4 flex justify-center">
          {children}
          <div className="absolute right-4 bottom-4">
            <ThemeToggle />
          </div>
        </main>
      </div>
    </div>
  );
}