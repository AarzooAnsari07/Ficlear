import { EligibilityResult, CustomerProfile } from '../types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import {
  CheckCircle,
  XCircle,
  FileText,
  Mail,
  Phone,
  MessageSquare,
  Upload,
  Clock,
  TrendingUp,
  User,
  Building,
} from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

interface ActivityTimelineCenterProps {
  customer: CustomerProfile;
  results: EligibilityResult[];
}

export function ActivityTimelineCenter({ customer, results }: ActivityTimelineCenterProps) {
  const eligibleBanks = results.filter((r) => r.isEligible);

  const activities = [
    {
      id: '1',
      type: 'eligibility',
      icon: FileText,
      title: 'Eligibility Check Completed',
      description: `Checked eligibility across ${results.length} banks. ${eligibleBanks.length} banks approved.`,
      timestamp: '2 minutes ago',
      status: 'success',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      details: `${eligibleBanks.length} eligible, ${results.length - eligibleBanks.length} not eligible`,
    },
    ...eligibleBanks.slice(0, 2).map((result, idx) => ({
      id: `bank-${idx}`,
      type: 'approval',
      icon: CheckCircle,
      title: `${result.bank.name} - Approved`,
      description: `ROI: ${result.bank.roi}% | EMI: ₹${result.emi?.toLocaleString('en-IN')}`,
      timestamp: `${3 + idx} minutes ago`,
      status: 'success',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      details: `Processing fee: ${result.bank.processingFee}%`,
    })),
    {
      id: '2',
      type: 'email',
      icon: Mail,
      title: 'Welcome Email Sent',
      description: 'Subject: Your loan application has been received',
      timestamp: '15 minutes ago',
      status: 'neutral',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      details: 'Opened: Yes',
    },
    {
      id: '3',
      type: 'call',
      icon: Phone,
      title: 'Call Logged',
      description: 'Discussed loan requirements and documentation',
      timestamp: '1 hour ago',
      status: 'neutral',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      details: 'Duration: 8 minutes',
    },
    {
      id: '4',
      type: 'document',
      icon: Upload,
      title: 'Documents Uploaded',
      description: 'Salary slips for last 3 months uploaded',
      timestamp: '2 hours ago',
      status: 'neutral',
      bgColor: 'bg-orange-100',
      iconColor: 'text-orange-600',
      details: '3 files',
    },
    {
      id: '5',
      type: 'lead',
      icon: User,
      title: 'Lead Created',
      description: 'New lead added to the system',
      timestamp: 'Today, 9:30 AM',
      status: 'neutral',
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-600',
      details: 'Source: Website',
    },
  ];

  return (
    <div className="flex-1 bg-gray-50 overflow-y-auto">
      <div className="p-6">
        <Tabs defaultValue="activity" className="w-full">
          <TabsList className="bg-white border">
            <TabsTrigger value="activity">Activity History</TabsTrigger>
            <TabsTrigger value="details">Lead Details</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          {/* Activity History */}
          <TabsContent value="activity" className="mt-6">
            <div className="space-y-6">
              {/* Timeline */}
              <div className="relative space-y-4">
                {/* Timeline line */}
                <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gray-200" />

                {activities.map((activity, index) => (
                  <div key={activity.id} className="relative flex gap-4">
                    {/* Icon */}
                    <div
                      className={`relative z-10 w-12 h-12 rounded-full ${activity.bgColor} flex items-center justify-center flex-shrink-0`}
                    >
                      <activity.icon className={`w-5 h-5 ${activity.iconColor}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-4">
                      <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                              <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              {activity.timestamp}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-3">
                            <Badge variant="outline" className="text-xs">
                              {activity.details}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Lead Details */}
          <TabsContent value="details" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Lead Information</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-500 block mb-1">Full Name</label>
                    <p className="font-medium text-gray-900">{customer.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 block mb-1">CIBIL Score</label>
                    <p className="font-medium text-gray-900">{customer.cibilScore}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 block mb-1">Monthly Salary</label>
                    <p className="font-medium text-gray-900">
                      ₹{customer.monthlySalary.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 block mb-1">Company Category</label>
                    <p className="font-medium text-gray-900">Category {customer.companyCategory}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 block mb-1">Monthly Obligations</label>
                    <p className="font-medium text-gray-900">
                      ₹{customer.monthlyObligations.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 block mb-1">Area Pincode</label>
                    <p className="font-medium text-gray-900">{customer.areaPincode}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 block mb-1">Loan Amount</label>
                    <p className="font-medium text-gray-900">
                      ₹{customer.loanAmount.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 block mb-1">Loan Tenure</label>
                    <p className="font-medium text-gray-900">{customer.loanTenure} months</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Opportunities */}
          <TabsContent value="opportunities" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Bank Opportunities</h3>
                <Badge className="bg-green-600">
                  {eligibleBanks.length} Eligible Banks
                </Badge>
              </div>

              {results.map((result) => (
                <Card
                  key={result.bank.id}
                  className={result.isEligible ? 'border-green-200' : 'border-gray-200'}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="text-3xl">{result.bank.logo}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{result.bank.name}</h4>
                          <div className="flex items-center gap-4 mt-2 text-sm">
                            <div className="flex items-center gap-1">
                              <TrendingUp className="w-4 h-4 text-green-600" />
                              <span className="font-medium">{result.bank.roi}% ROI</span>
                            </div>
                            {result.emi && (
                              <div className="text-gray-600">
                                EMI: ₹{result.emi.toLocaleString('en-IN')}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant={result.isEligible ? 'default' : 'secondary'}
                        className={result.isEligible ? 'bg-green-600' : ''}
                      >
                        {result.isEligible ? (
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
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tasks */}
          <TabsContent value="tasks" className="mt-6">
            <Card>
              <CardContent className="p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <CheckCircle className="w-12 h-12 mx-auto" />
                </div>
                <p className="text-gray-500 mb-4">No tasks created yet</p>
                <Button>Create New Task</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents */}
          <TabsContent value="documents" className="mt-6">
            <div className="grid grid-cols-2 gap-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded flex items-center justify-center">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">CIBIL Report</p>
                      <p className="text-sm text-gray-500">Score: {customer.cibilScore}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded flex items-center justify-center">
                      <Upload className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Salary Slips</p>
                      <p className="text-sm text-gray-500">Last 3 months</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notes */}
          <TabsContent value="notes" className="mt-6">
            <Card>
              <CardContent className="p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <FileText className="w-12 h-12 mx-auto" />
                </div>
                <p className="text-gray-500 mb-4">No notes added yet</p>
                <Button>Add First Note</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
