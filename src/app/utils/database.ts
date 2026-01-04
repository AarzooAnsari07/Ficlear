import { projectId, publicAnonKey } from '../../../utils/supabase/info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-6159e8d5`;

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${publicAnonKey}`,
};

// ==================== COMPANIES ====================

export const companiesAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE}/companies`, { headers });
    return response.json();
  },

  getById: async (id: string) => {
    const response = await fetch(`${API_BASE}/companies/${id}`, { headers });
    return response.json();
  },

  create: async (company: any) => {
    const response = await fetch(`${API_BASE}/companies`, {
      method: 'POST',
      headers,
      body: JSON.stringify(company),
    });
    return response.json();
  },

  update: async (id: string, company: any) => {
    const response = await fetch(`${API_BASE}/companies/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(company),
    });
    return response.json();
  },

  delete: async (id: string) => {
    const response = await fetch(`${API_BASE}/companies/${id}`, {
      method: 'DELETE',
      headers,
    });
    return response.json();
  },

  bulkImport: async (companies: any[]) => {
    const response = await fetch(`${API_BASE}/companies/bulk-import`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ companies }),
    });
    return response.json();
  },
};

// ==================== PIN CODES ====================

export const pincodesAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE}/pincodes`, { headers });
    return response.json();
  },

  getByCode: async (code: string) => {
    const response = await fetch(`${API_BASE}/pincodes/${code}`, { headers });
    return response.json();
  },

  create: async (pincode: any) => {
    const response = await fetch(`${API_BASE}/pincodes`, {
      method: 'POST',
      headers,
      body: JSON.stringify(pincode),
    });
    return response.json();
  },

  update: async (code: string, pincode: any) => {
    const response = await fetch(`${API_BASE}/pincodes/${code}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(pincode),
    });
    return response.json();
  },

  delete: async (code: string) => {
    const response = await fetch(`${API_BASE}/pincodes/${code}`, {
      method: 'DELETE',
      headers,
    });
    return response.json();
  },

  bulkImport: async (pincodes: any[]) => {
    const response = await fetch(`${API_BASE}/pincodes/bulk-import`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ pincodes }),
    });
    return response.json();
  },
};

// ==================== BANKS ====================

export const banksAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE}/banks`, { headers });
    return response.json();
  },

  getById: async (id: string) => {
    const response = await fetch(`${API_BASE}/banks/${id}`, { headers });
    return response.json();
  },

  create: async (bank: any) => {
    const response = await fetch(`${API_BASE}/banks`, {
      method: 'POST',
      headers,
      body: JSON.stringify(bank),
    });
    return response.json();
  },

  update: async (id: string, bank: any) => {
    const response = await fetch(`${API_BASE}/banks/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(bank),
    });
    return response.json();
  },

  delete: async (id: string) => {
    const response = await fetch(`${API_BASE}/banks/${id}`, {
      method: 'DELETE',
      headers,
    });
    return response.json();
  },

  bulkImport: async (banks: any[]) => {
    const response = await fetch(`${API_BASE}/banks/bulk-import`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ banks }),
    });
    return response.json();
  },
};

// ==================== LIVE OFFERS ====================

export const offersAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE}/offers`, { headers });
    return response.json();
  },

  getById: async (id: string) => {
    const response = await fetch(`${API_BASE}/offers/${id}`, { headers });
    return response.json();
  },

  create: async (offer: any) => {
    const response = await fetch(`${API_BASE}/offers`, {
      method: 'POST',
      headers,
      body: JSON.stringify(offer),
    });
    return response.json();
  },

  update: async (id: string, offer: any) => {
    const response = await fetch(`${API_BASE}/offers/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(offer),
    });
    return response.json();
  },

  delete: async (id: string) => {
    const response = await fetch(`${API_BASE}/offers/${id}`, {
      method: 'DELETE',
      headers,
    });
    return response.json();
  },
};

// ==================== PIN CODE SEARCH (DATA.GOV.IN) ====================

export const pincodeSearchAPI = {
  searchByPincode: async (pincode: string) => {
    const response = await fetch(`${API_BASE}/pincode-search/${pincode}`, { headers });
    return response.json();
  },

  searchByArea: async (area: string) => {
    const response = await fetch(`${API_BASE}/pincode-search-by-area/${area}`, { headers });
    return response.json();
  },
  
  bulkImport: async (data: any[], format: string, batchIndex: number = 0, batchSize: number = 100) => {
    const response = await fetch(`${API_BASE}/pincode-bulk-import`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ data, format, batchIndex, batchSize }),
    });
    return response.json();
  },
};

// ==================== SETTINGS ====================

export const settingsAPI = {
  get: async () => {
    const response = await fetch(`${API_BASE}/settings`, { headers });
    return response.json();
  },

  update: async (settings: any) => {
    const response = await fetch(`${API_BASE}/settings`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(settings),
    });
    return response.json();
  },
};

// ==================== DATABASE INITIALIZATION ====================

export const initializeDatabase = async () => {
  try {
    console.log('🚀 Initializing database with existing data...');

    // Dynamically import to avoid module loading issues
    const companiesModule = await import('../data/companies');
    const pincodesModule = await import('../data/pincodes');
    const banksModule = await import('../data/banks');

    const companies = companiesModule.companies;
    const pinCodes = pincodesModule.pinCodes;
    const banks = banksModule.banks;

    // Bulk import companies
    console.log('📦 Importing companies...');
    const companiesResult = await companiesAPI.bulkImport(companies);
    console.log(`✅ Imported ${companiesResult.count} companies`);

    // Bulk import PIN codes
    console.log('📍 Importing PIN codes...');
    const pincodesResult = await pincodesAPI.bulkImport(pinCodes);
    console.log(`✅ Imported ${pincodesResult.count} PIN codes`);

    // Bulk import banks
    console.log('🏦 Importing banks...');
    const banksResult = await banksAPI.bulkImport(banks);
    console.log(`✅ Imported ${banksResult.count} banks`);

    console.log('🎉 Database initialization complete!');
    return { success: true };
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    return { success: false, error };
  }
};