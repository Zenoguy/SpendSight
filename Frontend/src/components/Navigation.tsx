import React from 'react';
import { BarChart3, Upload, Brain, Settings, CreditCard } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'upload', label: 'Upload Statement', icon: Upload },
  { id: 'insights', label: 'Insights', icon: Brain },
  { id: 'pricing', label: 'Pricing', icon: CreditCard },
  { id: 'settings', label: 'Settings', icon: Settings }
];

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden lg:block glass-dark border-b border-white/10 backdrop-blur-xl">
        <div className="flex space-x-1 px-6 py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  relative flex items-center space-x-2 px-6 py-3 rounded-2xl font-medium text-sm transition-all duration-300 group
                  ${isActive
                    ? 'glass text-white glow-purple'
                    : 'text-gray-400 hover:text-white hover:glass'
                  }
                `}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl blur-xl"></div>
                )}
                <div className="relative flex items-center space-x-2">
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 glass-dark border-t border-white/10 backdrop-blur-xl">
        <div className="flex justify-around py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  relative flex flex-col items-center space-y-1 p-3 rounded-2xl transition-all duration-300
                  ${isActive
                    ? 'text-white glow-purple'
                    : 'text-gray-400 hover:text-white'
                  }
                `}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl blur-lg"></div>
                )}
                <div className="relative flex flex-col items-center space-y-1">
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{tab.label.split(' ')[0]}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};