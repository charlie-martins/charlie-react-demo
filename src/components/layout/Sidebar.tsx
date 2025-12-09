// src/components/layout/Sidebar.tsx
import Link from 'next/link';
import clsx from 'clsx';
import { Container } from '@/ui';
import type { ComponentType, SVGProps } from 'react';
import { LogOut } from 'lucide-react';

type MenuItem = {
  href: string;
  label: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
};

interface SidebarProps {
  isOpen: boolean;
  menuData: MenuItem[];
  onLogout?: () => void;
}

export const Sidebar = ({ isOpen, menuData, onLogout }: SidebarProps) => {
  return (
    <Container
      className={clsx(
        'h-full bg-surface transition-[width] duration-200 ease-in-out overflow-hidden',
        'shrink-0 shadow-sm',
        isOpen ? 'w-56' : 'w-0'
      )}
    >
      <Container
        direction="column"
        className={clsx(
          'h-full py-3 gap-1',
          !isOpen && 'pointer-events-none'
        )}
      >
        {/* Top section: title + menu */}
        <Container direction="column" className="flex-1">
          <Container>
            <h2 className="text-lg font-semibold h-14 px-3">Demo</h2>
          </Container>

          {menuData.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center text-sm font-medium text-fg px-3 py-2 rounded-input hover:bg-surface/20"
              >
                {Icon && (
                  <Icon
                    className="inline-block mr-2 h-4 w-4"
                    aria-hidden="true"
                  />
                )}
                {item.label}
              </Link>
            );
          })}
        </Container>

        {/* Bottom section: logout */}
        <Container className="mt-auto px-3 pt-3 border-t border-border-subtle">
          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center text-sm font-medium text-fg px-2 py-2 rounded-input hover:bg-surface/20"
          >
            <LogOut
              className="inline-block mr-2 h-4 w-4"
              aria-hidden="true"
            />
            <span>Log out</span>
          </button>
        </Container>
      </Container>
    </Container>
  );
};