import { Lead } from '../types/lead';

// Mock database of leads
export const mockLeads: Lead[] = [
  {
    id: 'LEAD001',
    name: 'Rajesh Kumar',
    dateOfBirth: '1990-05-15',
    mobileNumber: '9876543210',
    panNumber: 'ABCDE1234F',
    companyName: 'Tata Consultancy Services (TCS)',
    netSalary: 85000,
    areaPincode: '400001',
    status: 'In Progress',
    createdAt: '2025-01-15T10:30:00Z',
    updatedAt: '2025-01-20T14:45:00Z',
  },
  {
    id: 'LEAD002',
    name: 'Priya Sharma',
    dateOfBirth: '1988-08-22',
    mobileNumber: '9876543211',
    panNumber: 'ABCDE5678G',
    companyName: 'Infosys',
    netSalary: 95000,
    areaPincode: '560001',
    status: 'Qualified',
    createdAt: '2025-01-18T09:15:00Z',
    updatedAt: '2025-01-22T11:20:00Z',
  },
  {
    id: 'LEAD003',
    name: 'Amit Patel',
    dateOfBirth: '1992-03-10',
    mobileNumber: '9876543212',
    panNumber: 'ABCDE9012H',
    companyName: 'Hindustan Unilever Limited (HUL)',
    netSalary: 75000,
    areaPincode: '400001',
    status: 'New',
    createdAt: '2025-01-25T16:00:00Z',
    updatedAt: '2025-01-25T16:00:00Z',
  },
  {
    id: 'LEAD004',
    name: 'Sneha Reddy',
    dateOfBirth: '1991-11-05',
    mobileNumber: '9876543213',
    panNumber: 'ABCDE3456I',
    companyName: 'Wipro',
    netSalary: 68000,
    areaPincode: '500001',
    status: 'Contacted',
    createdAt: '2025-01-20T13:30:00Z',
    updatedAt: '2025-01-23T10:15:00Z',
  },
  {
    id: 'LEAD005',
    name: 'Vikram Singh',
    dateOfBirth: '1985-07-18',
    mobileNumber: '9876543214',
    panNumber: 'ABCDE7890J',
    companyName: 'HDFC Bank',
    netSalary: 125000,
    areaPincode: '110001',
    status: 'Won',
    createdAt: '2025-01-10T08:00:00Z',
    updatedAt: '2025-01-28T17:30:00Z',
  },
];

// Helper function to search leads
export function searchLeads(params: {
  name?: string;
  mobileNumber?: string;
  panNumber?: string;
}): Lead[] {
  return mockLeads.filter((lead) => {
    const nameMatch = params.name
      ? lead.name.toLowerCase().includes(params.name.toLowerCase())
      : true;
    const mobileMatch = params.mobileNumber
      ? lead.mobileNumber.includes(params.mobileNumber)
      : true;
    const panMatch = params.panNumber
      ? lead.panNumber.toLowerCase().includes(params.panNumber.toLowerCase())
      : true;

    return nameMatch && mobileMatch && panMatch;
  });
}

// Helper function to create a new lead
export function createLead(leadData: Omit<Lead, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Lead {
  const newLead: Lead = {
    ...leadData,
    id: `LEAD${String(mockLeads.length + 1).padStart(3, '0')}`,
    status: 'New',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  mockLeads.push(newLead);
  return newLead;
}
