import { useState } from 'react';
import { EligibilityResult } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import {
  Plus,
  CheckCircle,
  AlertCircle,
  XCircle,
  TrendingUp,
  Sparkles,
  IndianRupee,
} from 'lucide-react';
import { Separator } from './ui/separator';

interface InsightsPanelProps {
  results: EligibilityResult[];
}

export function InsightsPanel({ results }: InsightsPanelProps) {
  const [noteText, setNoteText] = useState('');

  const eligibleResults = results.filter((r) => r.isEligible);
  const topOffers = eligibleResults.slice(0, 4);
  const approvalProbability = Math.round((eligibleResults.length / results.length) * 100);

  const handleAddNote = () => {
    if (noteText.trim()) {
      // Handle note addition
      setNoteText('');
    }
  };

  return (
    <div className="w-96 bg-white border-l sticky top-[60px] h-[calc(100vh-60px)] overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Add Note */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm text-gray-900">Notes</h3>
            <Button size="sm" variant="ghost" className="text-blue-600 h-auto p-0">
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
          <Card>
            <CardContent className="p-3">
              <Textarea
                placeholder="Add a note about this lead..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                className="min-h-[80px] text-sm resize-none border-0 p-0 focus-visible:ring-0"
              />
              <div className="flex justify-end mt-2">
                <Button size="sm" onClick={handleAddNote} disabled={!noteText.trim()}>
                  Save Note
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator />

        {/* Bank Offers Comparison */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm text-gray-900">Bank Offers</h3>
            <Badge variant="outline" className="text-green-600 border-green-600">
              {eligibleResults.length} Eligible
            </Badge>
          </div>

          <div className="space-y-3">
            {topOffers.map((result) => {
              const statusColor =
                approvalProbability > 70
                  ? 'text-green-600'
                  : approvalProbability > 40
                  ? 'text-orange-600'
                  : 'text-gray-600';
              const statusBg =
                approvalProbability > 70
                  ? 'bg-green-50'
                  : approvalProbability > 40
                  ? 'bg-orange-50'
                  : 'bg-gray-50';
              const statusText =
                approvalProbability > 70 ? 'High' : approvalProbability > 40 ? 'Medium' : 'Low';

              return (
                <Card key={result.bank.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{result.bank.logo}</span>
                        <div>
                          <p className="font-semibold text-sm text-gray-900">{result.bank.name}</p>
                          <p className="text-xs text-gray-500">
                            EMI: ₹{result.emi?.toLocaleString('en-IN')}
                          </p>
                        </div>
                      </div>
                      <Badge className={`${statusBg} ${statusColor} border-0`}>
                        {statusText}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-green-600">
                        <TrendingUp className="w-4 h-4" />
                        <span className="font-semibold">{result.bank.roi}% ROI</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <IndianRupee className="w-4 h-4" />
                        <span>{result.bank.processingFee}% fee</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {eligibleResults.length > 4 && (
              <Button variant="outline" className="w-full" size="sm">
                View All {eligibleResults.length} Offers
              </Button>
            )}
          </div>
        </div>

        <Separator />

        {/* Approval Probability */}
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-4">
            <h3 className="font-semibold text-sm text-gray-900 mb-3">Approval Probability</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-700">{approvalProbability}%</span>
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
              <Progress value={approvalProbability} className="h-2" />
              <p className="text-xs text-gray-600">
                Based on {eligibleResults.length} out of {results.length} banks
              </p>
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* AI Recommendations */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <h3 className="font-semibold text-sm text-gray-900">AI Recommendations</h3>
          </div>

          <div className="space-y-2">
            <Card className="border-green-200">
              <CardContent className="p-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">High CIBIL Score</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Excellent credit profile increases approval chances
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-200">
              <CardContent className="p-3">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Reduce Obligations</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Lower monthly obligations to qualify for more banks
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {eligibleResults.length > 0 && (
              <Card className="border-blue-200">
                <CardContent className="p-3">
                  <div className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Best Offer Available</p>
                      <p className="text-xs text-gray-600 mt-1">
                        {eligibleResults[0].bank.name} offers lowest ROI at {eligibleResults[0].bank.roi}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
