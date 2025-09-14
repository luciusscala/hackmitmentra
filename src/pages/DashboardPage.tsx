import { useLocation } from 'react-router-dom';

import Navigation from '@/components/Navigation';

const DashboardPage = () => {
  const location = useLocation();

  // Derive tab from path
  const getActiveTab = () => {
    if (location.pathname.startsWith('/library')) return 'library';
    return 'dashboard';
  };

  return (
    <div>
      <Navigation activeTab={getActiveTab()} onTabChange={() => {}} />
      {/* Actual page content */}
    </div>
  );
};

export default DashboardPage;
