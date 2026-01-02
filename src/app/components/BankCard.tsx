import { EligibilityResult } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { CheckCircle, XCircle, TrendingUp, IndianRupee } from 'lucide-react';
import { Button } from './ui/button';

interface BankCardProps {
  result: EligibilityResult;
  onViewDetails: () => void;
}

export function BankCard({ result, onViewDetails }: BankCardProps) {
  const { bank, isEligible, emi, totalInterest } = result;

  return (
    <Card className={`${isEligible ? 'border-green-500' : 'border-red-200'}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="text-4xl">{bank.logo}</div>
            <div>
              <CardTitle className="text-lg">{bank.name}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={isEligible ? 'default' : 'secondary'} className="text-xs">
                  {isEligible ? (
                    <>
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Eligible
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3 h-3 mr-1" />
                      Not Eligible
                    </>
                  )}
                </Badge>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="font-semibold">{bank.roi}%</span>
            </div>
            <p className="text-xs text-muted-foreground">ROI p.a.</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEligible && emi && totalInterest && (
          <div className="grid grid-cols-2 gap-4 p-4 bg-green-50 rounded-lg">
            <div>
              <p className="text-sm text-muted-foreground">Monthly EMI</p>
              <p className="font-semibold flex items-center gap-1">
                <IndianRupee className="w-4 h-4" />
                {emi.toLocaleString('en-IN')}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Interest</p>
              <p className="font-semibold flex items-center gap-1">
                <IndianRupee className="w-4 h-4" />
                {totalInterest.toLocaleString('en-IN')}
              </p>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <p className="text-sm font-medium">Eligibility Criteria:</p>
          <ul className="space-y-1">
            {result.reasons.slice(0, 3).map((reason, idx) => (
              <li
                key={idx}
                className={`text-sm ${
                  reason.startsWith('✓') ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {reason}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium">Key Features:</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            {bank.features.slice(0, 2).map((feature, idx) => (
              <li key={idx}>• {feature}</li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="text-sm">
            <span className="text-muted-foreground">Processing Fee: </span>
            <span className="font-medium">{bank.processingFee}%</span>
          </div>
          <Button variant="outline" size="sm" onClick={onViewDetails}>
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
