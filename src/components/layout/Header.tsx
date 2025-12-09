import { PanelLeftOpen, PanelLeftClose } from 'lucide-react';
import {Container, Button} from '@/ui';
import { useAuth } from '@/lib/AuthContext';

interface HeaderProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

export const Header = ({ toggleSidebar, sidebarOpen }: HeaderProps) => {
  const { user } = useAuth();
  const displayName = user?.displayName || 'User';
  const label = sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar';

  return (
    <Container className="shrink-0 shadow-xs bg-surface/80 backdrop-blur-sm flex flex-row h-14 px-3 items-center gap-4">
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
      <span>Hello, {displayName}</span>
    </Container>
  );
};