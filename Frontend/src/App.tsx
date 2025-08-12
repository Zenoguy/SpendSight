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
      <div className="min-h-screen gradient-dark flex relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
        </div>
        
        <Sidebar selectedTier={selectedTier} onLogout={handleLogout} />
        <div className="flex-1 flex flex-col relative z-10">
          <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
          <main className="flex-1 overflow-y-auto custom-scrollbar">
            {renderContent()}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;