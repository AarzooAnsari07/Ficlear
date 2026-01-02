// Service to fetch company data by CIN from MCA API via backend
// Uses Supabase Edge Functions to securely call Sandbox MCA API

import { mockFetchCompanyByCIN } from './mockMCAData';

export interface CompanyApiResponse {
  success: boolean;
  data?: {
    companyName: string;
    cin: string;
    industry: string;
    incorporationDate: string;
    companyType: 'Private' | 'Public' | 'LLP' | 'Partnership' | 'Proprietorship';
    companyStatus: 'Active' | 'Inactive' | 'Strike Off';
    employeeSize: 'Micro' | 'Small' | 'Medium' | 'Large';
    riskTag: 'Low' | 'Medium' | 'High';
    registeredAddress?: string;
    authorizedCapital?: number;
    paidUpCapital?: number;
    directors?: string[];
    email?: string;
    dateOfIncorporation?: string;
  };
  error?: string;
}

// Backend API endpoint configuration
// Replace with your actual backend URL when deployed
const API_ENDPOINT = process.env.REACT_APP_BACKEND_URL || '/api/mca/fetch-company-by-cin';

// Set to true to use mock data (for development without backend)
const USE_MOCK_DATA = !process.env.REACT_APP_BACKEND_URL;

/**
 * Fetches company details from MCA via Sandbox API
 * Calls backend endpoint which securely handles API keys
 * 
 * Backend should call: https://api.sandbox.co.in/mca/company/master-data/search
 */
export async function fetchCompanyByCIN(cin: string): Promise<CompanyApiResponse> {
  try {
    // Clean and normalize CIN
    const cleanCIN = cin.toUpperCase().trim();

    // Validate CIN format (basic validation)
    const cinRegex = /^[UL]\d{5}[A-Z]{2}\d{4}[A-Z]{3}\d{6}$/;
    if (!cinRegex.test(cleanCIN)) {
      return {
        success: false,
        error: 'Invalid CIN format. CIN should be 21 characters (e.g., L22210MH1995PLC084781)',
      };
    }

    // Use mock data if enabled
    if (USE_MOCK_DATA) {
      return mockFetchCompanyByCIN(cleanCIN);
    }

    // Call backend API
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cin: cleanCIN }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.message || 'Failed to fetch company details from MCA',
      };
    }

    const result = await response.json();

    // Transform Sandbox API response to our format
    if (result.success && result.data) {
      return {
        success: true,
        data: transformMCAResponse(result.data),
      };
    }

    return {
      success: false,
      error: result.message || 'Company not found in MCA database',
    };
  } catch (error) {
    console.error('MCA API Error:', error);
    return {
      success: false,
      error: 'Network error. Please check your connection and try again.',
    };
  }
}

/**
 * Transform Sandbox MCA API response to our internal format
 */
function transformMCAResponse(mcaData: any): CompanyApiResponse['data'] {
  // Map MCA response fields to our format
  // Adjust field names based on actual Sandbox API response structure
  
  return {
    companyName: mcaData.company_name || mcaData.companyName || '',
    cin: mcaData.cin || mcaData.corporateIdentificationNumber || '',
    industry: mcaData.company_class || mcaData.industry || 'General',
    incorporationDate: mcaData.date_of_incorporation || mcaData.incorporationDate || '',
    companyType: mapCompanyType(mcaData.company_type || mcaData.companyType),
    companyStatus: mapCompanyStatus(mcaData.company_status || mcaData.status),
    employeeSize: determineEmployeeSize(mcaData.authorized_capital),
    riskTag: 'Low', // Default - can be enhanced with business logic
    registeredAddress: mcaData.registered_address || mcaData.address || '',
    authorizedCapital: mcaData.authorized_capital || mcaData.authorizedCapital || 0,
    paidUpCapital: mcaData.paid_up_capital || mcaData.paidUpCapital || 0,
    directors: mcaData.directors || [],
    email: mcaData.email || mcaData.company_email || '',
    dateOfIncorporation: mcaData.date_of_incorporation || '',
  };
}

/**
 * Map MCA company type to our standardized types
 */
function mapCompanyType(mcaType: string): 'Private' | 'Public' | 'LLP' | 'Partnership' | 'Proprietorship' {
  const type = mcaType?.toLowerCase() || '';
  
  if (type.includes('private')) return 'Private';
  if (type.includes('public')) return 'Public';
  if (type.includes('llp')) return 'LLP';
  if (type.includes('partnership')) return 'Partnership';
  if (type.includes('proprietor')) return 'Proprietorship';
  
  return 'Private'; // Default
}

/**
 * Map MCA company status to our standardized statuses
 */
function mapCompanyStatus(mcaStatus: string): 'Active' | 'Inactive' | 'Strike Off' {
  const status = mcaStatus?.toLowerCase() || '';
  
  if (status.includes('active')) return 'Active';
  if (status.includes('strike') || status.includes('struck')) return 'Strike Off';
  
  return 'Inactive';
}

/**
 * Determine employee size based on authorized capital
 */
function determineEmployeeSize(authorizedCapital?: number): 'Micro' | 'Small' | 'Medium' | 'Large' {
  if (!authorizedCapital) return 'Small';
  
  if (authorizedCapital < 1000000) return 'Micro';      // < 10 Lakhs
  if (authorizedCapital < 10000000) return 'Small';     // < 1 Crore
  if (authorizedCapital < 100000000) return 'Medium';   // < 10 Crores
  
  return 'Large';                                        // 10 Crores+
}

/**
 * Get list of sample CINs for testing
 */
export function getSampleCINs(): string[] {
  return [
    'L22210MH1995PLC084781', // TCS
    'L65910MH1994PLC080618', // HDFC Bank
    'L67120MH1958PLC011126', // ICICI Bank
    'L72900GJ1999PLC035648', // Infosys
    'L24100GJ1988PLC011652', // Reliance
    'U72900KA2003PTC031497', // Wipro
    'L65110MH1985PLC038784', // Kotak Mahindra
    'L74999DL1985PLC022194', // Bharti Airtel
  ];
}