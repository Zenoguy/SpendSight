import React, { useState } from 'react';
import { Tier } from './types';
import { ThemeProvider } from './contexts/ThemeContext';
import { Sidebar } from './components/Sidebar';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { UploadStatement } from './components/UploadStatement';
import { Insights } from './components/Insights';
import { Pricing } from './components/Pricing';
import { Settings } from './components/Settings';
import { Login } from './components/Login';
import { Signup } from './components/Signup';

function App() {
  const [selectedTier, setSelectedTier] = useState<Tier>('free');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleSignup = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab('dashboard');
  };

  if (!isAuthenticated) {
    if (authMode === 'login') {
      return (
        <Login 
          onLogin={handleLogin}
          onSwitchToSignup={() => setAuthMode('signup')}
        />
      );
    } else {
      return (
        <Signup 
          onSignup={handleSignup}
          onSwitchToLogin={() => setAuthMode('login')}
        />
      );
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard selectedTier={selectedTier} />;
      case 'upload':
        return <UploadStatement selectedTier={selectedTier} />;
      case 'insights':
        return <Insights selectedTier={selectedTier} />;
      case 'pricing':
        return <Pricing selectedTier={selectedTier} onTierChange={setSelectedTier} />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard selectedTier={selectedTier} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
        <Sidebar selectedTier={selectedTier} onLogout={handleLogout} />
        <div className="flex-1 flex flex-col">
          <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
          <main className="flex-1 overflow-y-auto">
            {renderContent()}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;