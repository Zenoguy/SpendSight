import React from 'react';
import { Trash2, Moon, Sun, FileText, HelpCircle, Mail, Shield, Bell } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const Settings: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  const clearUploads = () => {
    if (window.confirm('Are you sure you want to clear all uploaded files? This action cannot be undone.')) {
      alert('All uploads cleared successfully!');
    }
  };

  const SettingCard = ({ title, children }: any) => (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
      <div className="relative glass rounded-3xl p-6 soft-shadow border border-white/20">
        <h3 className="text-lg font-medium text-white mb-6 flex items-center">
          <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
          {title}
        </h3>
        {children}
      </div>
    </div>
  );

  const SettingItem = ({ icon: Icon, title, description, action, color = "text-gray-400" }: any) => (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/5 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
      <div className="relative flex items-center justify-between p-4 glass rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
        <div className="flex items-center space-x-4">
          <div className="p-2 glass rounded-xl">
            <Icon className={`w-5 h-5 ${color}`} />
          </div>
          <div>
            <p className="font-medium text-white">{title}</p>
            <p className="text-sm text-gray-400">{description}</p>
          </div>
        </div>
        {action}
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-8 pb-24 lg:pb-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-3xl blur-2xl"></div>
            <div className="relative p-4 glass rounded-3xl">
              <Shield className="w-12 h-12 text-purple-400 mx-auto" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Settings
          </h2>
          <p className="text-gray-300">Customize your SpendSight experience</p>
        </div>

        <div className="space-y-8">
          {/* Appearance */}
          <SettingCard title="Appearance">
            <SettingItem
              icon={isDarkMode ? Moon : Sun}
              title="Dark Mode"
              description="Toggle between light and dark themes"
              color="text-purple-400"
              action={
                <button
                  onClick={toggleDarkMode}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isDarkMode ? 'gradient-button' : 'glass border border-white/20'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isDarkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              }
            />
          </SettingCard>

          {/* Notifications */}
          <SettingCard title="Notifications">
            <div className="space-y-4">
              <SettingItem
                icon={Bell}
                title="Budget Alerts"
                description="Get notified when approaching budget limits"
                color="text-yellow-400"
                action={
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full gradient-button">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                  </button>
                }
              />
              <SettingItem
                icon={Bell}
                title="Weekly Reports"
                description="Receive weekly spending summaries"
                color="text-green-400"
                action={
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full glass border border-white/20">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
                  </button>
                }
              />
            </div>
          </SettingCard>

          {/* Data Management */}
          <SettingCard title="Data Management">
            <SettingItem
              icon={Trash2}
              title="Clear All Uploads"
              description="Remove all uploaded files and parsed data"
              color="text-red-400"
              action={
                <button
                  onClick={clearUploads}
                  className="px-4 py-2 bg-red-500/20 text-red-400 rounded-2xl hover:bg-red-500/30 transition-all duration-300 border border-red-500/30 font-medium"
                >
                  Clear
                </button>
              }
            />
          </SettingCard>

          {/* Support & Documentation */}
          <SettingCard title="Support & Documentation">
            <div className="space-y-4">
              <SettingItem
                icon={FileText}
                title="Documentation"
                description="Learn how to use SpendSight effectively"
                color="text-blue-400"
                action={
                  <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">→</span>
                }
              />
              <SettingItem
                icon={HelpCircle}
                title="Help Center"
                description="Get answers to frequently asked questions"
                color="text-green-400"
                action={
                  <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">→</span>
                }
              />
              <SettingItem
                icon={Mail}
                title="Contact Support"
                description="Get help from our support team"
                color="text-purple-400"
                action={
                  <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">→</span>
                }
              />
            </div>
          </SettingCard>

          {/* About */}
          <SettingCard title="About">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-cyan-500/5 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
              <div className="relative p-6 glass rounded-2xl border border-white/10">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 gradient-button rounded-2xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">S</span>
                  </div>
                  <div>
                    <p className="font-medium text-white">SpendSight v2.0.0</p>
                    <p className="text-sm text-gray-400">Smart Financial Statement Parser & Tracker</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  SWE LAB PROJECT 2k25. 
                  SpendSight turns messy bank statements and bill photos into clean, categorized insights — helping you track and understand your spending in just one click.
                </p>
              </div>
            </div>
          </SettingCard>
        </div>
      </div>
    </div>
  );
};