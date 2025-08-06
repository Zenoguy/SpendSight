import React, { useEffect, useState } from 'react';
import { Tier } from '../types';
import api from '../api/axios';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line
} from 'recharts';
import { Download, TrendingUp, DollarSign, ShoppingBag } from 'lucide-react';

interface DashboardProps {
  selectedTier: Tier;
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export const Dashboard: React.FC<DashboardProps> = ({ selectedTier }) => {
  const [categorySpending, setCategorySpending] = useState([]);
  const [monthlySpending, setMonthlySpending] = useState([]);
  const [vendorSpending, setVendorSpending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/dashboard-data')
      .then(res => {
        setCategorySpending(res.data.categorySpending);
        setMonthlySpending(res.data.monthlySpending);
        setVendorSpending(res.data.vendorSpending);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load dashboard data", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-6 text-gray-700 dark:text-white">Loading...</div>;

  const totalSpent = categorySpending.reduce((sum, item) => sum + item.amount, 0);
  const topCategory = categorySpending.reduce((prev, current) =>
    prev.amount > current.amount ? prev : current
  );

  return (
    <div className="p-6 space-y-6 dark:bg-gray-900 min-h-screen">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Spent */}
        <StatCard
          title="Total Spent"
          value={`$${Math.abs(totalSpent).toFixed(2)}`}
          icon={<DollarSign className="w-6 h-6 text-red-600" />}
          iconBg="bg-red-100"
        />
        {/* Top Category */}
        <StatCard
          title="Top Category"
          value={topCategory?.category || 'N/A'}
          icon={<ShoppingBag className="w-6 h-6 text-blue-600" />}
          iconBg="bg-blue-100"
        />
        {/* Transactions */}
        <StatCard
          title="Transactions"
          value={vendorSpending.reduce((acc, v) => acc + v.transactions, 0)}
          icon={<TrendingUp className="w-6 h-6 text-green-600" />}
          iconBg="bg-green-100"
        />
      </div>

      {/* Free vs Business Tier UI */}
      {selectedTier === 'free' ? (
        <FreeDashboard categorySpending={categorySpending} monthlySpending={monthlySpending} />
      ) : (
        <BusinessDashboard categorySpending={categorySpending} monthlySpending={monthlySpending} vendorSpending={vendorSpending} />
      )}
    </div>
  );
};

// ✅ Reusable stat card component
const StatCard = ({ title, value, icon, iconBg }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{title}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${iconBg}`}>{icon}</div>
    </div>
  </div>
);

// ✅ Free Tier Dashboard Charts
const FreeDashboard = ({ categorySpending, monthlySpending }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {/* Pie Chart */}
    <ChartCard title="Spending by Category">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={categorySpending}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ category, percentage }) => `${category}: ${percentage?.toFixed(1) || ''}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="amount"
          >
            {categorySpending.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`$${Math.abs(Number(value)).toFixed(2)}`, 'Amount']} />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>

    {/* Monthly Bar Chart */}
    <ChartCard title="Monthly Spending">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlySpending}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
          <Bar dataKey="amount" fill="#3B82F6" />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  </div>
);

// ✅ Business Tier Dashboard Charts + Table
const BusinessDashboard = ({ categorySpending, monthlySpending, vendorSpending }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <ChartCard title="Expense Trends" actionButton={
      <button className="flex items-center space-x-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-md text-sm font-medium hover:bg-purple-200 transition-colors">
        <Download className="w-4 h-4" />
        <span>Export PowerBI</span>
      </button>
    }>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={monthlySpending}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
          <Line type="monotone" dataKey="amount" stroke="#8B5CF6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>

    <ChartCard title="Spending by Category">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={categorySpending}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ category, percentage }) => `${category}: ${percentage?.toFixed(1) || ''}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="amount"
          >
            {categorySpending.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`$${Math.abs(Number(value)).toFixed(2)}`, 'Amount']} />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>

    {/* Vendor Table */}
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 lg:col-span-2">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Vendors</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Vendor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Transactions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {vendorSpending.map((vendor, index) => (
              <tr key={vendor.vendor}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{vendor.vendor}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">${Math.abs(vendor.amount).toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{vendor.transactions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// ✅ Reusable Chart Card
const ChartCard = ({ title, children, actionButton = null }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      {actionButton}
    </div>
    {children}
  </div>
);
