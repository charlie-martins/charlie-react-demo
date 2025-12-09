import { PanelLeftOpen, PanelLeftClose } from 'lucide-react';
import {Container, Button} from '@/ui';

interface HeaderProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

export const Header = ({ toggleSidebar, sidebarOpen }: HeaderProps) => {
  const label = sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar';

  return (
    <Container className="shrink-0 shadow-xs bg-surface/80 backdrop-blur-sm flex h-14 px-3 items-start justify-around">
      <Button
        onClick={toggleSidebar}
        plain
        icon={
          sidebarOpen ? (
            <PanelLeftClose className="h-6 w-6" aria-hidden="true" />
          ) : (
            <PanelLeftOpen className="h-6 w-6" aria-hidden="true" />
          )
        }
        iconOnly
        soft
        aria-label={label}
      />
      {/* Right side of header (title, user menu, etc.) can go here later */}
    </Container>
  );
};