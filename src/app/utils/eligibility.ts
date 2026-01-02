import { Bank, CustomerProfile, EligibilityResult } from '../types';

export function calculateEligibility(
  customer: CustomerProfile,
  bank: Bank
): EligibilityResult {
  const reasons: string[] = [];
  let isEligible = true;

  // Check CIBIL score
  if (customer.cibilScore < bank.criteria.minCibil) {
    isEligible = false;
    reasons.push(
      `CIBIL score ${customer.cibilScore} is below minimum requirement of ${bank.criteria.minCibil}`
    );
  } else {
    reasons.push(`✓ CIBIL score meets requirement`);
  }

  // Check minimum salary
  if (customer.monthlySalary < bank.criteria.minSalary) {
    isEligible = false;
    reasons.push(
      `Monthly salary ₹${customer.monthlySalary.toLocaleString('en-IN')} is below minimum ₹${bank.criteria.minSalary.toLocaleString('en-IN')}`
    );
  } else {
    reasons.push(`✓ Salary meets requirement`);
  }

  // Check company category
  if (!bank.criteria.companyCategoryAllowed.includes(customer.companyCategory)) {
    isEligible = false;
    reasons.push(
      `Company category ${customer.companyCategory} not accepted (Accepts: ${bank.criteria.companyCategoryAllowed.join(', ')})`
    );
  } else {
    reasons.push(`✓ Company category accepted`);
  }

  // Check obligation percentage
  const obligationPercent = (customer.monthlyObligations / customer.monthlySalary) * 100;
  if (obligationPercent > bank.criteria.maxObligationPercent) {
    isEligible = false;
    reasons.push(
      `Obligation ratio ${obligationPercent.toFixed(1)}% exceeds maximum ${bank.criteria.maxObligationPercent}%`
    );
  } else {
    reasons.push(`✓ Obligation ratio within limit (${obligationPercent.toFixed(1)}%)`);
  }

  // Check pincode preference (bonus, not mandatory)
  if (bank.criteria.preferredPincodes) {
    const pincodeMatch = bank.criteria.preferredPincodes.some(
      (pincode) => customer.areaPincode.startsWith(pincode.substring(0, 3))
    );
    if (pincodeMatch) {
      reasons.push(`✓ Preferred location - Additional benefits may apply`);
    }
  }

  // Calculate maximum loan amount based on salary and obligations
  const availableIncome = customer.monthlySalary - customer.monthlyObligations;
  const maxEMI = availableIncome * (bank.criteria.maxObligationPercent / 100);
  const maxLoanAmount = calculateLoanAmount(maxEMI, bank.roi, customer.loanTenure);

  // Calculate EMI if eligible
  let emi: number | undefined;
  let totalInterest: number | undefined;

  if (isEligible) {
    emi = calculateEMI(customer.loanAmount, bank.roi, customer.loanTenure);
    totalInterest = emi * customer.loanTenure - customer.loanAmount;
  }

  return {
    bank,
    isEligible,
    reasons,
    maxLoanAmount: isEligible ? Math.min(maxLoanAmount, customer.loanAmount) : undefined,
    emi,
    totalInterest,
  };
}

export function calculateEMI(principal: number, annualRate: number, tenureMonths: number): number {
  const monthlyRate = annualRate / 12 / 100;
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  return Math.round(emi);
}

export function calculateLoanAmount(
  emi: number,
  annualRate: number,
  tenureMonths: number
): number {
  const monthlyRate = annualRate / 12 / 100;
  const loanAmount =
    (emi * (Math.pow(1 + monthlyRate, tenureMonths) - 1)) /
    (monthlyRate * Math.pow(1 + monthlyRate, tenureMonths));
  return Math.round(loanAmount);
}

export function getAllEligibilityResults(
  customer: CustomerProfile,
  banks: Bank[]
): EligibilityResult[] {
  return banks
    .map((bank) => calculateEligibility(customer, bank))
    .sort((a, b) => {
      // First, sort by eligibility
      if (a.isEligible && !b.isEligible) return -1;
      if (!a.isEligible && b.isEligible) return 1;

      // Then by ROI (lower is better)
      return a.bank.roi - b.bank.roi;
    });
}
