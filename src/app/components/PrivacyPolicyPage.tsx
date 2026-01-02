import { Shield, Lock, Eye, Database, UserCheck, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';

interface PrivacyPolicyPageProps {
  onNavigate?: (page: string) => void;
}

export function PrivacyPolicyPage({ onNavigate }: PrivacyPolicyPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          </div>
          <p className="text-gray-600">Last Updated: January 15, 2025</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Introduction */}
        <Card className="shadow-md border-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b">
            <h2 className="text-xl font-bold text-gray-900">Introduction</h2>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 leading-relaxed">
              At FiClear ("we," "us," or "our"), we are committed to protecting your privacy and ensuring 
              the security of your personal information. This Privacy Policy explains how we collect, use, 
              disclose, and safeguard your information when you use our loan eligibility checking platform 
              and financial consultancy services.
            </p>
          </CardContent>
        </Card>

        {/* Information We Collect */}
        <Card className="shadow-md border-0">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-purple-600" />
              <h2 className="text-xl font-bold text-gray-900">Information We Collect</h2>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">1. Personal Information</h3>
              <ul className="space-y-1 text-gray-700 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Name, email address, phone number</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Employment details (company name, designation, salary)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Address and PIN code information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Date of birth and age</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">2. Financial Information</h3>
              <ul className="space-y-1 text-gray-700 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Income details and salary slips</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Existing loan obligations (EMI details)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Credit score (CIBIL) information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Bank account details for loan processing</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">3. Usage Information</h3>
              <ul className="space-y-1 text-gray-700 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>IP address, browser type, and device information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Pages visited and features used</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Time and date of access</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* How We Use Your Information */}
        <Card className="shadow-md border-0">
          <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 border-b">
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-green-600" />
              <h2 className="text-xl font-bold text-gray-900">How We Use Your Information</h2>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>To assess your loan eligibility across multiple banks and financial institutions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>To provide personalized loan recommendations and offers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>To connect you with our financial consultants and DSAs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>To process your loan applications with partner banks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>To improve our services and platform functionality</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>To send you updates about loan offers and policy changes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>To comply with legal and regulatory requirements</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Data Security */}
        <Card className="shadow-md border-0">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 border-b">
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-orange-600" />
              <h2 className="text-xl font-bold text-gray-900">Data Security</h2>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 mb-4">
              We implement industry-standard security measures to protect your personal and financial information:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-1">🔒</span>
                <span>SSL/TLS encryption for data transmission</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-1">🔒</span>
                <span>Secure server infrastructure with regular security audits</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-1">🔒</span>
                <span>Access controls and authentication mechanisms</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-1">🔒</span>
                <span>Regular data backups and disaster recovery procedures</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-1">🔒</span>
                <span>Employee training on data protection and confidentiality</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Information Sharing */}
        <Card className="shadow-md border-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Information Sharing</h2>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 mb-3">We may share your information with:</p>
            <ul className="space-y-2 text-gray-700 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span><strong>Banking Partners:</strong> To process loan applications and check eligibility</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span><strong>Credit Bureaus:</strong> To retrieve and verify credit scores</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span><strong>Financial Consultants:</strong> Our verified DSAs and consultants who assist with loan processing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span><strong>Service Providers:</strong> Third-party vendors who support our platform operations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span><strong>Legal Authorities:</strong> When required by law or to protect our rights</span>
              </li>
            </ul>
            <p className="text-gray-700">
              We ensure all third parties adhere to strict data protection standards and use your information only for specified purposes.
            </p>
          </CardContent>
        </Card>

        {/* Your Rights */}
        <Card className="shadow-md border-0">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b">
            <h2 className="text-xl font-bold text-gray-900">Your Rights</h2>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 mb-3">You have the right to:</p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">✓</span>
                <span>Access and review your personal information</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">✓</span>
                <span>Request corrections to inaccurate data</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">✓</span>
                <span>Request deletion of your personal data (subject to legal requirements)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">✓</span>
                <span>Opt-out of marketing communications</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">✓</span>
                <span>Withdraw consent for data processing (where applicable)</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Cookies and Tracking */}
        <Card className="shadow-md border-0">
          <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 border-b">
            <h2 className="text-xl font-bold text-gray-900">Cookies and Tracking Technologies</h2>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 mb-3">
              We use cookies and similar technologies to enhance your experience on our platform. 
              These help us:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Remember your preferences and settings</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Analyze platform usage and improve functionality</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Provide personalized content and recommendations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Ensure platform security</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Updates to Privacy Policy */}
        <Card className="shadow-md border-0 border-l-4 border-l-amber-500">
          <CardHeader className="bg-amber-50">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h2 className="text-xl font-bold text-gray-900">Updates to This Policy</h2>
            </div>
          </CardHeader>
          <CardContent className="p-6 bg-amber-50">
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. 
              We will notify you of any significant changes by posting the new policy on this page with an updated "Last Updated" date. 
              We encourage you to review this policy periodically.
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="shadow-md border-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b">
            <h2 className="text-xl font-bold text-gray-900">Contact Us</h2>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 mb-4">
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="space-y-2 text-gray-700">
              <p><strong>Email:</strong> <a href="mailto:privacy@ficlear.in" className="text-blue-600 hover:underline">privacy@ficlear.in</a></p>
              <p><strong>Phone:</strong> <a href="tel:+911234567890" className="text-blue-600 hover:underline">+91 123 456 7890</a></p>
              <p><strong>Website:</strong> <a href="https://www.ficlear.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.ficlear.in</a></p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
