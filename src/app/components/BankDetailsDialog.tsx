import { EligibilityResult } from '../types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Badge } from './ui/badge';
import { CheckCircle, XCircle, IndianRupee, TrendingUp } from 'lucide-react';
import { Separator } from './ui/separator';

interface BankDetailsDialogProps {
  result: EligibilityResult | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BankDetailsDialog({ result, open, onOpenChange }: BankDetailsDialogProps) {
  if (!result) return null;

  const { bank, isEligible, reasons, emi, totalInterest, maxLoanAmount } = result;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="text-5xl">{bank.logo}</div>
            <div>
              <DialogTitle className="text-2xl">{bank.name}</DialogTitle>
              <DialogDescription>Detailed eligibility report and loan information</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Eligibility Status */}
          <div>
            <Badge
              variant={isEligible ? 'default' : 'secondary'}
              className="text-sm px-4 py-2"
            >
              {isEligible ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Eligible for Loan
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 mr-2" />
                  Not Eligible
                </>
              )}
            </Badge>
          </div>

          {/* Interest Rate */}
          <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rate of Interest</p>
                <div className="flex items-center gap-2 mt-1">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="text-3xl font-semibold text-green-600">{bank.roi}%</span>
                  <span className="text-sm text-muted-foreground">per annum</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Processing Fee</p>
                <p className="text-xl font-semibold">{bank.processingFee}%</p>
              </div>
            </div>
          </div>

          {/* Loan Details (if eligible) */}
          {isEligible && emi && totalInterest && (
            <>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Monthly EMI</p>
                  <p className="text-2xl font-semibold flex items-center gap-1">
                    <IndianRupee className="w-5 h-5" />
                    {emi.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Total Interest Payable</p>
                  <p className="text-2xl font-semibold flex items-center gap-1">
                    <IndianRupee className="w-5 h-5" />
                    {totalInterest.toLocaleString('en-IN')}
                  </p>
                </div>
                {maxLoanAmount && (
                  <div className="p-4 border rounded-lg col-span-2">
                    <p className="text-sm text-muted-foreground mb-1">Maximum Eligible Amount</p>
                    <p className="text-2xl font-semibold flex items-center gap-1">
                      <IndianRupee className="w-5 h-5" />
                      {maxLoanAmount.toLocaleString('en-IN')}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Eligibility Criteria */}
          <Separator />
          <div>
            <h3 className="font-semibold mb-3">Eligibility Analysis</h3>
            <ul className="space-y-2">
              {reasons.map((reason, idx) => (
                <li
                  key={idx}
                  className={`flex items-start gap-2 text-sm p-2 rounded ${
                    reason.startsWith('✓')
                      ? 'bg-green-50 text-green-700'
                      : 'bg-red-50 text-red-700'
                  }`}
                >
                  {reason.startsWith('✓') ? (
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  )}
                  <span>{reason.replace('✓ ', '')}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bank Criteria */}
          <Separator />
          <div>
            <h3 className="font-semibold mb-3">Bank Requirements</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-muted-foreground">Min CIBIL Score</p>
                <p className="font-medium">{bank.criteria.minCibil}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-muted-foreground">Min Salary</p>
                <p className="font-medium">₹{bank.criteria.minSalary.toLocaleString('en-IN')}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-muted-foreground">Max Obligation %</p>
                <p className="font-medium">{bank.criteria.maxObligationPercent}%</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-muted-foreground">Accepted Categories</p>
                <p className="font-medium">{bank.criteria.companyCategoryAllowed.join(', ')}</p>
              </div>
            </div>
          </div>

          {/* Features */}
          <Separator />
          <div>
            <h3 className="font-semibold mb-3">Key Features</h3>
            <ul className="space-y-2">
              {bank.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
