import React from 'react';
import { Tier } from '../types';
import { tierInfo } from '../data/mockData';
import { Crown, Zap, Building2, Check } from 'lucide-react';

interface PricingProps {
  selectedTier: Tier;
  onTierChange: (tier: Tier) => void;
}

const tierIcons = {
  free: Crown,
  smart: Zap,
  business: Building2
};

export const Pricing: React.FC<PricingProps> = ({ selectedTier, onTierChange }) => {
  return (
    <div className="p-6 dark:bg-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Transform your financial statements into actionable insights with our AI-powered analysis
          </p>
        </div>

        {/* Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {Object.entries(tierInfo).map(([key, info]) => {
            const Icon = tierIcons[key as Tier];
            const isSelected = selectedTier === key;
            const isPopular = key === 'smart';

            return (
              <div
                key={key}
                className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 transition-all duration-300 transform-gpu hover:shadow-xl min-h-[650px] flex flex-col ${
                  isSelected
                    ? 'border-blue-500 scale-105'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                } ${isPopular ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center justify-center mb-4">
                    <div className={`p-3 rounded-full ${
                      key === 'free' ? 'bg-gray-100' :
                      key === 'smart' ? 'bg-blue-100' :
                      'bg-purple-100'
                    }`}>
                      <Icon className={`w-8 h-8 ${
                        key === 'free' ? 'text-gray-600' :
                        key === 'smart' ? 'text-blue-600' :
                        'text-purple-600'
                      }`} />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-2">
                    {info.name}
                  </h3>

                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      {info.price.split('/')[0]}
                    </span>
                    {info.price.includes('/') && (
                      <span className="text-gray-600 dark:text-gray-300">/{info.price.split('/')[1]}</span>
                    )}
                  </div>

                  <div className="space-y-4 mb-8 flex-1">
                    {info.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => onTierChange(key as Tier)}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 mt-auto ${
                      isSelected
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : key === 'free'
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                    }`}
                  >
                    {isSelected ? 'Current Plan' : key === 'free' ? 'Get Started' : 'Upgrade Now'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Solution */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            For enterprise customers with specific requirements, we offer custom pricing and dedicated support.
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200">
            Contact Sales
          </button>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            All plans include 24/7 support and a 30-day money-back guarantee
          </p>
        </div>
      </div>
    </div>
  );
};
