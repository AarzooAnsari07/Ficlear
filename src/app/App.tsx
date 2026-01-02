import { useState } from 'react';
import { CustomerProfile, EligibilityResult } from './types';
import { banks } from './data/banks';
import { getAllEligibilityResults } from './utils/eligibility';
import { TopNavigation } from './components/TopNavigation';
import { LeadSummaryPanel } from './components/LeadSummaryPanel';
import { ActivityTimelineCenter } from './components/ActivityTimelineCenter';
import { InsightsPanel } from './components/InsightsPanel';
import { EligibilityCheckerPage } from './components/EligibilityCheckerPage';
import { CompanyCheckerPage } from './components/CompanyCheckerPage';
import { PinCodeCheckerPage } from './components/PinCodeCheckerPage';
import { HomePage } from './components/HomePage';
import { LiveOffersPage } from './components/LiveOffersPage';
import { PolicyPage } from './components/PolicyPage';
import { MyProfilePage } from './components/MyProfilePage';
import { AccountSettingsPage } from './components/AccountSettingsPage';
import { ChangePasswordPage } from './components/ChangePasswordPage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { TermsOfServicePage } from './components/TermsOfServicePage';
import { DisclaimerPage } from './components/DisclaimerPage';
import { ContactUsPage } from './components/ContactUsPage';
import { Footer } from './components/Footer';
import { AdminLoginPage } from './components/admin/AdminLoginPage';
import { AdminDashboard } from './components/admin/AdminDashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [customerProfile, setCustomerProfile] = useState<CustomerProfile | null>(null);
  const [results, setResults] = useState<EligibilityResult[]>([]);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const handleFormSubmit = (profile: CustomerProfile) => {
    setCustomerProfile(profile);
    const eligibilityResults = getAllEligibilityResults(profile, banks);
    setResults(eligibilityResults);
    setCurrentPage('lead-detail');
  };

  const handleAdminLogin = () => {
    setIsAdminAuthenticated(true);
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setCurrentPage('home');
  };

  // Show admin panel if on admin page
  if (currentPage === 'admin') {
    if (isAdminAuthenticated) {
      return <AdminDashboard onLogout={handleAdminLogout} />;
    } else {
      return <AdminLoginPage onLogin={handleAdminLogin} />;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation currentPage={currentPage} onNavigate={setCurrentPage} />

      {currentPage === 'home' && (
        <>
          <HomePage onNavigate={setCurrentPage} />
          <Footer onNavigate={setCurrentPage} />
        </>
      )}

      {currentPage === 'offers' && (
        <>
          <LiveOffersPage />
          <Footer onNavigate={setCurrentPage} />
        </>
      )}

      {currentPage === 'policy' && (
        <>
          <PolicyPage onNavigate={setCurrentPage} />
          <Footer onNavigate={setCurrentPage} />
        </>
      )}

      {currentPage === 'eligibility' && (
        <>
          <EligibilityCheckerPage onComplete={handleFormSubmit} />
          <Footer onNavigate={setCurrentPage} />
        </>
      )}

      {currentPage === 'company' && (
        <>
          <CompanyCheckerPage />
          <Footer onNavigate={setCurrentPage} />
        </>
      )}

      {currentPage === 'pincode' && (
        <>
          <PinCodeCheckerPage />
          <Footer onNavigate={setCurrentPage} />
        </>
      )}

      {currentPage === 'my-profile' && (
        <>
          <MyProfilePage />
          <Footer onNavigate={setCurrentPage} />
        </>
      )}

      {currentPage === 'account-settings' && (
        <>
          <AccountSettingsPage />
          <Footer onNavigate={setCurrentPage} />
        </>
      )}

      {currentPage === 'change-password' && (
        <>
          <ChangePasswordPage />
          <Footer onNavigate={setCurrentPage} />
        </>
      )}

      {currentPage === 'privacy-policy' && (
        <>
          <PrivacyPolicyPage onNavigate={setCurrentPage} />
          <Footer onNavigate={setCurrentPage} />
        </>
      )}

      {currentPage === 'terms-of-service' && (
        <>
          <TermsOfServicePage onNavigate={setCurrentPage} />
          <Footer onNavigate={setCurrentPage} />
        </>
      )}

      {currentPage === 'disclaimer' && (
        <>
          <DisclaimerPage onNavigate={setCurrentPage} />
          <Footer onNavigate={setCurrentPage} />
        </>
      )}

      {currentPage === 'contact-us' && (
        <>
          <ContactUsPage onNavigate={setCurrentPage} />
          <Footer onNavigate={setCurrentPage} />
        </>
      )}

      {currentPage === 'lead-detail' && customerProfile && results.length > 0 && (
        <div className="flex">
          <LeadSummaryPanel
            customer={customerProfile}
            eligibleCount={results.filter((r) => r.isEligible).length}
            totalBanks={results.length}
          />
          <ActivityTimelineCenter customer={customerProfile} results={results} />
          <InsightsPanel results={results} />
        </div>
      )}
    </div>
  );
}