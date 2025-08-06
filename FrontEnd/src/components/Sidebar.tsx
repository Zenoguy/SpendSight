import React from 'react';
import { Tier } from '../types';
import { tierInfo } from '../data/mockData';
import { LogOut, User } from 'lucide-react';

interface SidebarProps {
  selectedTier: Tier;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ selectedTier, onLogout }) => {
  return (
    <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6 overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          SpendSight 💸
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          "From PDF to insights — in seconds."
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Current Plan</h3>
        <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-700">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-900 dark:text-white">{tierInfo[selectedTier].name}</span>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{tierInfo[selectedTier].price}</span>
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-300 mb-2">
            Upload limit: {tierInfo[selectedTier].uploadLimit}
          </div>
          <div className="space-y-1">
            {tierInfo[selectedTier].features.slice(0, 3).map((feature, index) => (
              <div key={index} className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                <div className="w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full mr-2"></div>
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <User className="w-8 h-8 text-gray-600 dark:text-gray-300" />
          <div>
            <p className="font-medium text-gray-900 dark:text-white">John Doe</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">john@example.com</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      <div className="pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Built at Business Hackathon 2K25 — Team SpendSight
        </p>
      </div>
    </div>
  );
};