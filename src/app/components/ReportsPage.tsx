import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  reportKPIs,
  bankPerformanceReport,
  rejectionReasons,
  eligibilityRates,
  agentPerformanceData,
  disbursedLoans,
  monthlyDisbursementTrend,
  leadSourceData,
} from '../data/reportsData';
import {
  FileText,
  Download,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  XCircle,
  IndianRupee,
  Clock,
  Filter,
  Calendar,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from 'recharts';

export function ReportsPage() {
  const [activeTab, setActiveTab] = useState('bank-performance');

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    } else {
      return `₹${amount.toLocaleString()}`;
    }
  };

  const handleExportCSV = () => {
    alert('Exporting to CSV...');
  };

  const handleExportPDF = () => {
    alert('Exporting to PDF...');
  };

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444'];

  return (
    <div className="min-h-[calc(100vh-60px)] bg-gray-50 py-8">
      <div className="container mx-auto px-6 max-w-[1600px]">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports</h1>
              <p className="text-gray-600">Comprehensive analytics and performance insights</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleExportCSV} className="gap-2">
                <Download className="w-4 h-4" />
                Export CSV
              </Button>
              <Button variant="outline" onClick={handleExportPDF} className="gap-2">
                <FileText className="w-4 h-4" />
                Export PDF
              </Button>
            </div>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-4 h-4 text-gray-600" />
                <span className="font-medium text-gray-900">Filters</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Range
                  </label>
                  <div className="flex gap-2">
                    <Input type="date" placeholder="From" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                  <Input type="date" placeholder="To" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bank</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All Banks" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Banks</SelectItem>
                      <SelectItem value="hdfc">HDFC Bank</SelectItem>
                      <SelectItem value="icici">ICICI Bank</SelectItem>
                      <SelectItem value="sbi">SBI</SelectItem>
                      <SelectItem value="axis">Axis Bank</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Type
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="personal">Personal Loan</SelectItem>
                      <SelectItem value="home">Home Loan</SelectItem>
                      <SelectItem value="business">Business Loan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-4 flex gap-3">
                <Button className="gap-2">
                  <Filter className="w-4 h-4" />
                  Apply Filters
                </Button>
                <Button variant="outline">Reset</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">Total Applications</p>
              <p className="text-2xl font-bold text-gray-900">{reportKPIs.totalApplications}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">Approvals</p>
              <p className="text-2xl font-bold text-gray-900">{reportKPIs.approvals}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-red-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">Rejections</p>
              <p className="text-2xl font-bold text-gray-900">{reportKPIs.rejections}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <IndianRupee className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">Disbursed Amount</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(reportKPIs.disbursedAmount)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">Avg ROI</p>
              <p className="text-2xl font-bold text-gray-900">{reportKPIs.averageROI}%</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">Avg Turnaround</p>
              <p className="text-2xl font-bold text-gray-900">
                {reportKPIs.averageTurnaroundTime} days
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabbed Reports */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="bank-performance">Bank Performance</TabsTrigger>
            <TabsTrigger value="eligibility-rejection">
              Eligibility & Rejection Analysis
            </TabsTrigger>
            <TabsTrigger value="agent-performance">Agent Performance</TabsTrigger>
            <TabsTrigger value="disbursement">Disbursement Report</TabsTrigger>
            <TabsTrigger value="lead-source">Lead Source Report</TabsTrigger>
          </TabsList>

          {/* Bank Performance Tab */}
          <TabsContent value="bank-performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Bank-wise Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Bank
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Applications
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Approvals
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Rejections
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Approval Rate
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Avg ROI
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {bankPerformanceReport.map((bank) => (
                        <tr key={bank.bank} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-gray-900">{bank.bank}</td>
                          <td className="px-6 py-4 text-gray-900">{bank.applications}</td>
                          <td className="px-6 py-4">
                            <Badge className="bg-green-100 text-green-700 border-green-300">
                              {bank.approvals}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">
                            <Badge className="bg-red-100 text-red-700 border-red-300">
                              {bank.rejections}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-20 bg-gray-200 rounded-full h-2">
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
                          <td className="px-6 py-4 font-semibold text-gray-900">
                            {bank.averageROI}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bank Approval Rate Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={bankPerformanceReport}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="bank" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="approvalRate" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Eligibility & Rejection Analysis Tab */}
          <TabsContent value="eligibility-rejection" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Rejection Reasons</CardTitle>
                  <p className="text-sm text-gray-600">Distribution of rejection causes</p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie
                        data={rejectionReasons}
                        dataKey="count"
                        nameKey="reason"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label={(entry) => `${entry.percentage}%`}
                      >
                        {rejectionReasons.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-6 space-y-2">
                    {rejectionReasons.map((reason, index) => (
                      <div key={reason.reason} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span className="text-sm text-gray-900">{reason.reason}</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">
                          {reason.count} ({reason.percentage}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Eligibility Success Rates</CardTitle>
                  <p className="text-sm text-gray-600">Bank-wise eligibility comparison</p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={eligibilityRates}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="bank" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="eligibilityRate" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="mt-6 space-y-3">
                    {eligibilityRates.map((rate) => (
                      <div key={rate.bank} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900">{rate.bank}</span>
                          <span className="text-sm font-semibold text-purple-600">
                            {rate.eligibilityRate}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-purple-600 h-2 rounded-full"
                            style={{ width: `${rate.eligibilityRate}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Agent Performance Tab */}
          <TabsContent value="agent-performance">
            <Card>
              <CardHeader>
                <CardTitle>Agent-wise Performance Summary</CardTitle>
                <p className="text-sm text-gray-600">
                  Individual agent metrics and conversion rates
                </p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Agent Name
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Agent ID
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Leads Handled
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Approvals
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Conversion %
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Disbursed Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {agentPerformanceData.map((agent) => (
                        <tr key={agent.agentId} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-gray-900">
                            {agent.agentName}
                          </td>
                          <td className="px-6 py-4">
                            <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                              {agent.agentId}
                            </code>
                          </td>
                          <td className="px-6 py-4 text-gray-900">{agent.leadsHandled}</td>
                          <td className="px-6 py-4">
                            <Badge className="bg-blue-100 text-blue-700 border-blue-300">
                              {agent.approvals}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-green-600 h-2 rounded-full"
                                  style={{ width: `${Math.min(agent.conversionRate, 100)}%` }}
                                />
                              </div>
                              <span className="text-sm font-semibold text-gray-900">
                                {agent.conversionRate}%
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900">
                            {formatCurrency(agent.disbursedAmount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Disbursement Report Tab */}
          <TabsContent value="disbursement" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Disbursed Loans</CardTitle>
                <p className="text-sm text-gray-600">Latest loan disbursement details</p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Loan ID
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Bank
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Customer
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Amount
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          ROI
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Tenure
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {disbursedLoans.map((loan) => (
                        <tr key={loan.loanId} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <code className="text-sm font-mono bg-blue-50 text-blue-700 px-2 py-1 rounded">
                              {loan.loanId}
                            </code>
                          </td>
                          <td className="px-6 py-4 font-medium text-gray-900">{loan.bank}</td>
                          <td className="px-6 py-4 text-gray-900">{loan.customerName}</td>
                          <td className="px-6 py-4 font-semibold text-gray-900">
                            {formatCurrency(loan.amount)}
                          </td>
                          <td className="px-6 py-4">
                            <Badge className="bg-purple-100 text-purple-700 border-purple-300">
                              {loan.roi}%
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-gray-900">{loan.tenure} months</td>
                          <td className="px-6 py-4 text-gray-900">
                            {new Date(loan.date).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Disbursement Trend</CardTitle>
                <p className="text-sm text-gray-600">
                  Disbursement amount and volume over time
                </p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={monthlyDisbursementTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis
                      yAxisId="left"
                      tickFormatter={(value) => `${(value / 10000000).toFixed(1)}Cr`}
                    />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip
                      formatter={(value: any, name: string) => {
                        if (name === 'amount') {
                          return [formatCurrency(value), 'Amount'];
                        }
                        return [value, 'Count'];
                      }}
                    />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="amount"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="count"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Lead Source Report Tab */}
          <TabsContent value="lead-source">
            <Card>
              <CardHeader>
                <CardTitle>Lead Source Performance</CardTitle>
                <p className="text-sm text-gray-600">
                  Conversion and revenue by lead source
                </p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Source
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Total Leads
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Conversions
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Conversion Rate
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Revenue Generated
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {leadSourceData.map((source) => (
                        <tr key={source.source} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-gray-900">{source.source}</td>
                          <td className="px-6 py-4 text-gray-900">{source.leads}</td>
                          <td className="px-6 py-4">
                            <Badge className="bg-green-100 text-green-700 border-green-300">
                              {source.conversions}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full"
                                  style={{ width: `${Math.min(source.conversionRate, 100)}%` }}
                                />
                              </div>
                              <span className="text-sm font-semibold text-gray-900">
                                {source.conversionRate}%
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900">
                            {formatCurrency(source.revenue)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}