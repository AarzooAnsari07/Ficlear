import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import {
  dashboardKPIs,
  leadFunnelData,
  eligibilityInsights,
  bankPerformanceData,
  todaysTasks,
  recentActivities,
} from '../data/dashboardData';
import {
  TrendingUp,
  TrendingDown,
  Users,
  CheckCircle,
  XCircle,
  IndianRupee,
  Clock,
  ChevronRight,
  AlertCircle,
  Activity as ActivityIcon,
  CheckCircle2,
  XOctagon,
  Phone,
  FileText,
  Calendar,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export function DashboardPage() {
  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    } else {
      return `₹${amount.toLocaleString()}`;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'lead_created':
        return <Users className="w-4 h-4" />;
      case 'eligibility_checked':
        return <FileText className="w-4 h-4" />;
      case 'approval':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'rejection':
        return <XOctagon className="w-4 h-4 text-red-600" />;
      case 'disbursed':
        return <IndianRupee className="w-4 h-4 text-green-600" />;
      case 'follow_up':
        return <Phone className="w-4 h-4" />;
      default:
        return <ActivityIcon className="w-4 h-4" />;
    }
  };

  const getActivityBgColor = (type: string) => {
    switch (type) {
      case 'approval':
      case 'disbursed':
        return 'bg-green-100';
      case 'rejection':
        return 'bg-red-100';
      case 'lead_created':
        return 'bg-blue-100';
      case 'eligibility_checked':
        return 'bg-purple-100';
      case 'follow_up':
        return 'bg-yellow-100';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <div className="min-h-[calc(100vh-60px)] bg-gray-50 py-8">
      <div className="container mx-auto px-6 max-w-[1600px]">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Overview of your loan origination performance</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {/* Total Leads */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <Badge className="bg-blue-50 text-blue-700 border-blue-200">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12%
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-1">Total Leads</p>
              <p className="text-3xl font-bold text-gray-900">{dashboardKPIs.totalLeads}</p>
              <p className="text-xs text-gray-500 mt-2">This month</p>
            </CardContent>
          </Card>

          {/* Eligible Leads */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
                <Badge className="bg-purple-50 text-purple-700 border-purple-200">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +8%
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-1">Eligible Leads</p>
              <p className="text-3xl font-bold text-gray-900">{dashboardKPIs.eligibleLeads}</p>
              <p className="text-xs text-gray-500 mt-2">
                {((dashboardKPIs.eligibleLeads / dashboardKPIs.totalLeads) * 100).toFixed(0)}% of
                total
              </p>
            </CardContent>
          </Card>

          {/* Approvals */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <Badge className="bg-green-50 text-green-700 border-green-200">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +15%
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-1">Approvals</p>
              <p className="text-3xl font-bold text-gray-900">{dashboardKPIs.approvals}</p>
              <p className="text-xs text-gray-500 mt-2">
                {((dashboardKPIs.approvals / dashboardKPIs.eligibleLeads) * 100).toFixed(0)}%
                conversion
              </p>
            </CardContent>
          </Card>

          {/* Rejections */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
                <Badge className="bg-red-50 text-red-700 border-red-200">
                  <TrendingDown className="w-3 h-3 mr-1" />
                  -5%
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-1">Rejections</p>
              <p className="text-3xl font-bold text-gray-900">{dashboardKPIs.rejections}</p>
              <p className="text-xs text-gray-500 mt-2">
                {((dashboardKPIs.rejections / dashboardKPIs.eligibleLeads) * 100).toFixed(0)}% rate
              </p>
            </CardContent>
          </Card>

          {/* Disbursed Amount */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <IndianRupee className="w-6 h-6 text-emerald-600" />
                </div>
                <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +22%
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-1">Disbursed Amount</p>
              <p className="text-3xl font-bold text-gray-900">
                {formatCurrency(dashboardKPIs.disbursedAmount)}
              </p>
              <p className="text-xs text-gray-500 mt-2">Total value</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Lead Funnel Visualization */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Lead Funnel</CardTitle>
              <p className="text-sm text-gray-600">Conversion stages from lead to disbursement</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={leadFunnelData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="stage" type="category" width={100} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-3 border rounded-lg shadow-lg">
                            <p className="font-medium text-gray-900">{payload[0].payload.stage}</p>
                            <p className="text-sm text-gray-600">
                              Count: <span className="font-semibold">{payload[0].payload.count}</span>
                            </p>
                            <p className="text-sm text-gray-600">
                              Percentage:{' '}
                              <span className="font-semibold">{payload[0].payload.percentage}%</span>
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                    {leadFunnelData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          index === 0
                            ? '#3b82f6'
                            : index === 1
                            ? '#8b5cf6'
                            : index === 2
                            ? '#f59e0b'
                            : index === 3
                            ? '#10b981'
                            : '#059669'
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-5 gap-4 mt-4">
                {leadFunnelData.map((stage, index) => (
                  <div key={stage.stage} className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{stage.count}</div>
                    <div className="text-xs text-gray-600">{stage.stage}</div>
                    <div className="text-xs font-semibold text-blue-600">{stage.percentage}%</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Eligibility Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Eligibility Insights</CardTitle>
              <p className="text-sm text-gray-600">Bank-wise success rates</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {eligibilityInsights.map((insight) => (
                  <div key={insight.bank} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{insight.bank}</span>
                      <span className="text-sm text-gray-600">
                        {insight.avgProcessingTime} days
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Eligibility Rate</span>
                        <span className="font-semibold text-blue-600">
                          {insight.eligibilityRate}%
                        </span>
                      </div>
                      <Progress value={insight.eligibilityRate} className="h-2 bg-gray-200">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${insight.eligibilityRate}%` }}
                        />
                      </Progress>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Approval Rate</span>
                        <span className="font-semibold text-green-600">
                          {insight.approvalRate}%
                        </span>
                      </div>
                      <Progress value={insight.approvalRate} className="h-2 bg-gray-200">
                        <div
                          className="h-full bg-green-600 rounded-full"
                          style={{ width: `${insight.approvalRate}%` }}
                        />
                      </Progress>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bank-wise Performance Table */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Bank-wise Performance</CardTitle>
            <p className="text-sm text-gray-600">Detailed breakdown of submissions and outcomes</p>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Bank
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Submitted
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Approved
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Rejected
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Pending
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Disbursed
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Approval Rate
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {bankPerformanceData.map((bank) => (
                    <tr key={bank.bank} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{bank.logo}</span>
                          <span className="font-medium text-gray-900">{bank.bank}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-gray-900">{bank.leadsSubmitted}</span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className="bg-green-100 text-green-700 border-green-300">
                          {bank.approved}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className="bg-red-100 text-red-700 border-red-300">
                          {bank.rejected}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">
                          {bank.pending}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-900">
                          {formatCurrency(bank.disbursed)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${bank.approvalRate}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-gray-900">
                            {bank.approvalRate}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Tasks */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Today's Tasks</CardTitle>
                  <p className="text-sm text-gray-600">
                    {todaysTasks.filter((t) => t.status === 'pending').length} pending tasks
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {todaysTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-start gap-3 p-4 rounded-lg border hover:border-blue-300 hover:bg-blue-50/50 transition-all cursor-pointer"
                  >
                    <div className="mt-1">
                      {task.status === 'completed' ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : task.status === 'in-progress' ? (
                        <Clock className="w-5 h-5 text-yellow-600" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <p className="font-medium text-gray-900">{task.title}</p>
                        <Badge className={`${getPriorityColor(task.priority)} text-xs border`}>
                          {task.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {task.dueTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {task.leadName}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 mt-1" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity Timeline */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Activity</CardTitle>
                  <p className="text-sm text-gray-600">Latest updates and events</p>
                </div>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={activity.id} className="flex gap-3">
                    <div className="relative">
                      <div
                        className={`w-8 h-8 rounded-full ${getActivityBgColor(
                          activity.type
                        )} flex items-center justify-center`}
                      >
                        {getActivityIcon(activity.type)}
                      </div>
                      {index < recentActivities.length - 1 && (
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-gray-200" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-start justify-between mb-1">
                        <p className="font-medium text-gray-900">{activity.title}</p>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{activity.description}</p>
                      {activity.leadName && (
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {activity.leadName}
                          </Badge>
                          {activity.amount && (
                            <span className="text-xs font-semibold text-green-600">
                              {formatCurrency(activity.amount)}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}