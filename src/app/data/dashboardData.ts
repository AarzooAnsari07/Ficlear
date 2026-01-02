// Mock data for dashboard

export interface DashboardKPIs {
  totalLeads: number;
  eligibleLeads: number;
  approvals: number;
  rejections: number;
  disbursedAmount: number;
}

export interface LeadFunnelData {
  stage: string;
  count: number;
  percentage: number;
}

export interface EligibilityInsight {
  bank: string;
  eligibilityRate: number;
  approvalRate: number;
  avgProcessingTime: number;
}

export interface BankPerformance {
  bank: string;
  logo: string;
  leadsSubmitted: number;
  approved: number;
  rejected: number;
  pending: number;
  disbursed: number;
  approvalRate: number;
}

export interface Task {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  dueTime: string;
  leadName: string;
  status: 'pending' | 'in-progress' | 'completed';
}

export interface Activity {
  id: string;
  type: 'lead_created' | 'eligibility_checked' | 'approval' | 'rejection' | 'disbursed' | 'follow_up';
  title: string;
  description: string;
  time: string;
  leadName?: string;
  amount?: number;
}

// KPI Data
export const dashboardKPIs: DashboardKPIs = {
  totalLeads: 245,
  eligibleLeads: 187,
  approvals: 142,
  rejections: 45,
  disbursedAmount: 34500000, // 3.45 Cr
};

// Lead Funnel Data
export const leadFunnelData: LeadFunnelData[] = [
  { stage: 'Total Leads', count: 245, percentage: 100 },
  { stage: 'Eligible', count: 187, percentage: 76 },
  { stage: 'Submitted', count: 156, percentage: 64 },
  { stage: 'Approved', count: 142, percentage: 58 },
  { stage: 'Disbursed', count: 128, percentage: 52 },
];

// Eligibility Insights
export const eligibilityInsights: EligibilityInsight[] = [
  { bank: 'HDFC', eligibilityRate: 82, approvalRate: 78, avgProcessingTime: 3 },
  { bank: 'ICICI', eligibilityRate: 75, approvalRate: 72, avgProcessingTime: 4 },
  { bank: 'SBI', eligibilityRate: 68, approvalRate: 65, avgProcessingTime: 5 },
  { bank: 'Axis', eligibilityRate: 71, approvalRate: 68, avgProcessingTime: 4 },
];

// Bank Performance Data
export const bankPerformanceData: BankPerformance[] = [
  {
    bank: 'HDFC Bank',
    logo: '🏦',
    leadsSubmitted: 85,
    approved: 68,
    rejected: 12,
    pending: 5,
    disbursed: 18500000,
    approvalRate: 80,
  },
  {
    bank: 'ICICI Bank',
    logo: '🏦',
    leadsSubmitted: 72,
    approved: 54,
    rejected: 14,
    pending: 4,
    disbursed: 12300000,
    approvalRate: 75,
  },
  {
    bank: 'SBI',
    logo: '🏦',
    leadsSubmitted: 65,
    approved: 42,
    rejected: 18,
    pending: 5,
    disbursed: 8700000,
    approvalRate: 65,
  },
  {
    bank: 'Axis Bank',
    logo: '🏦',
    leadsSubmitted: 58,
    approved: 38,
    rejected: 15,
    pending: 5,
    disbursed: 6800000,
    approvalRate: 66,
  },
  {
    bank: 'Kotak Mahindra',
    logo: '🏦',
    leadsSubmitted: 45,
    approved: 32,
    rejected: 10,
    pending: 3,
    disbursed: 4200000,
    approvalRate: 71,
  },
];

// Today's Tasks
export const todaysTasks: Task[] = [
  {
    id: 'T001',
    title: 'Follow up with HDFC for approval',
    priority: 'high',
    dueTime: '10:00 AM',
    leadName: 'Rajesh Kumar',
    status: 'pending',
  },
  {
    id: 'T002',
    title: 'Submit documents to ICICI',
    priority: 'high',
    dueTime: '11:30 AM',
    leadName: 'Priya Sharma',
    status: 'in-progress',
  },
  {
    id: 'T003',
    title: 'Call lead for missing KYC',
    priority: 'medium',
    dueTime: '2:00 PM',
    leadName: 'Amit Patel',
    status: 'pending',
  },
  {
    id: 'T004',
    title: 'Upload salary slips for verification',
    priority: 'medium',
    dueTime: '3:30 PM',
    leadName: 'Sneha Reddy',
    status: 'pending',
  },
  {
    id: 'T005',
    title: 'Schedule meeting with bank RM',
    priority: 'low',
    dueTime: '4:00 PM',
    leadName: 'Vikram Singh',
    status: 'pending',
  },
];

// Recent Activities
export const recentActivities: Activity[] = [
  {
    id: 'A001',
    type: 'disbursed',
    title: 'Loan Disbursed',
    description: 'HDFC Bank loan of ₹15L disbursed',
    time: '2 hours ago',
    leadName: 'Vikram Singh',
    amount: 1500000,
  },
  {
    id: 'A002',
    type: 'approval',
    title: 'Loan Approved',
    description: 'ICICI Bank approved loan application',
    time: '3 hours ago',
    leadName: 'Priya Sharma',
  },
  {
    id: 'A003',
    type: 'eligibility_checked',
    title: 'Eligibility Check Completed',
    description: 'Checked eligibility across 8 banks',
    time: '5 hours ago',
    leadName: 'Amit Patel',
  },
  {
    id: 'A004',
    type: 'rejection',
    title: 'Application Rejected',
    description: 'SBI rejected due to low CIBIL score',
    time: '6 hours ago',
    leadName: 'Rahul Verma',
  },
  {
    id: 'A005',
    type: 'lead_created',
    title: 'New Lead Created',
    description: 'Lead created and profile added',
    time: '8 hours ago',
    leadName: 'Sneha Reddy',
  },
  {
    id: 'A006',
    type: 'follow_up',
    title: 'Follow-up Call Completed',
    description: 'Discussed document requirements',
    time: '1 day ago',
    leadName: 'Rajesh Kumar',
  },
];
