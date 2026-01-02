import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import {
  Shield,
  Lock,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  AlertCircle,
  Clock,
} from 'lucide-react';
import { Separator } from './ui/separator';

export function ChangePasswordPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [requirements, setRequirements] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  const handleNewPasswordChange = (value: string) => {
    setFormData({ ...formData, newPassword: value });

    // Check requirements
    const newRequirements = {
      minLength: value.length >= 8,
      hasUpperCase: /[A-Z]/.test(value),
      hasLowerCase: /[a-z]/.test(value),
      hasNumber: /[0-9]/.test(value),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
    };
    setRequirements(newRequirements);

    // Calculate strength
    const strength = Object.values(newRequirements).filter(Boolean).length;
    setPasswordStrength(strength);
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-red-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    if (passwordStrength <= 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength <= 3) return 'Fair';
    if (passwordStrength <= 4) return 'Good';
    return 'Strong';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    alert('Password changed successfully!');
    // Reset form
    setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="min-h-[calc(100vh-60px)] bg-gray-50 py-8">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Change Password</h1>
          <p className="text-gray-600">Update your password to keep your account secure</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-blue-600" />
                  <div>
                    <CardTitle>Password Settings</CardTitle>
                    <CardDescription>Enter your current and new password</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Current Password */}
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={formData.currentPassword}
                        onChange={(e) =>
                          setFormData({ ...formData, currentPassword: e.target.value })
                        }
                        placeholder="Enter current password"
                        className="pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <Separator />

                  {/* New Password */}
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showNewPassword ? 'text' : 'password'}
                        value={formData.newPassword}
                        onChange={(e) => handleNewPasswordChange(e.target.value)}
                        placeholder="Enter new password"
                        className="pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showNewPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Password Strength Indicator */}
                    {formData.newPassword && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-600">Password Strength:</span>
                          <span className="text-xs font-semibold">{getStrengthText()}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${getStrengthColor()}`}
                            style={{ width: `${(passwordStrength / 5) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Password Requirements */}
                  {formData.newPassword && (
                    <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                      <p className="text-sm font-medium text-gray-900 mb-2">
                        Password Requirements:
                      </p>
                      <div className="grid grid-cols-1 gap-2">
                        <div className="flex items-center gap-2">
                          {requirements.minLength ? (
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          ) : (
                            <XCircle className="w-4 h-4 text-gray-400" />
                          )}
                          <span
                            className={`text-xs ${
                              requirements.minLength ? 'text-green-600' : 'text-gray-600'
                            }`}
                          >
                            At least 8 characters
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {requirements.hasUpperCase ? (
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          ) : (
                            <XCircle className="w-4 h-4 text-gray-400" />
                          )}
                          <span
                            className={`text-xs ${
                              requirements.hasUpperCase ? 'text-green-600' : 'text-gray-600'
                            }`}
                          >
                            One uppercase letter
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {requirements.hasLowerCase ? (
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          ) : (
                            <XCircle className="w-4 h-4 text-gray-400" />
                          )}
                          <span
                            className={`text-xs ${
                              requirements.hasLowerCase ? 'text-green-600' : 'text-gray-600'
                            }`}
                          >
                            One lowercase letter
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {requirements.hasNumber ? (
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          ) : (
                            <XCircle className="w-4 h-4 text-gray-400" />
                          )}
                          <span
                            className={`text-xs ${
                              requirements.hasNumber ? 'text-green-600' : 'text-gray-600'
                            }`}
                          >
                            One number
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {requirements.hasSpecialChar ? (
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          ) : (
                            <XCircle className="w-4 h-4 text-gray-400" />
                          )}
                          <span
                            className={`text-xs ${
                              requirements.hasSpecialChar ? 'text-green-600' : 'text-gray-600'
                            }`}
                          >
                            One special character (!@#$%^&*)
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Confirm Password */}
                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData({ ...formData, confirmPassword: e.target.value })
                        }
                        placeholder="Re-enter new password"
                        className="pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <XCircle className="w-3 h-3" />
                        Passwords do not match
                      </p>
                    )}
                    {formData.confirmPassword && formData.newPassword === formData.confirmPassword && (
                      <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Passwords match
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-3 pt-4">
                    <Button type="button" variant="outline" className="flex-1">
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 gap-2"
                      disabled={
                        !formData.currentPassword ||
                        !formData.newPassword ||
                        !formData.confirmPassword ||
                        formData.newPassword !== formData.confirmPassword ||
                        passwordStrength < 3
                      }
                    >
                      <Shield className="w-4 h-4" />
                      Update Password
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Use a strong password</p>
                    <p className="text-xs text-gray-600">
                      Mix uppercase, lowercase, numbers, and symbols
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Make it unique</p>
                    <p className="text-xs text-gray-600">
                      Don't reuse passwords from other sites
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Avoid common words</p>
                    <p className="text-xs text-gray-600">
                      Don't use dictionary words or personal info
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Change regularly</p>
                    <p className="text-xs text-gray-600">Update your password every 90 days</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Password History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-900">Last changed</p>
                    <p className="text-xs text-gray-600">45 days ago</p>
                  </div>
                </div>
                <Separator />
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-yellow-900">
                        Password expires in 45 days
                      </p>
                      <p className="text-xs text-yellow-700">
                        We recommend changing your password every 90 days
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900 mb-1">Enable 2FA</p>
                    <p className="text-xs text-blue-700 mb-3">
                      Add two-factor authentication for extra security
                    </p>
                    <Button size="sm" variant="outline" className="border-blue-300 text-blue-700">
                      Set Up 2FA
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
