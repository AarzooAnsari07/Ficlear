import { EligibilityResult } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Badge } from './ui/badge';
import { CheckCircle, XCircle, IndianRupee, TrendingUp, TrendingDown } from 'lucide-react';

interface ComparisonTableProps {
  results: EligibilityResult[];
}

export function ComparisonTable({ results }: ComparisonTableProps) {
  const eligibleResults = results.filter((r) => r.isEligible);
  const notEligibleResults = results.filter((r) => !r.isEligible);

  return (
    <div className="space-y-6">
      {/* Eligible Banks */}
      {eligibleResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              Eligible Banks ({eligibleResults.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bank</TableHead>
                    <TableHead>ROI p.a.</TableHead>
                    <TableHead>Monthly EMI</TableHead>
                    <TableHead>Total Interest</TableHead>
                    <TableHead>Processing Fee</TableHead>
                    <TableHead>Recommendation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {eligibleResults.map((result, idx) => {
                    const isBestROI = idx === 0;
                    const isLowestEMI =
                      result.emi ===
                      Math.min(...eligibleResults.map((r) => r.emi || Infinity));

                    return (
                      <TableRow key={result.bank.id} className={isBestROI ? 'bg-green-50' : ''}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{result.bank.logo}</span>
                            <div>
                              <p className="font-medium">{result.bank.name}</p>
                              {isBestROI && (
                                <Badge variant="default" className="text-xs mt-1">
                                  Best ROI
                                </Badge>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4 text-green-600" />
                            <span className="font-semibold">{result.bank.roi}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <IndianRupee className="w-4 h-4" />
                            <span>{result.emi?.toLocaleString('en-IN')}</span>
                            {isLowestEMI && (
                              <Badge variant="outline" className="text-xs ml-2">
                                Lowest
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <IndianRupee className="w-4 h-4" />
                            <span>{result.totalInterest?.toLocaleString('en-IN')}</span>
                          </div>
                        </TableCell>
                        <TableCell>{result.bank.processingFee}%</TableCell>
                        <TableCell>
                          {isBestROI ? (
                            <div className="flex items-center gap-1 text-green-600">
                              <TrendingUp className="w-4 h-4" />
                              <span className="text-sm font-medium">Recommended</span>
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">Consider</span>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Not Eligible Banks */}
      {notEligibleResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <XCircle className="w-5 h-5" />
              Not Eligible Banks ({notEligibleResults.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bank</TableHead>
                    <TableHead>ROI p.a.</TableHead>
                    <TableHead>Primary Reason</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notEligibleResults.map((result) => {
                    const primaryReason = result.reasons.find((r) => !r.startsWith('✓'));

                    return (
                      <TableRow key={result.bank.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{result.bank.logo}</span>
                            <span className="font-medium">{result.bank.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <TrendingDown className="w-4 h-4 text-muted-foreground" />
                            <span>{result.bank.roi}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-red-600 text-sm">{primaryReason}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
