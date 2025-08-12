import React from 'react';
import { Tier } from '../types';
import { mockCategorySpending, mockMonthlySpending, mockVendorSpending } from '../data/mockData';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Download, TrendingUp, DollarSign, ShoppingBag, ArrowUp, ArrowDown } from 'lucide-react';

interface DashboardProps {
  selectedTier: Tier;
}

const COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-dark p-3 rounded-xl border border-white/20 backdrop-blur-md">
        <p className="text-white font-medium">{label}</p>
        <p className="text-purple-400">
          {`${payload[0].name}: $${Math.abs(payload[0].value).toFixed(2)}`}
        </p>
      </div>
    );
  }
  return null;
};

export const Dashboard: React.FC<DashboardProps> = ({ selectedTier }) => {
  const totalSpent = mockCategorySpending.reduce((sum, item) => sum + item.amount, 0);
  const topCategory = mockCategorySpending.reduce((prev, current) => 
    prev.amount > current.amount ? prev : current
  );

  const StatCard = ({ title, value, icon: Icon, trend, color }: any) => (
    <div className="relative group animate-fade-in">
      <div className={`absolute inset-0 bg-gradient-to-r ${color} rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-all duration-300`}></div>
      <div className="relative glass rounded-3xl p-6 soft-shadow hover:soft-shadow-lg transition-all duration-300 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 glass rounded-2xl">
            <Icon className="w-6 h-6 text-white" />
          </div>
          {trend && (
            <div className={`flex items-center space-x-1 text-sm ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {trend > 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
              <span>{Math.abs(trend)}%</span>
            </div>
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-300 mb-1">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
      </div>
    </div>
  );

  const ChartCard = ({ title, children, className = "" }: any) => (
    <div className={`relative group animate-slide-up ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
      <div className="relative glass rounded-3xl p-6 soft-shadow hover:soft-shadow-lg transition-all duration-300 border border-white/20 h-full">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
          <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
          {title}
        </h3>
        {children}
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-8 pb-24 lg:pb-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Spent"
          value={`$${Math.abs(totalSpent).toFixed(2)}`}
          icon={DollarSign}
          trend={-12}
          color="from-red-500/20 to-pink-500/20"
        />
        <StatCard
          title="Top Category"
          value={topCategory.category}
          icon={ShoppingBag}
          trend={8}
          color="from-blue-500/20 to-cyan-500/20"
        />
        <StatCard
          title="Transactions"
          value="8"
          icon={TrendingUp}
          trend={15}
          color="from-green-500/20 to-emerald-500/20"
        />
      </div>

      {selectedTier === 'free' ? (
        /* Free Tier Dashboard */
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <ChartCard title="Spending by Category">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockCategorySpending}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, percentage }) => `${category}: ${percentage.toFixed(1)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="amount"
                  stroke="none"
                >
                  {mockCategorySpending.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Monthly Spending">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockMonthlySpending}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="amount" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Top 5 Categories" className="xl:col-span-2">
            <div className="space-y-4">
              {mockCategorySpending.slice(0, 5).map((category, index) => (
                <div key={category.category} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-cyan-500/5 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
                  <div className="relative flex items-center justify-between p-4 glass rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div 
                        className="w-4 h-4 rounded-full shadow-lg" 
                        style={{ backgroundColor: COLORS[index], boxShadow: `0 0 10px ${COLORS[index]}40` }}
                      ></div>
                      <span className="font-medium text-white">{category.category}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <div className="font-semibold text-white">${Math.abs(category.amount).toFixed(2)}</div>
                        <div className="text-sm text-gray-400">{category.percentage.toFixed(1)}%</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      ) : (
        /* Business Tier Dashboard */
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <ChartCard title="Expense Trends">
            <div className="flex items-center justify-between mb-4">
              <div></div>
              {selectedTier === 'business' && (
                <button className="flex items-center space-x-2 px-4 py-2 glass rounded-2xl text-purple-400 hover:text-white hover:glow-purple transition-all duration-300 text-sm font-medium">
                  <Download className="w-4 h-4" />
                  <span>Export PowerBI</span>
                </button>
              )}
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockMonthlySpending}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="url(#lineGradient)" 
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: '#8b5cf6', strokeWidth: 2, fill: '#fff' }}
                />
                <defs>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Spending by Category">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockCategorySpending}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, percentage }) => `${category}: ${percentage.toFixed(1)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="amount"
                  stroke="none"
                >
                  {mockCategorySpending.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Top Vendors" className="xl:col-span-2">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Vendor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Transactions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {mockVendorSpending.map((vendor, index) => (
                    <tr key={vendor.vendor} className="hover:bg-white/5 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        {vendor.vendor}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        ${Math.abs(vendor.amount).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {vendor.transactions}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ChartCard>
        </div>
      )}
    </div>
  );
};