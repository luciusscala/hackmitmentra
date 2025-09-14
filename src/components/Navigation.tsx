import { Button } from '@/components/ui/button';
import { Library, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const navigate = useNavigate();

  const tabs = [
    { id: 'library', label: 'Library', icon: Zap, route: '/DashboardPage' },
    
  ];

  return (
    <nav className="glass-card p-4 md:p-6 mb-8">
      <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
  key={tab.id}
  variant={activeTab === tab.id ? 'default' : 'ghost'}
  className={`nav-tab ${activeTab === tab.id ? 'active' : ''} hover-glow text-xs md:text-sm px-3 py-2 md:px-6 md:py-3`}
  onClick={() => {
    onTabChange(tab.id);   // <-- update active tab
    navigate(tab.route);   // <-- navigate to route
  }}
>
  <Icon className="w-4 h-4 md:w-5 md:h-5 md:mr-2" />
  <span className="hidden sm:inline">{tab.label}</span>
</Button>
            
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;




