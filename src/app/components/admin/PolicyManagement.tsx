import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { FileText, Edit, Save } from 'lucide-react';

export function PolicyManagement() {
  const [editingSection, setEditingSection] = useState<string | null>(null);

  const policySections = [
    {
      id: 'cibil',
      title: '1. CIBIL Score Policy',
      content: 'CIBIL score ranges determine loan eligibility and risk assessment...',
    },
    {
      id: 'salary',
      title: '2. Salary & Multiplier Policy',
      content: 'Loan amount is calculated based on monthly salary multiplied by category-specific multipliers...',
    },
    {
      id: 'obligation',
      title: '3. Obligation Policy',
      content: 'Existing financial obligations must not exceed 50-65% of monthly income...',
    },
    {
      id: 'company',
      title: '4. Company Category Policy',
      content: 'Companies are categorized A through D based on reputation, size, and financial stability...',
    },
    {
      id: 'pincode',
      title: '5. PIN Code Policy',
      content: 'Geographic location affects loan eligibility based on tier classification...',
    },
    {
      id: 'eligibility',
      title: '6. Eligibility Rules',
      content: 'All criteria must be met simultaneously for loan approval...',
    },
    {
      id: 'disclaimer',
      title: '7. Important Disclaimer',
      content: 'This is an indicative tool. Final approval subject to bank discretion...',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Policy Sections */}
      {policySections.map((section) => (
        <Card key={section.id}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900">{section.title}</h3>
              </div>
              <div className="flex gap-2">
                {editingSection === section.id ? (
                  <>
                    <Button size="sm" onClick={() => setEditingSection(null)}>
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingSection(null)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingSection(section.id)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                )}
              </div>
            </div>

            {editingSection === section.id ? (
              <textarea
                className="w-full h-40 p-4 border border-gray-300 rounded-md resize-none font-mono text-sm"
                defaultValue={section.content}
              />
            ) : (
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700">{section.content}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {/* CIBIL Score Ranges */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">CIBIL Score Ranges</h3>
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Edit Ranges
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Range</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Classification</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Risk Level</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">800 - 900</td>
                  <td className="py-3 px-4">Excellent</td>
                  <td className="py-3 px-4 text-green-600">Very Low</td>
                  <td className="py-3 px-4 text-sm text-gray-600">Best rates, highest approval chance</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">750 - 799</td>
                  <td className="py-3 px-4">Very Good</td>
                  <td className="py-3 px-4 text-green-600">Low</td>
                  <td className="py-3 px-4 text-sm text-gray-600">Competitive rates, high approval</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">700 - 749</td>
                  <td className="py-3 px-4">Good</td>
                  <td className="py-3 px-4 text-blue-600">Moderate</td>
                  <td className="py-3 px-4 text-sm text-gray-600">Good rates, moderate approval</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">650 - 699</td>
                  <td className="py-3 px-4">Fair</td>
                  <td className="py-3 px-4 text-orange-600">Medium</td>
                  <td className="py-3 px-4 text-sm text-gray-600">Limited options, higher rates</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Below 650</td>
                  <td className="py-3 px-4">Poor</td>
                  <td className="py-3 px-4 text-red-600">High</td>
                  <td className="py-3 px-4 text-sm text-gray-600">Very limited approval chances</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Company Category Multipliers */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Company Category Multipliers</h3>
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Edit Multipliers
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Multiplier Range</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Examples</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Category A</td>
                  <td className="py-3 px-4">Top Tier / MNC</td>
                  <td className="py-3 px-4 text-green-600 font-medium">24x - 25x</td>
                  <td className="py-3 px-4 text-sm text-gray-600">TCS, Infosys, HUL</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Category B</td>
                  <td className="py-3 px-4">Large Corporate</td>
                  <td className="py-3 px-4 text-blue-600 font-medium">20x - 22x</td>
                  <td className="py-3 px-4 text-sm text-gray-600">Tech Mahindra, Wipro</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Category C</td>
                  <td className="py-3 px-4">Mid-size Company</td>
                  <td className="py-3 px-4 text-orange-600 font-medium">18x - 20x</td>
                  <td className="py-3 px-4 text-sm text-gray-600">Established startups</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Category D</td>
                  <td className="py-3 px-4">Small / Startup</td>
                  <td className="py-3 px-4 text-red-600 font-medium">15x - 18x</td>
                  <td className="py-3 px-4 text-sm text-gray-600">New companies</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
