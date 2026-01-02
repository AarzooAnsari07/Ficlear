import { CustomerProfile } from '../types';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Phone, Mail, MessageSquare, TrendingUp, Sparkles, Star } from 'lucide-react';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';

interface LeadSummaryPanelProps {
  customer: CustomerProfile;
  eligibleCount: number;
  totalBanks: number;
}

export function LeadSummaryPanel({ customer, eligibleCount, totalBanks }: LeadSummaryPanelProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const approvalProbability = Math.round((eligibleCount / totalBanks) * 100);
  const leadQuality = approvalProbability > 70 ? 'Hot' : approvalProbability > 40 ? 'Warm' : 'Cold';
  const qualityColor =
    leadQuality === 'Hot' ? 'bg-green-500' : leadQuality === 'Warm' ? 'bg-orange-500' : 'bg-blue-500';

  return (
    <div className="w-80 bg-white border-r sticky top-[60px] h-[calc(100vh-60px)] overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Lead Profile */}
        <div className="text-center">
          <Avatar className="w-20 h-20 mx-auto mb-3">
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl">
              {getInitials(customer.name)}
            </AvatarFallback>
          </Avatar>
          <h2 className="font-semibold text-lg text-gray-900">{customer.name}</h2>
          <p className="text-sm text-gray-500 mt-1">Lead ID: #LD-{customer.areaPincode}</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Badge className={`${qualityColor} text-white`}>{leadQuality} Lead</Badge>
            <Badge variant="outline" className="text-gray-600">
              <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
              {customer.cibilScore}
            </Badge>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-2">
          <Button variant="outline" className="flex-col h-auto py-3 gap-1">
            <Phone className="w-5 h-5 text-green-600" />
            <span className="text-xs">Call</span>
          </Button>
          <Button variant="outline" className="flex-col h-auto py-3 gap-1">
            <MessageSquare className="w-5 h-5 text-green-600" />
            <span className="text-xs">WhatsApp</span>
          </Button>
          <Button variant="outline" className="flex-col h-auto py-3 gap-1">
            <Mail className="w-5 h-5 text-blue-600" />
            <span className="text-xs">Email</span>
          </Button>
        </div>

        <Separator />

        {/* AI Insights */}
        <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-sm text-gray-900">AI Insights</h3>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-700">Approval Probability</span>
                  <span className="text-lg font-bold text-purple-700">{approvalProbability}%</span>
                </div>
                <Progress value={approvalProbability} className="h-2" />
              </div>

              <div className="text-xs text-gray-600">
                High likelihood of approval from {eligibleCount} banks based on profile analysis
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Best Action */}
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-orange-600" />
              <h3 className="font-semibold text-sm text-gray-900">Next Best Action</h3>
            </div>
            <p className="text-sm text-gray-700 mb-3">
              Schedule a call to discuss the best bank offers and documentation requirements
            </p>
            <Button size="sm" className="w-full bg-orange-600 hover:bg-orange-700">
              Schedule Call
            </Button>
          </CardContent>
        </Card>

        {/* Lead Quality Score */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-sm text-gray-900 mb-3">Lead Quality Score</h3>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <Progress value={85} className="h-2" />
              </div>
              <span className="text-lg font-bold text-green-600">85/100</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">Based on CIBIL, income, and eligibility</p>
          </CardContent>
        </Card>

        <Separator />

        {/* Key Properties */}
        <div>
          <h3 className="font-semibold text-sm text-gray-900 mb-3">Key Properties</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-sm text-gray-500">Loan Type</span>
              <span className="text-sm font-medium text-gray-900">Personal Loan</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-sm text-gray-500">Monthly Salary</span>
              <span className="text-sm font-medium text-gray-900">
                ₹{customer.monthlySalary.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-sm text-gray-500">Company Category</span>
              <span className="text-sm font-medium text-gray-900">Category {customer.companyCategory}</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-sm text-gray-500">CIBIL Score</span>
              <span className="text-sm font-medium text-green-600">{customer.cibilScore}</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-sm text-gray-500">Loan Amount</span>
              <span className="text-sm font-medium text-gray-900">
                ₹{customer.loanAmount.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-sm text-gray-500">Obligations</span>
              <span className="text-sm font-medium text-gray-900">
                ₹{customer.monthlyObligations.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
