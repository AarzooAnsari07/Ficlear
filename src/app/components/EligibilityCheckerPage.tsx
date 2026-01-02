import { useState } from 'react';
import { CustomerProfile } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react';

interface EligibilityCheckerPageProps {
  onComplete: (profile: CustomerProfile) => void;
}

export function EligibilityCheckerPage({ onComplete }: EligibilityCheckerPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<CustomerProfile>>({
    name: '',
    cibilScore: 750,
    monthlySalary: 50000,
    monthlyObligations: 10000,
    companyCategory: 'A',
    areaPincode: '',
    loanAmount: 1000000,
    loanTenure: 240,
  });

  const steps = [
    { id: 1, title: 'Personal Info', description: 'Basic customer details' },
    { id: 2, title: 'Income & Obligations', description: 'Financial information' },
    { id: 3, title: 'Credit Profile', description: 'CIBIL and credit details' },
    { id: 4, title: 'Loan Details', description: 'Amount and tenure' },
  ];

  const updateField = (field: keyof CustomerProfile, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit form
      if (
        formData.name &&
        formData.cibilScore &&
        formData.monthlySalary &&
        formData.monthlyObligations !== undefined &&
        formData.companyCategory &&
        formData.areaPincode &&
        formData.loanAmount &&
        formData.loanTenure
      ) {
        onComplete(formData as CustomerProfile);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progressPercentage = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-[calc(100vh-60px)] bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Progress Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Eligibility Checker</h1>
          <p className="text-gray-600 mb-6">
            Complete the form to check loan eligibility across multiple banks
          </p>

          {/* Progress Bar */}
          <div className="mb-4">
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* Steps */}
          <div className="flex justify-between">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= step.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {currentStep > step.id ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{step.title}</p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <Card>
          <CardHeader>
            <CardTitle>{steps[currentStep - 1].title}</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Step 1: Personal Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter customer's full name"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pincode">Area Pincode *</Label>
                  <Input
                    id="pincode"
                    placeholder="e.g., 400001"
                    maxLength={6}
                    value={formData.areaPincode}
                    onChange={(e) => updateField('areaPincode', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Company Category *</Label>
                  <Select
                    value={formData.companyCategory}
                    onValueChange={(value: any) => updateField('companyCategory', value)}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">Category A - MNC/Top Tier</SelectItem>
                      <SelectItem value="B">Category B - Large Corporate</SelectItem>
                      <SelectItem value="C">Category C - Mid-size Company</SelectItem>
                      <SelectItem value="D">Category D - Small Company/Startup</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 2: Income & Obligations */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="salary">Monthly Salary *</Label>
                  <Input
                    id="salary"
                    type="number"
                    placeholder="e.g., 50000"
                    value={formData.monthlySalary}
                    onChange={(e) => updateField('monthlySalary', parseInt(e.target.value))}
                    required
                  />
                  <p className="text-sm text-gray-500">Enter gross monthly salary in ₹</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="obligations">Monthly Obligations *</Label>
                  <Input
                    id="obligations"
                    type="number"
                    placeholder="e.g., 10000"
                    value={formData.monthlyObligations}
                    onChange={(e) => updateField('monthlyObligations', parseInt(e.target.value))}
                    required
                  />
                  <p className="text-sm text-gray-500">
                    Include EMIs, credit card payments, and other loan obligations
                  </p>
                </div>

                {formData.monthlySalary && formData.monthlyObligations !== undefined && (
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">Obligation Ratio</span>
                        <Badge variant="outline">
                          {((formData.monthlyObligations / formData.monthlySalary) * 100).toFixed(
                            1
                          )}
                          %
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Step 3: Credit Profile */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="cibil">CIBIL Score *</Label>
                  <Input
                    id="cibil"
                    type="number"
                    min="300"
                    max="900"
                    placeholder="e.g., 750"
                    value={formData.cibilScore}
                    onChange={(e) => updateField('cibilScore', parseInt(e.target.value))}
                    required
                  />
                  <p className="text-sm text-gray-500">Score range: 300-900</p>
                </div>

                {formData.cibilScore && (
                  <Card
                    className={
                      formData.cibilScore >= 750
                        ? 'bg-green-50 border-green-200'
                        : formData.cibilScore >= 650
                        ? 'bg-orange-50 border-orange-200'
                        : 'bg-red-50 border-red-200'
                    }
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Credit Score Rating</span>
                        <Badge
                          className={
                            formData.cibilScore >= 750
                              ? 'bg-green-600'
                              : formData.cibilScore >= 650
                              ? 'bg-orange-600'
                              : 'bg-red-600'
                          }
                        >
                          {formData.cibilScore >= 750
                            ? 'Excellent'
                            : formData.cibilScore >= 650
                            ? 'Good'
                            : 'Fair'}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Step 4: Loan Details */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="loanAmount">Loan Amount Required *</Label>
                  <Input
                    id="loanAmount"
                    type="number"
                    placeholder="e.g., 1000000"
                    value={formData.loanAmount}
                    onChange={(e) => updateField('loanAmount', parseInt(e.target.value))}
                    required
                  />
                  <p className="text-sm text-gray-500">Enter amount in ₹</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tenure">Loan Tenure *</Label>
                  <Select
                    value={formData.loanTenure?.toString()}
                    onValueChange={(value) => updateField('loanTenure', parseInt(value))}
                  >
                    <SelectTrigger id="tenure">
                      <SelectValue placeholder="Select tenure" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="60">5 years (60 months)</SelectItem>
                      <SelectItem value="120">10 years (120 months)</SelectItem>
                      <SelectItem value="180">15 years (180 months)</SelectItem>
                      <SelectItem value="240">20 years (240 months)</SelectItem>
                      <SelectItem value="300">25 years (300 months)</SelectItem>
                      <SelectItem value="360">30 years (360 months)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Summary */}
                <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-sm mb-3">Application Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Customer Name</span>
                        <span className="font-medium">{formData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">CIBIL Score</span>
                        <span className="font-medium">{formData.cibilScore}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monthly Salary</span>
                        <span className="font-medium">
                          ₹{formData.monthlySalary?.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Loan Amount</span>
                        <span className="font-medium">
                          ₹{formData.loanAmount?.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button onClick={handleNext}>
                {currentStep === steps.length ? 'Check Eligibility' : 'Next'}
                {currentStep < steps.length && <ChevronRight className="w-4 h-4 ml-2" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
