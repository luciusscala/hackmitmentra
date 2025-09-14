import { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import Navigation from '@/components/Navigation';
import Dashboard from '@/components/Dashboard';
import VideoLibrary from '@/components/VideoLibrary';
import LiveStream from '@/components/LiveStream';
import MusicAI from '@/components/MusicAI';
import Settings from '@/components/Settings';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showHero, setShowHero] = useState(true);

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'library':
        return <VideoLibrary />;
      case 'live':
        return <LiveStream />;
      case 'music':
        return <MusicAI />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen animated-bg">
      {showHero && (
        <HeroSection />
      )}
      
      <div className="container mx-auto px-6 py-8">
        <Navigation 
          activeTab={activeTab} 
          onTabChange={(tab) => {
            console.log(`Tab changed to: ${tab}`);
            setActiveTab(tab);
            setShowHero(false);
          }}
        />
        
        <main className="fade-in-up">
          {renderActiveComponent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
