import { AlertTriangle, Info, XCircle, FileWarning } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';

interface DisclaimerPageProps {
  onNavigate?: (page: string) => void;
}

export function DisclaimerPage({ onNavigate }: DisclaimerPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center gap-3 mb-3">
            <FileWarning className="w-8 h-8 text-amber-600" />
            <h1 className="text-3xl font-bold text-gray-900">Disclaimer</h1>
          </div>
          <p className="text-gray-600">Last Updated: January 15, 2025</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Important Notice */}
        <Card className="shadow-md border-0 border-l-4 border-l-red-500">
          <CardHeader className="bg-red-50">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <h2 className="text-xl font-bold text-gray-900">Important Notice</h2>
            </div>
          </CardHeader>
          <CardContent className="p-6 bg-red-50">
            <p className="text-gray-800 font-medium">
              Please read this disclaimer carefully before using FiClear's services. By accessing or using our platform, 
              you acknowledge that you have read, understood, and agree to be bound by this disclaimer.
            </p>
          </CardContent>
        </Card>

        {/* General Disclaimer */}
        <Card className="shadow-md border-0">
          <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100 border-b">
            <h2 className="text-xl font-bold text-gray-900">1. General Disclaimer</h2>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3 text-gray-700">
              <p>
                The information provided on the FiClear platform is for general informational purposes only. 
                While we strive to keep the information accurate and up-to-date, we make no representations or 
                warranties of any kind, express or implied, about the completeness, accuracy, reliability, 
                suitability, or availability of the information, products, services, or related graphics contained 
                on the platform.
              </p>
              <p>
                Any reliance you place on such information is strictly at your own risk. In no event will FiClear 
                be liable for any loss or damage including without limitation, indirect or consequential loss or 
                damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or 
                in connection with, the use of this platform.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Not a Financial Institution */}
        <Card className="shadow-md border-0 border-l-4 border-l-amber-500">
          <CardHeader className="bg-amber-50">
            <div className="flex items-center gap-2">
              <Info className="w-5 h-5 text-amber-600" />
              <h2 className="text-xl font-bold text-gray-900">2. Not a Financial Institution</h2>
            </div>
          </CardHeader>
          <CardContent className="p-6 bg-amber-50">
            <div className="space-y-3 text-gray-700">
              <div className="flex gap-3 p-4 bg-white rounded-lg border border-amber-200">
                <XCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-2">FiClear is NOT:</p>
                  <ul className="space-y-1 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600">•</span>
                      <span>A bank or non-banking financial company (NBFC)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600">•</span>
                      <span>A lender or loan provider</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600">•</span>
                      <span>A registered financial advisor</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600">•</span>
                      <span>A credit bureau or credit rating agency</span>
                    </li>
                  </ul>
                </div>
              </div>
              <p>
                We are an intermediary platform that helps users check their loan eligibility and connects them 
                with banks, NBFCs, and financial consultants. We do not directly provide loans or financial products.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Eligibility Results */}
        <Card className="shadow-md border-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b">
            <h2 className="text-xl font-bold text-gray-900">3. Eligibility Results and Recommendations</h2>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Indicative Information Only</p>
                    <p className="text-gray-700 text-sm">
                      All eligibility results, loan recommendations, and policy information displayed on our platform 
                      are indicative and based on general bank policies and our proprietary algorithms. They are NOT 
                      guarantees of loan approval.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-gray-700">
                <p className="font-semibold">The following factors may affect actual eligibility:</p>
                <ul className="space-y-1 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Individual credit profile and history</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Bank's internal credit policies and risk assessment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Current market conditions and regulatory changes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Verification of documents and information provided</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Bank-specific exceptions and discretionary approvals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Changes in bank policies after information was last updated</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* No Guarantee of Approval */}
        <Card className="shadow-md border-0 border-l-4 border-l-red-500">
          <CardHeader className="bg-red-50">
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-600" />
              <h2 className="text-xl font-bold text-gray-900">4. No Guarantee of Loan Approval</h2>
            </div>
          </CardHeader>
          <CardContent className="p-6 bg-red-50">
            <div className="space-y-3 text-gray-700">
              <p className="font-semibold text-gray-900">
                FiClear does NOT guarantee:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-1" />
                  <span>Approval of any loan application</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-1" />
                  <span>Specific interest rates or loan terms</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-1" />
                  <span>Loan amounts shown in eligibility results</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-1" />
                  <span>Processing timelines or disbursement dates</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-1" />
                  <span>That any particular bank will process your application</span>
                </li>
              </ul>
              <p className="mt-3">
                Final loan approval decisions rest entirely with the lending institutions and are subject to their 
                internal credit policies, risk assessment, and verification procedures.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Third-Party Services */}
        <Card className="shadow-md border-0">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b">
            <h2 className="text-xl font-bold text-gray-900">5. Third-Party Services and Links</h2>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3 text-gray-700">
              <p>
                Our platform may contain links to third-party websites, banks, NBFCs, and other financial service providers. 
                FiClear has no control over, and assumes no responsibility for, the content, privacy policies, or practices 
                of any third-party websites or services.
              </p>
              <p>
                When you engage with banks, NBFCs, or financial consultants through our platform, you will be subject to 
                their respective terms and conditions, privacy policies, and service agreements. We recommend reviewing 
                these documents carefully before proceeding.
              </p>
              <p>
                FiClear is not responsible for any loss or damage arising from your interactions with third-party service 
                providers, even if connected through our platform.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Accuracy of Information */}
        <Card className="shadow-md border-0">
          <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 border-b">
            <h2 className="text-xl font-bold text-gray-900">6. Accuracy of Information</h2>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3 text-gray-700">
              <p>
                While we make every effort to keep bank policies, interest rates, and eligibility criteria up-to-date, 
                financial institutions frequently update their policies and offerings. There may be delays in reflecting 
                these changes on our platform.
              </p>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="font-semibold mb-2">Users are advised to:</p>
                <ul className="space-y-1 ml-4 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Verify all information directly with the concerned bank or NBFC</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Read loan documents and agreements carefully before signing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Consult with qualified financial advisors for personalized advice</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Not solely rely on information provided on our platform for financial decisions</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Responsibility */}
        <Card className="shadow-md border-0">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 border-b">
            <h2 className="text-xl font-bold text-gray-900">7. User Responsibility</h2>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3 text-gray-700">
              <p className="font-semibold">It is your responsibility to:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">►</span>
                  <span>Provide accurate and truthful information in all forms and applications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">►</span>
                  <span>Understand the terms and conditions of any loan before accepting</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">►</span>
                  <span>Assess your own financial situation and ability to repay loans</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">►</span>
                  <span>Verify all information independently before making financial commitments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">►</span>
                  <span>Protect your personal and financial information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">►</span>
                  <span>Comply with all applicable laws and regulations</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Professional Advice */}
        <Card className="shadow-md border-0 border-l-4 border-l-blue-500">
          <CardHeader className="bg-blue-50">
            <div className="flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">8. Not Professional Financial Advice</h2>
            </div>
          </CardHeader>
          <CardContent className="p-6 bg-blue-50">
            <p className="text-gray-700">
              The information and services provided on FiClear are not intended to be, and should not be construed as, 
              professional financial, legal, or tax advice. You should consult with qualified professionals regarding 
              your specific circumstances before making any financial decisions. We strongly recommend seeking independent 
              professional advice tailored to your individual situation.
            </p>
          </CardContent>
        </Card>

        {/* Changes to Policies */}
        <Card className="shadow-md border-0">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b">
            <h2 className="text-xl font-bold text-gray-900">9. Bank Policy Changes</h2>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700">
              Banks and NBFCs reserve the right to change their loan policies, eligibility criteria, interest rates, 
              and terms at any time without prior notice. Such changes may affect loan applications that are in process. 
              FiClear is not responsible for any changes made by lending institutions and their impact on your loan 
              application or eligibility status.
            </p>
          </CardContent>
        </Card>

        {/* Limitation of Liability */}
        <Card className="shadow-md border-0 border-l-4 border-l-red-500">
          <CardHeader className="bg-red-50">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <h2 className="text-xl font-bold text-gray-900">10. Limitation of Liability</h2>
            </div>
          </CardHeader>
          <CardContent className="p-6 bg-red-50">
            <div className="space-y-3 text-gray-700">
              <p>
                To the fullest extent permitted by applicable law, FiClear shall not be liable for any:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span>Errors, omissions, or inaccuracies in information provided</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span>Loan rejections or unfavorable terms offered by lenders</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span>Direct, indirect, incidental, special, or consequential damages</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span>Loss of profits, revenue, data, or business opportunities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span>Actions or omissions of third-party lenders or consultants</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span>Unauthorized access to or use of your information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span>Interruption or cessation of our services</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Governing Law */}
        <Card className="shadow-md border-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b">
            <h2 className="text-xl font-bold text-gray-900">11. Governing Law</h2>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700">
              This disclaimer shall be governed by and construed in accordance with the laws of India. Any disputes 
              arising from or related to this disclaimer shall be subject to the exclusive jurisdiction of the courts 
              of India.
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="shadow-md border-0">
          <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 border-b">
            <h2 className="text-xl font-bold text-gray-900">12. Questions About This Disclaimer</h2>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 mb-4">
              If you have any questions or concerns about this disclaimer, please contact us:
            </p>
            <div className="space-y-2 text-gray-700">
              <p><strong>Email:</strong> <a href="mailto:support@ficlear.in" className="text-blue-600 hover:underline">support@ficlear.in</a></p>
              <p><strong>Phone:</strong> <a href="tel:+911234567890" className="text-blue-600 hover:underline">+91 123 456 7890</a></p>
              <p><strong>Website:</strong> <a href="https://www.ficlear.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.ficlear.in</a></p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
