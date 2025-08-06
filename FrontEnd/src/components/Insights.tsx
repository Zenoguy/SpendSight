import React, { useState } from 'react';
import { Tier } from '../types';
import { Brain, TrendingUp, AlertTriangle, DollarSign, Send, Sparkles } from 'lucide-react';

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
      type: "warning" as const
    },
    {
      icon: DollarSign,
      title: "Top Category",
      message: "Your top spending category this month was Business expenses ($234.56)",
      type: "info" as const
    },
    {
      icon: AlertTriangle,
      title: "Budget Alert",
      message: "You're approaching your monthly dining budget limit",
      type: "warning" as const
    },
    {
      icon: Sparkles,
      title: "Savings Opportunity",
      message: "You could save $45/month by switching to a different subscription plan",
      type: "success" as const
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
      <div className="p-6 dark:bg-gray-900 min-h-screen">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white text-center">
          <Brain className="w-16 h-16 mx-auto mb-4 opacity-80" />
          <h2 className="text-2xl font-bold mb-4">AI Insights Available</h2>
          <p className="text-blue-100 mb-6 max-w-md mx-auto">
            Upgrade to Smart or Business plan to unlock powerful AI-driven insights about your spending patterns, trends, and personalized recommendations.
          </p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Upgrade to Smart Plan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 dark:bg-gray-900 min-h-screen">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <Brain className="w-6 h-6 mr-2 text-blue-600" />
          AI-Powered Insights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <div key={index} className="p-4 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${
                    insight.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                    insight.type === 'success' ? 'bg-green-100 dark:bg-green-900/30' :
                    'bg-blue-100 dark:bg-blue-900/30'
                  }`}>
                    <Icon className={`w-5 h-5 ${
                      insight.type === 'warning' ? 'text-yellow-600' :
                      insight.type === 'success' ? 'text-green-600' :
                      'text-blue-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{insight.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{insight.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {selectedTier !== 'free' && (
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Ask About Your Expenses</h3>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4 max-h-64 overflow-y-auto">
              {chatHistory.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                  Ask me anything about your spending patterns, trends, or get personalized recommendations!
                </p>
              ) : (
                <div className="space-y-3">
                  {chatHistory.map((chat, index) => (
                    <div key={index} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        chat.type === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-500'
                      }`}>
                        <p className="text-sm">{chat.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex space-x-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about your expenses..."
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                disabled={!chatMessage.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
              💡 Try asking: "What's my biggest expense category?" or "How can I reduce my spending?"
            </div>
          </div>
        )}
      </div>
    </div>
  );
};