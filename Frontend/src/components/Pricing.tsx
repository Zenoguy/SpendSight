import React from 'react';
import { Tier } from '../types';
import { tierInfo } from '../data/mockData';
import { Crown, Zap, Building2, Check, Star } from 'lucide-react';

interface PricingProps {
  selectedTier: Tier;
  onTierChange: (tier: Tier) => void;
}

const tierIcons = {
  free: Crown,
  smart: Zap,
  business: Building2
};

const tierColors = {
  free: 'from-gray-500/20 to-slate-500/20',
  smart: 'from-purple-500/20 to-blue-500/20',
  business: 'from-blue-500/20 to-cyan-500/20'
};

export const Pricing: React.FC<PricingProps> = ({ selectedTier, onTierChange }) => {
  return (
    <div className="p-6 pb-24 lg:pb-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-3xl blur-2xl"></div>
            <div className="relative p-4 glass rounded-3xl">
              <Star className="w-12 h-12 text-purple-400 mx-auto" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Transform your financial statements into actionable insights with our AI-powered analysis
          </p>
        </div>

        {/* Tier Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {Object.entries(tierInfo).map(([key, info]) => {
            const Icon = tierIcons[key as Tier];
            const isSelected = selectedTier === key;
            const isPopular = key === 'smart';

            return (
              <div
                key={key}
                className={`
                  relative group transition-all duration-500 transform-gpu hover:scale-105
                  ${isSelected ? 'scale-105' : ''}
                  ${isPopular ? 'lg:-mt-8' : ''}
                `}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full blur-lg"></div>
                      <span className="relative gradient-button text-white px-6 py-2 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  </div>
                )}

                <div className={`absolute inset-0 bg-gradient-to-r ${tierColors[key as Tier]} rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300`}></div>
                
                <div className={`
                  relative glass rounded-3xl p-8 soft-shadow-lg border transition-all duration-300 h-full flex flex-col
                  ${isSelected
                    ? 'border-purple-500/50 glow-purple'
                    : 'border-white/20 hover:border-white/30'
                  }
                  ${isPopular ? 'lg:py-12' : ''}
                `}>
                  <div className="flex items-center justify-center mb-6">
                    <div className={`p-4 glass rounded-3xl ${isSelected ? 'glow-purple' : ''}`}>
                      <Icon className={`w-10 h-10 ${
                        key === 'free' ? 'text-gray-400' :
                        key === 'smart' ? 'text-purple-400' :
                        'text-cyan-400'
                      }`} />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white text-center mb-4">
                    {info.name}
                  </h3>

                  <div className="text-center mb-8">
                    <span className="text-5xl font-bold text-white">
                      {info.price.split('/')[0]}
                    </span>
                    {info.price.includes('/') && (
                      <span className="text-gray-400 text-lg">/{info.price.split('/')[1]}</span>
                    )}
                  </div>

                  <div className="space-y-4 mb-8 flex-1">
                    {info.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="p-1 glass rounded-full mt-0.5">
                          <Check className="w-4 h-4 text-green-400" />
                        </div>
                        <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => onTierChange(key as Tier)}
                    className={`
                      w-full py-4 px-6 rounded-2xl font-semibold transition-all duration-300 mt-auto
                      ${isSelected
                        ? 'gradient-button text-white glow-purple'
                        : key === 'free'
                        ? 'glass text-white border border-white/20 hover:border-white/30 hover:glow-purple'
                        : 'gradient-button text-white hover:gradient-button-hover hover:glow-purple'
                      }
                    `}
                  >
                    {isSelected ? 'Current Plan' : key === 'free' ? 'Get Started' : 'Upgrade Now'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Solution */}
        <div className="relative group max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
          <div className="relative glass rounded-3xl p-12 text-center soft-shadow border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Need a Custom Solution?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              For enterprise customers with specific requirements, we offer custom pricing and dedicated support.
            </p>
            <button className="gradient-button text-white px-8 py-4 rounded-2xl font-semibold hover:gradient-button-hover transition-all duration-300 soft-shadow hover:glow-purple">
              Contact Sales
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-2xl blur-lg"></div>
            <p className="relative text-gray-400 text-sm p-4 glass rounded-2xl border border-white/10">
              All plans include 24/7 support and a 30-day money-back guarantee
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};