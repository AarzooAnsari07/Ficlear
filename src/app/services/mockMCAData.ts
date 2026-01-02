// Mock MCA data for development/testing when backend is unavailable
// This allows the feature to work without the actual Sandbox API

export const mockMCADatabase: Record<string, any> = {
  'L22210MH1995PLC084781': {
    company_name: 'Tata Consultancy Services Limited',
    cin: 'L22210MH1995PLC084781',
    company_class: 'IT Services & Consulting',
    date_of_incorporation: '1995-08-25',
    company_type: 'Public Limited Company',
    company_status: 'Active',
    authorized_capital: 850000000,
    paid_up_capital: 371196875,
    registered_address: '9th Floor, Nirmal Building, Nariman Point, Mumbai, Maharashtra - 400021',
    email: 'investor.relations@tcs.com',
    directors: ['N. Chandrasekaran', 'Rajesh Gopinathan', 'V. Ramakrishnan'],
  },
  'L65910MH1994PLC080618': {
    company_name: 'HDFC Bank Limited',
    cin: 'L65910MH1994PLC080618',
    company_class: 'Banking & Financial Services',
    date_of_incorporation: '1994-08-30',
    company_type: 'Public Limited Company',
    company_status: 'Active',
    authorized_capital: 7000000000,
    paid_up_capital: 6086120690,
    registered_address: 'HDFC Bank House, Senapati Bapat Marg, Lower Parel, Mumbai, Maharashtra - 400013',
    email: 'investorrelations@hdfcbank.com',
    directors: ['Sashidhar Jagdishan', 'Atanu Chakraborty', 'Kaizad Bharucha'],
  },
  'L67120MH1958PLC011126': {
    company_name: 'ICICI Bank Limited',
    cin: 'L67120MH1958PLC011126',
    company_class: 'Banking & Financial Services',
    date_of_incorporation: '1994-01-05',
    company_type: 'Public Limited Company',
    company_status: 'Active',
    authorized_capital: 5500000000,
    paid_up_capital: 1412918918,
    registered_address: 'ICICI Bank Tower, Bandra Kurla Complex, Mumbai, Maharashtra - 400051',
    email: 'shares@icicibank.com',
    directors: ['Sandeep Bakhshi', 'Girish Chandra Chaturvedi', 'Anup Bagchi'],
  },
  'L72900GJ1999PLC035648': {
    company_name: 'Infosys Limited',
    cin: 'L72900GJ1999PLC035648',
    company_class: 'IT Services & Consulting',
    date_of_incorporation: '1981-07-02',
    company_type: 'Public Limited Company',
    company_status: 'Active',
    authorized_capital: 7200000000,
    paid_up_capital: 4240200000,
    registered_address: 'Electronics City, Hosur Road, Bangalore, Karnataka - 560100',
    email: 'investor_relations@infosys.com',
    directors: ['Salil Parekh', 'Nandan Nilekani', 'U B Pravin Rao'],
  },
  'L24100GJ1988PLC011652': {
    company_name: 'Reliance Industries Limited',
    cin: 'L24100GJ1988PLC011652',
    company_class: 'Oil & Gas, Petrochemicals',
    date_of_incorporation: '1973-05-08',
    company_type: 'Public Limited Company',
    company_status: 'Active',
    authorized_capital: 12000000000,
    paid_up_capital: 6339432320,
    registered_address: '3rd Floor, Maker Chambers IV, Nariman Point, Mumbai, Maharashtra - 400021',
    email: 'investor.relations@ril.com',
    directors: ['Mukesh D. Ambani', 'Nikhil R. Meswani', 'Hital R. Meswani'],
  },
  'U72900KA2003PTC031497': {
    company_name: 'Wipro Limited',
    cin: 'U72900KA2003PTC031497',
    company_class: 'IT Services & Consulting',
    date_of_incorporation: '1945-12-29',
    company_type: 'Public Limited Company',
    company_status: 'Active',
    authorized_capital: 3100000000,
    paid_up_capital: 5103830000,
    registered_address: 'Doddakannelli, Sarjapur Road, Bangalore, Karnataka - 560035',
    email: 'investor.relations@wipro.com',
    directors: ['Thierry Delaporte', 'Rishad Premji', 'Jatin Dalal'],
  },
  'L65110MH1985PLC038784': {
    company_name: 'Kotak Mahindra Bank Limited',
    cin: 'L65110MH1985PLC038784',
    company_class: 'Banking & Financial Services',
    date_of_incorporation: '1985-11-19',
    company_type: 'Public Limited Company',
    company_status: 'Active',
    authorized_capital: 3000000000,
    paid_up_capital: 1990637082,
    registered_address: '27 BKC, C 27, G Block, Bandra Kurla Complex, Mumbai, Maharashtra - 400051',
    email: 'ir@kotak.com',
    directors: ['Uday Kotak', 'Dipak Gupta', 'Shanti Ekambaram'],
  },
  'L74999DL1985PLC022194': {
    company_name: 'Bharti Airtel Limited',
    cin: 'L74999DL1985PLC022194',
    company_class: 'Telecommunications',
    date_of_incorporation: '1995-07-07',
    company_type: 'Public Limited Company',
    company_status: 'Active',
    authorized_capital: 8000000000,
    paid_up_capital: 5977840310,
    registered_address: 'Airtel Center, Plot No. 16, Udyog Vihar, Phase IV, Gurugram, Haryana - 122015',
    email: 'investor.relations@bharti.in',
    directors: ['Sunil Bharti Mittal', 'Gopal Vittal', 'Shashwat Sharma'],
  },
  'L99999MH1945PLC004058': {
    company_name: 'Larsen & Toubro Limited',
    cin: 'L99999MH1945PLC004058',
    company_class: 'Engineering, Construction & Manufacturing',
    date_of_incorporation: '1946-02-07',
    company_type: 'Public Limited Company',
    company_status: 'Active',
    authorized_capital: 3500000000,
    paid_up_capital: 1403455240,
    registered_address: 'L&T House, Ballard Estate, Mumbai, Maharashtra - 400001',
    email: 'investor@larsentoubro.com',
    directors: ['S. N. Subrahmanyan', 'R. Shankar Raman', 'P. Ramakrishnan'],
  },
  'U72900KA2015PTC081111': {
    company_name: 'Tech Innovations Private Limited',
    cin: 'U72900KA2015PTC081111',
    company_class: 'Technology & Software Development',
    date_of_incorporation: '2015-03-15',
    company_type: 'Private Limited Company',
    company_status: 'Active',
    authorized_capital: 5000000,
    paid_up_capital: 2500000,
    registered_address: 'HSR Layout, Sector 1, Bangalore, Karnataka - 560102',
    email: 'contact@techinnovations.in',
    directors: ['Rajesh Kumar', 'Priya Sharma'],
  },
  'U45200DL2018PTC333333': {
    company_name: 'Build Masters Construction Private Limited',
    cin: 'U45200DL2018PTC333333',
    company_class: 'Construction & Real Estate',
    date_of_incorporation: '2018-06-10',
    company_type: 'Private Limited Company',
    company_status: 'Active',
    authorized_capital: 20000000,
    paid_up_capital: 15000000,
    registered_address: 'Connaught Place, New Delhi, Delhi - 110001',
    email: 'info@buildmasters.in',
    directors: ['Amit Verma', 'Suresh Gupta', 'Neha Kapoor'],
  },
};

/**
 * Mock fetch function for development
 * Use when Sandbox API is not available
 */
export async function mockFetchCompanyByCIN(cin: string): Promise<any> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const cleanCIN = cin.toUpperCase().trim();
  const companyData = mockMCADatabase[cleanCIN];

  if (companyData) {
    return {
      success: true,
      data: companyData,
    };
  }

  return {
    success: false,
    error: 'Company not found in mock database. Use one of the sample CINs.',
  };
}
