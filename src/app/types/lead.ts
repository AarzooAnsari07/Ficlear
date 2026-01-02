export interface Lead {
  id: string;
  name: string;
  dateOfBirth: string;
  mobileNumber: string;
  panNumber: string;
  companyName: string;
  netSalary: number;
  areaPincode: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'In Progress' | 'Won' | 'Lost';
  createdAt: string;
  updatedAt: string;
}

export interface LeadSearchParams {
  name?: string;
  mobileNumber?: string;
  panNumber?: string;
}

export interface LeadFormData {
  name: string;
  dateOfBirth: string;
  mobileNumber: string;
  panNumber: string;
  companyName: string;
  netSalary: string;
  areaPincode: string;
}
