import { Transaction, CategorySpending, MonthlySpending, VendorSpending } from '../types';

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2024-01-15',
    description: 'Starbucks Coffee',
    amount: -4.50,
    category: 'Food & Dining',
    vendor: 'Starbucks'
  },
  {
    id: '2',
    date: '2024-01-14',
    description: 'Uber Ride',
    amount: -12.30,
    category: 'Transportation',
    vendor: 'Uber'
  },
  {
    id: '3',
    date: '2024-01-13',
    description: 'Amazon Purchase',
    amount: -89.99,
    category: 'Shopping',
    vendor: 'Amazon'
  },
  {
    id: '4',
    date: '2024-01-12',
    description: 'Salary Deposit',
    amount: 3500.00,
    category: 'Income',
    vendor: 'Company Inc'
  },
  {
    id: '5',
    date: '2024-01-11',
    description: 'Grocery Store',
    amount: -67.45,
    category: 'Food & Dining',
    vendor: 'Whole Foods'
  },
  {
    id: '6',
    date: '2024-01-10',
    description: 'Gas Station',
    amount: -45.20,
    category: 'Transportation',
    vendor: 'Shell'
  },
  {
    id: '7',
    date: '2024-01-09',
    description: 'Netflix Subscription',
    amount: -15.99,
    category: 'Entertainment',
    vendor: 'Netflix'
  },
  {
    id: '8',
    date: '2024-01-08',
    description: 'Office Supplies',
    amount: -234.56,
    category: 'Business',
    vendor: 'Staples'
  }
];

export const mockCategorySpending: CategorySpending[] = [
  { category: 'Food & Dining', amount: 71.95, percentage: 35.2 },
  { category: 'Transportation', amount: 57.50, percentage: 28.1 },
  { category: 'Shopping', amount: 89.99, percentage: 44.0 },
  { category: 'Entertainment', amount: 15.99, percentage: 7.8 },
  { category: 'Business', amount: 234.56, percentage: 114.7 }
];

export const mockMonthlySpending: MonthlySpending[] = [
  { month: 'Oct', amount: 1250 },
  { month: 'Nov', amount: 1450 },
  { month: 'Dec', amount: 1680 },
  { month: 'Jan', amount: 1320 }
];

export const mockVendorSpending: VendorSpending[] = [
  { vendor: 'Staples', amount: 234.56, transactions: 1 },
  { vendor: 'Amazon', amount: 89.99, transactions: 1 },
  { vendor: 'Whole Foods', amount: 67.45, transactions: 1 },
  { vendor: 'Shell', amount: 45.20, transactions: 1 },
  { vendor: 'Starbucks', amount: 4.50, transactions: 1 }
];
export const tierInfo = {
  free: {
    name: 'Free',
    price: '$0/month',
    features: [
      'Csv File Generation',
      'Upto 3 Uploads per month',
      'Recurring Spend Detection',
      'Trend Graph',
      'Basic Categorization',
      'Reminders or Alerts'
    ],
    uploadLimit: '3 files/month',
    color: 'bg-gray-100 text-gray-800'
  },
  smart: {
    name: 'Smart',
    price: '$9/month',
    features: [
      'Everything from Free plan',
      'AI Powered Insights',
      'LLM Summary',
      'Upto 10 uploads per month',
      'Saving Plans',
      'Night time transaction Flags',
      'Compare and Combine of two bank statements',
      'Alerts and Suspicious activity Flag'
    ],
    uploadLimit: '10 files/month',
    color: 'bg-blue-100 text-blue-800'
  },
  business: {
    name: 'Business',
    price: '$29/month',
    features: [
      'Unlimited Statements Upload',
      'Multiple statement merge and Consolidated View - Power BI Report',
      'Team Collaborations – Multiple users can access 1 account',
      'Sales Insights – Power BI dashboard',
      'Business ClashFlow - Power BI dashboard',
      'Business Asset Valuation Calculation – Power BI dashboard',
      'Shareholders Equity Calculation – Power BI dashboard',
      'Outlier Detection'
    ],
    uploadLimit: 'Unlimited',
    color: 'bg-purple-100 text-purple-800'
  }
};
