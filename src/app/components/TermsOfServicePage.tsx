import { FileText, CheckCircle2, XCircle, AlertTriangle, Scale } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';

interface TermsOfServicePageProps {
  onNavigate?: (page: string) => void;
}

export function TermsOfServicePage({ onNavigate }: TermsOfServicePageProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center gap-3 mb-3">
            <Scale className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
          </div>
          <p className="text-gray-600">Last Updated: January 15, 2025</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Introduction */}
        <Card className="shadow-md border-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b">
            <h2 className="text-xl font-bold text-gray-900">1. Agreement to Terms</h2>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 leading-relaxed">
              By accessing or using FiClear's loan eligibility checking platform and services ("Service"), 
              you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, 
              please do not use our Service. These Terms constitute a legally binding agreement between you 
              and FiClear.
            </p>
          </CardContent>
        </Card>

        {/* Service Description */}
        <Card className="shadow-md border-0">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b">
            <h2 className="text-xl font-bold text-gray-900">2. Service Description</h2>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 mb-4">FiClear provides:</p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Loan eligibility checking across multiple banks and financial institutions</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Financial consultancy and loan advisory services</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Company and PIN code checker tools</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Live bank offers and policy information</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Connection with verified DSAs and financial consultants</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* User Eligibility */}
        <Card className="shadow-md border-0">
          <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 border-b">
            <h2 className="text-xl font-bold text-gray-900">3. User Eligibility</h2>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 mb-3">To use our Service, you must:</p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Be at least 18 years of age</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Be a resident of India</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Have the legal capacity to enter into binding contracts</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Provide accurate and complete information</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Not be prohibited from using our services by applicable laws</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* User Obligations */}
        <Card className="shadow-md border-0">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 border-b">
            <h2 className="text-xl font-bold text-gray-900">4. User Obligations</h2>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">You agree to:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                  <span>Provide accurate, current, and complete information</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                  <span>Maintain the security of your account credentials</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                  <span>Notify us immediately of any unauthorized account access</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                  <span>Use the Service only for lawful purposes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                  <span>Comply with all applicable laws and regulations</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">You agree NOT to:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-1" />
                  <span>Provide false or misleading information</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-1" />
                  <span>Use the Service for fraudulent purposes</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-1" />
                  <span>Attempt to gain unauthorized access to our systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-1" />
                  <span>Interfere with or disrupt the Service</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-1" />
                  <span>Scrape, mine, or extract data from our platform</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-1" />
                  <span>Violate any intellectual property rights</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Loan Application Process */}
        <Card className="shadow-md border-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b">
            <h2 className="text-xl font-bold text-gray-900">5. Loan Application Process</h2>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3 text-gray-700">
              <p>
                <strong>5.1.</strong> FiClear acts as an intermediary between you and lending institutions. 
                We do not provide loans directly.
              </p>
              <p>
                <strong>5.2.</strong> Eligibility results shown on our platform are indicative and based on 
                general bank policies. Final loan approval is at the sole discretion of the lending institution.
              </p>
              <p>
                <strong>5.3.</strong> We do not guarantee loan approval or specific terms from any bank or NBFC.
              </p>
              <p>
                <strong>5.4.</strong> You authorize us to share your information with partner banks and financial 
                consultants for loan processing purposes.
              </p>
              <p>
                <strong>5.5.</strong> You may be required to provide additional documents and undergo verification 
                procedures as required by lending institutions.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Fees and Charges */}
        <Card className="shadow-md border-0">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b">
            <h2 className="text-xl font-bold text-gray-900">6. Fees and Charges</h2>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3 text-gray-700">
              <p>
                <strong>6.1.</strong> FiClear's eligibility checking service is currently provided free of charge 
                to end users.
              </p>
              <p>
                <strong>6.2.</strong> We may earn commission from banks and financial institutions when loans are 
                successfully disbursed.
              </p>
              <p>
                <strong>6.3.</strong> Any fees charged by banks or NBFCs for loan processing, documentation, or 
                other services are separate and not controlled by FiClear.
              </p>
              <p>
                <strong>6.4.</strong> We reserve the right to introduce charges for premium features in the future, 
                with prior notice to users.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Intellectual Property */}
        <Card className="shadow-md border-0">
          <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 border-b">
            <h2 className="text-xl font-bold text-gray-900">7. Intellectual Property Rights</h2>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 mb-3">
              All content, features, and functionality on the FiClear platform, including but not limited to:
            </p>
            <ul className="space-y-2 text-gray-700 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Text, graphics, logos, and images</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Software, algorithms, and eligibility engines</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Database structures and compilations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>User interface and design elements</span>
              </li>
            </ul>
            <p className="text-gray-700">
              are owned by FiClear and protected by copyright, trademark, and other intellectual property laws. 
              You may not reproduce, distribute, modify, or create derivative works without our express written permission.
            </p>
          </CardContent>
        </Card>

        {/* Limitation of Liability */}
        <Card className="shadow-md border-0 border-l-4 border-l-amber-500">
          <CardHeader className="bg-amber-50">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h2 className="text-xl font-bold text-gray-900">8. Limitation of Liability</h2>
            </div>
          </CardHeader>
          <CardContent className="p-6 bg-amber-50">
            <div className="space-y-3 text-gray-700">
              <p>
                <strong>8.1.</strong> FiClear provides the Service on an "as is" and "as available" basis without 
                warranties of any kind.
              </p>
              <p>
                <strong>8.2.</strong> We do not guarantee uninterrupted, timely, secure, or error-free service.
              </p>
              <p>
                <strong>8.3.</strong> We are not liable for any decisions made by lending institutions regarding 
                loan applications.
              </p>
              <p>
                <strong>8.4.</strong> To the maximum extent permitted by law, FiClear shall not be liable for any 
                indirect, incidental, special, consequential, or punitive damages arising from your use of the Service.
              </p>
              <p>
                <strong>8.5.</strong> Our total liability for any claims related to the Service shall not exceed 
                the amount you paid to us (if any) in the 12 months prior to the claim.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Indemnification */}
        <Card className="shadow-md border-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b">
            <h2 className="text-xl font-bold text-gray-900">9. Indemnification</h2>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700">
              You agree to indemnify, defend, and hold harmless FiClear, its officers, directors, employees, and agents 
              from and against any claims, liabilities, damages, losses, and expenses, including reasonable legal fees, 
              arising out of or in any way connected with your access to or use of the Service, your violation of these 
              Terms, or your infringement of any rights of another party.
            </p>
          </CardContent>
        </Card>

        {/* Termination */}
        <Card className="shadow-md border-0">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b">
            <h2 className="text-xl font-bold text-gray-900">10. Termination</h2>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3 text-gray-700">
              <p>
                <strong>10.1.</strong> We may terminate or suspend your account and access to the Service immediately, 
                without prior notice, if you breach these Terms.
              </p>
              <p>
                <strong>10.2.</strong> You may terminate your account at any time by contacting us.
              </p>
              <p>
                <strong>10.3.</strong> Upon termination, your right to use the Service will immediately cease, but 
                certain provisions of these Terms will survive termination.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Governing Law */}
        <Card className="shadow-md border-0">
          <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 border-b">
            <h2 className="text-xl font-bold text-gray-900">11. Governing Law and Dispute Resolution</h2>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3 text-gray-700">
              <p>
                <strong>11.1.</strong> These Terms shall be governed by and construed in accordance with the laws of India.
              </p>
              <p>
                <strong>11.2.</strong> Any disputes arising out of or relating to these Terms or the Service shall be 
                subject to the exclusive jurisdiction of the courts located in [Your City], India.
              </p>
              <p>
                <strong>11.3.</strong> Before initiating legal proceedings, parties agree to attempt to resolve disputes 
                through good faith negotiations.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Changes to Terms */}
        <Card className="shadow-md border-0">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 border-b">
            <h2 className="text-xl font-bold text-gray-900">12. Changes to Terms</h2>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700">
              We reserve the right to modify these Terms at any time. We will notify you of any material changes by 
              posting the new Terms on this page with an updated "Last Updated" date. Your continued use of the Service 
              after such changes constitutes your acceptance of the new Terms.
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="shadow-md border-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b">
            <h2 className="text-xl font-bold text-gray-900">13. Contact Us</h2>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="space-y-2 text-gray-700">
              <p><strong>Email:</strong> <a href="mailto:legal@ficlear.in" className="text-blue-600 hover:underline">legal@ficlear.in</a></p>
              <p><strong>Phone:</strong> <a href="tel:+911234567890" className="text-blue-600 hover:underline">+91 123 456 7890</a></p>
              <p><strong>Website:</strong> <a href="https://www.ficlear.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.ficlear.in</a></p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
