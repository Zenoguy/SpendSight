import React, { useState } from 'react';
import { Tier } from '../types';
import { tierInfo } from '../data/mockData';
import { LogOut, User, Menu, X, Crown, Zap, Building2 } from 'lucide-react';

interface SidebarProps {
  selectedTier: Tier;
  onLogout: () => void;
}

const tierIcons = {
  free: Crown,
  smart: Zap,
  business: Building2
};

export const Sidebar: React.FC<SidebarProps> = ({ selectedTier, onLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const TierIcon = tierIcons[selectedTier];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`
          ${isCollapsed ? 'w-20' : 'w-80'} 
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          fixed top-0 left-0 h-screen z-40 transition-all duration-300 ease-in-out
          glass-dark border-r border-white/10 backdrop-blur-xl
        `}
      >
        <div className="h-full flex flex-col p-6 custom-scrollbar overflow-y-auto">
          {/* Header */}
          <div className="mb-8 relative">
            <div
              className={`transition-all duration-300 ${
                isCollapsed ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}
            >
              <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                SpendSight 💸
              </h1>
              <p className="text-gray-300 text-sm opacity-80">
                "From PDF to insights — in seconds."
              </p>
            </div>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:block absolute -right-3 top-4 p-2 glass rounded-full soft-shadow hover:glow-purple transition-all duration-300"
            >
              <Menu className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Current Plan */}
          <div className="mb-8">
            <h3
              className={`text-lg font-semibold text-white mb-4 transition-all duration-300 ${
                isCollapsed ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}
            >
              Current Plan
            </h3>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative p-4 glass rounded-2xl soft-shadow hover:soft-shadow-lg transition-all duration-300 border border-white/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 glass rounded-xl">
                      <TierIcon className="w-5 h-5 text-purple-400" />
                    </div>
                    {!isCollapsed && (
                      <div>
                        <span className="font-semibold text-white">
                          {tierInfo[selectedTier].name}
                        </span>
                        <div className="text-sm text-gray-300">
                          {tierInfo[selectedTier].price}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {!isCollapsed && (
                  <div className="space-y-2">
                    <div className="text-xs text-gray-400">
                      Upload limit: {tierInfo[selectedTier].uploadLimit}
                    </div>
                    <div className="space-y-1">
                      {tierInfo[selectedTier].features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="text-xs text-gray-400 flex items-center">
                          <div className="w-1 h-1 bg-purple-400 rounded-full mr-2"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* User Profile */}
          <div className="mb-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-green-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative flex items-center space-x-3 p-3 glass rounded-2xl soft-shadow hover:soft-shadow-lg transition-all duration-300">
                <div className="p-2 glass rounded-xl">
                  <User className="w-6 h-6 text-cyan-400" />
                </div>
                {!isCollapsed && (
                  <div>
                    <p className="font-medium text-white">John Doe</p>
                    <p className="text-sm text-gray-400">john@example.com</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="mt-auto">
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center space-x-2 p-3 glass rounded-2xl soft-shadow hover:glow-purple transition-all duration-300 group"
            >
              <LogOut className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
              {!isCollapsed && (
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  Sign Out
                </span>
              )}
            </button>
          </div>

          {/* Footer */}
          {!isCollapsed && (
            <div className="pt-6 border-t border-white/10 mt-6">
              <p className="text-xs text-gray-500 text-center opacity-60">
                SWE LAB PROJECT 2k25.  — Team SpendSight
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Main content area */}
      <div
        className={`
          flex-1 transition-all duration-300
          ${isCollapsed ? 'lg:ml-20' : 'lg:ml-80'}
        `}
      >
      </div>
    </div>
  );
};
