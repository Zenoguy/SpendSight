import React, { useState } from 'react';
import { Tier } from '../types';
import { Brain, TrendingUp, AlertTriangle, DollarSign, Send, Sparkles, Zap } from 'lucide-react';

interface InsightsProps {
  selectedTier: Tier;
}

export const Insights: React.FC<InsightsProps> = ({ selectedTier }) => {
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{type: 'user' | 'ai', message: string}>>([]);

  const insights = [
    {
      icon: TrendingUp,
      title: "Spending Trend",
      message: "Your spending increased by 28% this month compared to last month",
      type: "warning" as const,
      color: "from-yellow-500/20 to-orange-500/20"
    },
    {
      icon: DollarSign,
      title: "Top Category",
      message: "Your top spending category this month was Business expenses ($234.56)",
      type: "info" as const,
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      icon: AlertTriangle,
      title: "Budget Alert",
      message: "You're approaching your monthly dining budget limit",
      type: "warning" as const,
      color: "from-red-500/20 to-pink-500/20"
    },
    {
      icon: Sparkles,
      title: "Savings Opportunity",
      message: "You could save $45/month by switching to a different subscription plan",
      type: "success" as const,
      color: "from-green-500/20 to-emerald-500/20"
    }
  ];

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;

    const newHistory = [
      ...chatHistory,
      { type: 'user' as const, message: chatMessage },
      { 
        type: 'ai' as const, 
        message: `Based on your spending data, I can see that you asked about "${chatMessage}". Here's what I found: Your spending patterns show consistent behavior in this area. Would you like me to analyze this further?`
      }
    ];

    setChatHistory(newHistory);
    setChatMessage('');
  };

  if (selectedTier === 'free') {
    return (
      <div className="p-4 sm:p-6 pb-24 lg:pb-6">
        <div className="relative group max-w-2xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-300"></div>
          <div className="relative glass rounded-3xl p-12 text-center soft-shadow-lg border border-white/20">
            <div className="p-6 glass rounded-3xl w-fit mx-auto mb-6 glow-purple">
              <Brain className="w-16 h-16 text-purple-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              AI Insights Available
            </h2>
            <p className="text-gray-300 mb-8 max-w-md mx-auto leading-relaxed">
              Upgrade to Smart or Business plan to unlock powerful AI-driven insights about your spending patterns, trends, and personalized recommendations.
            </p>
            <button className="gradient-button text-white px-8 py-4 rounded-2xl font-semibold hover:gradient-button-hover transition-all duration-300 soft-shadow hover:glow-purple">
              Upgrade to Smart Plan
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 pb-24 lg:pb-6">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
        <div className="relative glass rounded-3xl p-6 soft-shadow border border-white/20">
          <h2 className="text-xl font-semibold text-white mb-8 flex items-center">
            <div className="p-2 glass rounded-xl mr-3 glow-purple">
              <Brain className="w-6 h-6 text-purple-400" />
            </div>
            AI-Powered Insights
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

            {insights.map((insight, index) => {
              const Icon = insight.icon;
              return (
                <div key={index} className="relative group animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className={`absolute inset-0 bg-gradient-to-r ${insight.color} rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300`}></div>
                  <div className="relative p-6 glass rounded-2xl border border-white/20 hover:border-white/30 transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 glass rounded-2xl ${
                        insight.type === 'warning' ? 'glow-yellow' :
                        insight.type === 'success' ? 'glow-green' :
                        'glow-cyan'
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          insight.type === 'warning' ? 'text-yellow-400' :
                          insight.type === 'success' ? 'text-green-400' :
                          'text-cyan-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-2">{insight.title}</h3>
                        <p className="text-sm text-gray-300 leading-relaxed">{insight.message}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {selectedTier !== 'free' && (
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative border-t border-white/10 pt-8">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                  <div className="p-2 glass rounded-xl mr-3">
                    <Zap className="w-5 h-5 text-green-400" />
                  </div>
                  Ask About Your Expenses
                </h3>
                
                <div className="glass rounded-2xl p-4 mb-6 max-h-64 md:max-h-80 overflow-y-auto custom-scrollbar border border-white/20">
                  {chatHistory.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="p-4 glass rounded-2xl w-fit mx-auto mb-4">
                        <Brain className="w-8 h-8 text-purple-400" />
                      </div>
                      <p className="text-gray-400">
                        Ask me anything about your spending patterns, trends, or get personalized recommendations!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {chatHistory.map((chat, index) => (
                        <div key={index} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                            chat.type === 'user' 
                              ? 'gradient-button text-white' 
                              : 'glass text-white border border-white/20'
                          }`}>
                            <p className="text-sm">{chat.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask about your expenses..."
                    className="flex-1 px-4 py-3 glass rounded-2xl border border-white/20 focus:border-purple-500/50 focus:glow-purple transition-all duration-300 text-white placeholder-gray-400 bg-transparent"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!chatMessage.trim()}
                    className="px-6 py-3 gradient-button text-white rounded-2xl hover:gradient-button-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium soft-shadow hover:glow-purple"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-4 p-3 glass rounded-2xl border border-white/10">
                  <p className="text-xs text-gray-400 flex items-center">
                    <Sparkles className="w-3 h-3 mr-2" />
                    Try asking: "What's my biggest expense category?" or "How can I reduce my spending?"
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};