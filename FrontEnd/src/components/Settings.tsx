import React, { useState } from 'react';
import { Trash2, Moon, Sun, FileText, HelpCircle, Mail } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const Settings: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  const clearUploads = () => {
    if (window.confirm('Are you sure you want to clear all uploaded files? This action cannot be undone.')) {
      // In a real app, this would clear the uploaded files
      alert('All uploads cleared successfully!');
    }
  };

  return (
    <div className="p-6 space-y-6 dark:bg-gray-900 min-h-screen">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Settings</h2>

        <div className="space-y-6">
          {/* Appearance */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Appearance</h3>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                {isDarkMode ? <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" /> : <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />}
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Toggle between light and dark themes</p>
                </div>
              </div>
              <button
                onClick={toggleDarkMode}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isDarkMode ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isDarkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Data Management */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Data Management</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Trash2 className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Clear All Uploads</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Remove all uploaded files and parsed data</p>
                  </div>
                </div>
                <button
                  onClick={clearUploads}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* Support & Documentation */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Support & Documentation</h3>
            <div className="space-y-3">
              <a
                href="#"
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Documentation</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Learn how to use SpendSight effectively</p>
                  </div>
                </div>
                <span className="text-gray-400 dark:text-gray-500">→</span>
              </a>

              <a
                href="#"
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <HelpCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Help Center</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Get answers to frequently asked questions</p>
                  </div>
                </div>
                <span className="text-gray-400 dark:text-gray-500">→</span>
              </a>

              <a
                href="mailto:support@spendsight.com"
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Contact Support</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Get help from our support team</p>
                  </div>
                </div>
                <span className="text-gray-400 dark:text-gray-500">→</span>
              </a>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">About</h3>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">SpendSight v1.0.0</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Smart Financial Statement Parser</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Built at Business Hackathon 2K25 by Team SpendSight. 
                Transform your financial statements into actionable insights with AI-powered analysis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};