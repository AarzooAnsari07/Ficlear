// Mock data for Reports

export interface ReportKPIs {
  totalApplications: number;
  approvals: number;
  rejections: number;
  disbursedAmount: number;
  averageROI: number;
  averageTurnaroundTime: number;
}

export interface BankPerformanceReport {
  bank: string;
  applications: number;
  approvals: number;
  rejections: number;
  approvalRate: number;
  averageROI: number;
}

export interface RejectionReason {
  reason: string;
  count: number;
  percentage: number;
}

export interface EligibilityRate {
  bank: string;
  eligibilityRate: number;
}

export interface AgentPerformance {
  agentName: string;
  agentId: string;
  leadsHandled: number;
  approvals: number;
  conversionRate: number;
  disbursedAmount: number;
}

export interface DisbursedLoan {
  loanId: string;
  bank: string;
  customerName: string;
  amount: number;
  roi: number;
  date: string;
  tenure: number;
}

export interface MonthlyDisbursement {
  month: string;
  amount: number;
  count: number;
}

export interface LeadSource {
  source: string;
  leads: number;
  conversions: number;
  conversionRate: number;
  revenue: number;
}

// Report KPIs
export const reportKPIs: ReportKPIs = {
  totalApplications: 856,
  approvals: 642,
  rejections: 214,
  disbursedAmount: 156800000, // 15.68 Cr
  averageROI: 9.5,
  averageTurnaroundTime: 4.2, // days
};

// Bank Performance Data
export const bankPerformanceReport: BankPerformanceReport[] = [
  {
    bank: 'HDFC Bank',
    applications: 245,
    approvals: 196,
    rejections: 49,
    approvalRate: 80,
    averageROI: 9.2,
  },
  {
    bank: 'ICICI Bank',
    applications: 198,
    approvals: 148,
    rejections: 50,
    approvalRate: 75,
    averageROI: 9.5,
  },
  {
    bank: 'SBI',
    applications: 185,
    approvals: 120,
    rejections: 65,
    approvalRate: 65,
    averageROI: 8.8,
  },
  {
    bank: 'Axis Bank',
    applications: 142,
    approvals: 94,
    rejections: 48,
    approvalRate: 66,
    averageROI: 9.8,
  },
  {
    bank: 'Kotak Mahindra',
    applications: 86,
    approvals: 84,
    rejections: 2,
    approvalRate: 98,
    averageROI: 10.2,
  },
];

// Rejection Reasons
export const rejectionReasons: RejectionReason[] = [
  { reason: 'Low CIBIL Score', count: 89, percentage: 42 },
  { reason: 'High FOIR', count: 56, percentage: 26 },
  { reason: 'Company Not Listed', count: 38, percentage: 18 },
  { reason: 'PIN Not Serviceable', count: 21, percentage: 10 },
  { reason: 'Incomplete Documents', count: 10, percentage: 4 },
];

// Eligibility Success Rates
export const eligibilityRates: EligibilityRate[] = [
  { bank: 'HDFC', eligibilityRate: 82 },
  { bank: 'ICICI', eligibilityRate: 75 },
  { bank: 'Kotak', eligibilityRate: 88 },
  { bank: 'Axis', eligibilityRate: 68 },
  { bank: 'SBI', eligibilityRate: 65 },
  { bank: 'IndusInd', eligibilityRate: 72 },
];

