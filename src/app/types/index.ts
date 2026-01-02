export interface CustomerProfile {
  name: string;
  cibilScore: number;
  monthlySalary: number;
  monthlyObligations: number;
  companyCategory: 'A' | 'B' | 'C' | 'D';
  areaPincode: string;
  loanAmount: number;
  loanTenure: number;
}

export interface BankCriteria {
  minCibil: number;
  maxCibil: number;
  minSalary: number;
  companyCategoryAllowed: string[];
  maxObligationPercent: number;
  preferredPincodes?: string[];
  maxLTV: number;
}

export interface Bank {
  id: string;
  name: string;
  logo: string;
  roi: number;
  processingFee: number;
  criteria: BankCriteria;
  features: string[];
}

export interface EligibilityResult {
  bank: Bank;
  isEligible: boolean;
  reasons: string[];
  maxLoanAmount?: number;
  emi?: number;
  totalInterest?: number;
}