// Agent Performance Data
export const agentPerformanceData: AgentPerformance[] = [
  {
    agentName: 'Bilal Khan',
    agentId: 'AG001',
    leadsHandled: 185,
    approvals: 142,
    conversionRate: 77,
    disbursedAmount: 38500000,
  },
  {
    agentName: 'Priya Verma',
    agentId: 'AG002',
    leadsHandled: 168,
    approvals: 128,
    conversionRate: 76,
    disbursedAmount: 32400000,
  },
  {
    agentName: 'Rahul Sharma',
    agentId: 'AG003',
    leadsHandled: 152,
    approvals: 105,
    conversionRate: 69,
    disbursedAmount: 28700000,
  },
  {
    agentName: 'Sneha Patel',
    agentId: 'AG004',
    leadsHandled: 145,
    approvals: 98,
    conversionRate: 68,
    disbursedAmount: 24600000,
  },
  {
    agentName: 'Amit Kumar',
    agentId: 'AG005',
    leadsHandled: 135,
    approvals: 92,
    conversionRate: 68,
    disbursedAmount: 21800000,
  },
  {
    agentName: 'Kavita Singh',
    agentId: 'AG006',
    leadsHandled: 71,
    approvals: 77,
    conversionRate: 108,
    disbursedAmount: 10800000,
  },
];

// Disbursed Loans Data
export const disbursedLoans: DisbursedLoan[] = [
  {
    loanId: 'LN2025001',
    bank: 'HDFC Bank',
    customerName: 'Rajesh Kumar',
    amount: 1500000,
    roi: 9.2,
    date: '2025-01-28',
    tenure: 60,
  },
  {
    loanId: 'LN2025002',
    bank: 'ICICI Bank',
    customerName: 'Priya Sharma',
    amount: 2500000,
    roi: 9.5,
    date: '2025-01-27',
    tenure: 84,
  },
  {
    loanId: 'LN2025003',
    bank: 'Kotak Mahindra',
    customerName: 'Amit Patel',
    amount: 1800000,
    roi: 10.2,
    date: '2025-01-26',
    tenure: 60,
  },
  {
    loanId: 'LN2025004',
    bank: 'SBI',
    customerName: 'Sneha Reddy',
    amount: 1200000,
    roi: 8.8,
    date: '2025-01-25',
    tenure: 48,
  },
  {
    loanId: 'LN2025005',
    bank: 'Axis Bank',
    customerName: 'Vikram Singh',
    amount: 3500000,
    roi: 9.8,
    date: '2025-01-24',
    tenure: 96,
  },
  {
    loanId: 'LN2025006',
    bank: 'HDFC Bank',
    customerName: 'Anjali Gupta',
    amount: 2200000,
    roi: 9.2,
    date: '2025-01-23',
    tenure: 72,
  },
  {
    loanId: 'LN2025007',
    bank: 'ICICI Bank',
    customerName: 'Karan Mehta',
    amount: 1600000,
    roi: 9.5,
    date: '2025-01-22',
    tenure: 60,
  },
  {
    loanId: 'LN2025008',
    bank: 'Kotak Mahindra',
    customerName: 'Deepak Joshi',
    amount: 2800000,
    roi: 10.2,
    date: '2025-01-21',
    tenure: 84,
  },
];

// Monthly Disbursement Trend
export const monthlyDisbursementTrend: MonthlyDisbursement[] = [
  { month: 'Jul', amount: 12500000, count: 42 },
  { month: 'Aug', amount: 14800000, count: 48 },
  { month: 'Sep', amount: 13200000, count: 45 },
  { month: 'Oct', amount: 15600000, count: 52 },
  { month: 'Nov', amount: 18200000, count: 58 },
  { month: 'Dec', amount: 21500000, count: 68 },
  { month: 'Jan', amount: 24800000, count: 75 },
];

// Lead Source Data
export const leadSourceData: LeadSource[] = [
  {
    source: 'Website',
    leads: 285,
    conversions: 198,
    conversionRate: 69,
    revenue: 52400000,
  },
  {
    source: 'Referrals',
    leads: 245,
    conversions: 189,
    conversionRate: 77,
    revenue: 48600000,
  },
  {
    source: 'Social Media',
    leads: 168,
    conversions: 105,
    conversionRate: 63,
    revenue: 28200000,
  },
  {
    source: 'Email Campaign',
    leads: 95,
    conversions: 58,
    conversionRate: 61,
    revenue: 15800000,
  },
  {
    source: 'Direct Walk-in',
    leads: 63,
    conversions: 92,
    conversionRate: 146,
    revenue: 11800000,
  },
];
