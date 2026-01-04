# 🗄️ FiClear - Database Integration Guide

## Overview

Your FiClear platform is now fully integrated with **Supabase** for persistent data storage. All companies, PIN codes, banks, and live offers are stored in a cloud database with full CRUD operations.

## 🎯 What's Integrated

### ✅ **Entities in Database:**
1. **Companies** - Company listings with CIN, MCA data, and bank categories
2. **PIN Codes** - PIN code serviceability with bank mappings
3. **Banks** - Bank policies, ROI, criteria, and serviceable PIN codes
4. **Live Offers** - Promotional offers with validity and benefits

## 🚀 How to Initialize Database

### Step 1: Access Admin Panel
1. Click **"Admin"** button in the header
2. Login with credentials (or set up authentication)
3. Navigate to **"Database Settings"** tab

### Step 2: Initialize Database
1. Click **"Initialize Database"** button
2. Wait for the import to complete
3. You'll see success message with counts:
   - ✅ Imported 24 companies
   - ✅ Imported 150+ PIN codes  
   - ✅ Imported 8 banks

### Step 3: Verify Data
1. Click **"Refresh Stats"** to see current counts
2. Navigate to different tabs to verify data:
   - Companies tab - View all companies
   - PIN Codes tab - See all PIN codes with serviceable banks
   - Banks tab - Manage all banks
   - Live Offers tab - Manage promotional offers

## 📡 API Endpoints

All data is accessible via REST API:

### Companies
```
GET    /make-server-6159e8d5/companies          - Get all companies
GET    /make-server-6159e8d5/companies/:id      - Get single company
POST   /make-server-6159e8d5/companies          - Create new company
PUT    /make-server-6159e8d5/companies/:id      - Update company
DELETE /make-server-6159e8d5/companies/:id      - Delete company
POST   /make-server-6159e8d5/companies/bulk-import - Bulk import
```

### PIN Codes
```
GET    /make-server-6159e8d5/pincodes           - Get all PIN codes
GET    /make-server-6159e8d5/pincodes/:code     - Get single PIN code
POST   /make-server-6159e8d5/pincodes           - Create new PIN code
PUT    /make-server-6159e8d5/pincodes/:code     - Update PIN code
DELETE /make-server-6159e8d5/pincodes/:code     - Delete PIN code
POST   /make-server-6159e8d5/pincodes/bulk-import - Bulk import
```

### Banks
```
GET    /make-server-6159e8d5/banks              - Get all banks
GET    /make-server-6159e8d5/banks/:id          - Get single bank
POST   /make-server-6159e8d5/banks              - Create new bank
PUT    /make-server-6159e8d5/banks/:id          - Update bank
DELETE /make-server-6159e8d5/banks/:id          - Delete bank
POST   /make-server-6159e8d5/banks/bulk-import  - Bulk import
```

### Live Offers
```
GET    /make-server-6159e8d5/offers             - Get all offers
GET    /make-server-6159e8d5/offers/:id         - Get single offer
POST   /make-server-6159e8d5/offers             - Create new offer
PUT    /make-server-6159e8d5/offers/:id         - Update offer
DELETE /make-server-6159e8d5/offers/:id         - Delete offer
```

## 💻 Using the Database API in Code

### Import the API utilities:
```typescript
import { 
  companiesAPI, 
  pincodesAPI, 
  banksAPI, 
  offersAPI 
} from './utils/database';
```

### Example: Fetch all companies
```typescript
const fetchCompanies = async () => {
  const response = await companiesAPI.getAll();
  if (response.success) {
    console.log('Companies:', response.data);
  }
};
```

### Example: Create a new bank
```typescript
const createBank = async () => {
  const newBank = {
    id: 'yes_bank',
    name: 'YES Bank',
    logo: '💳',
    roi: 9.5,
    processingFee: 1.25,
    criteria: {
      minCibil: 720,
      maxCibil: 900,
      minSalary: 25000,
      companyCategoryAllowed: ['A', 'B'],
      maxObligationPercent: 50,
      maxLTV: 85,
      serviceablePincodes: ['400001', '110001', '560001']
    },
    features: [
      'Digital first banking',
      'Quick approval',
      'Flexible terms'
    ]
  };
  
  const response = await banksAPI.create(newBank);
  if (response.success) {
    console.log('Bank created:', response.data);
  }
};
```

### Example: Update a PIN code
```typescript
const updatePincode = async () => {
  const updatedData = {
    pinCode: '400001',
    areaName: 'Fort, Mumbai',
    state: 'Maharashtra',
    areaType: 'Metro',
    bankServiceability: {
      'hdfc': { isServiceable: true, remarks: 'Multiple branches' },
      'icici': { isServiceable: true, remarks: 'Branch available' }
    }
  };
  
  const response = await pincodesAPI.update('400001', updatedData);
  if (response.success) {
    console.log('PIN code updated:', response.data);
  }
};
```

## 🔄 Bidirectional PIN Code - Bank Sync

The system automatically syncs serviceable banks in **two directions**:

### From Banks → PIN Codes
When you add serviceable PIN codes in **Banks Management**:
```typescript
// In Banks Management, add serviceable PIN codes
bank.criteria.serviceablePincodes = ['400001', '110001', '560001'];
```
→ These automatically appear in **PIN Code Management** table

### From PIN Codes → Banks
When you select serviceable banks in **PIN Code Management**:
```typescript
// In PIN Code Management, select banks
pincode.bankServiceability = {
  'hdfc': { isServiceable: true },
  'icici': { isServiceable: true }
};
```
→ These automatically reflect in the PIN code's bank count

## 🗃️ Database Schema

### Companies Collection
```typescript
{
  companyId: string;           // Unique ID (e.g., 'COMP001')
  companyName: string;         // Company name
  industry: string;            // Industry type
  cin?: string;                // Corporate Identification Number
  incorporationDate?: string;  // YYYY-MM-DD
  companyStatus?: string;      // Active | Inactive | Strike Off
  isMcaListed?: boolean;       // MCA listed status
  companyType?: string;        // Private | Public | LLP
  employeeSize?: string;       // Micro | Small | Medium | Large
  riskTag?: string;           // Low | Medium | High
  bankCategories: {           // Bank-wise categorization
    [bankId: string]: {
      isListed: boolean;
      category?: 'A' | 'B' | 'C' | 'D';
      maxMultiplier?: number;
      notes?: string;
    }
  }
}
```

### PIN Codes Collection
```typescript
{
  pinCode: string;            // 6-digit PIN code
  areaName: string;           // Area name with city
  state: string;              // State name
  areaType: string;           // Metro | Non-Metro | Rural
  bankServiceability: {       // Bank-wise serviceability
    [bankId: string]: {
      isServiceable: boolean;
      remarks?: string;
    }
  }
}
```

### Banks Collection
```typescript
{
  id: string;                 // Unique bank ID (e.g., 'hdfc')
  name: string;               // Bank name
  logo: string;               // Emoji logo
  roi: number;                // Rate of interest (%)
  processingFee: number;      // Processing fee (%)
  criteria: {
    minCibil: number;         // Min CIBIL score
    maxCibil: number;         // Max CIBIL score
    minSalary: number;        // Min monthly salary (₹)
    companyCategoryAllowed: string[];  // ['A', 'B', 'C', 'D']
    maxObligationPercent: number;      // Max obligation (%)
    maxLTV: number;           // Max LTV (%)
    serviceablePincodes?: string[];    // Array of PIN codes
  };
  features: string[];         // Array of features
}
```

### Live Offers Collection
```typescript
{
  id: string;                 // Unique offer ID
  bankName: string;           // Bank name
  bankLogo: string;           // Emoji logo
  loanType: string;           // Loan type
  offerBadge: string;         // Badge text
  badgeColor: string;         // green | orange | blue
  interestRate: string;       // Interest rate
  interestRateNote: string;   // Rate note
  maxAmount: string;          // Max loan amount
  maxAmountTenure: string;    // Max tenure
  processingFee: string;      // Processing fee
  processingFeeNote: string;  // Fee note
  keyBenefits: string[];      // Array of benefits
  eligibilityCriteria: string;  // Eligibility text
  validTill: string;          // Validity date
  isTrending: boolean;        // Trending flag
}
```

## 🔐 Data Security

- All API calls use authorization headers
- Data is stored in Supabase's secure infrastructure
- Admin panel requires authentication
- CORS enabled for cross-origin requests

## 📊 Admin Panel Features

### Database Settings Tab
- ✅ View connection status
- ✅ See live database statistics
- ✅ Initialize database with one click
- ✅ View all API endpoints
- ✅ Understand database schema

### Data Management Tabs
- **Companies** - Full CRUD operations with CIN fetching
- **PIN Codes** - Edit with serviceable banks selection
- **Banks** - Add serviceable PIN codes (comma-separated)
- **Live Offers** - Manage promotional offers

## 🎨 Key Features

### 1. Automatic Bank Count in PIN Codes
PIN Code table shows:
- 🏛️ **Purple badge** with bank count
- **Bank name badges** showing first 3 banks
- **"+X" overflow badge** for additional banks

### 2. Bidirectional Sync
- Add PIN codes in Banks → Shows in PIN Code table
- Select banks in PIN Code → Updates bank count
- No duplicates, automatic aggregation

### 3. Bulk Import
- Import all existing data with one click
- Preserves all relationships
- Progress indicators and success notifications

## 🚨 Important Notes

1. **First-Time Setup**: Click "Initialize Database" in Database Settings
2. **Data Persistence**: All changes are saved to Supabase automatically
3. **Real-time Updates**: Changes reflect immediately across all tabs
4. **Error Handling**: Check browser console for detailed error logs

## 🎉 You're All Set!

Your FiClear platform now has a complete database backend with:
- ✅ Persistent storage
- ✅ REST API endpoints
- ✅ Full CRUD operations
- ✅ Bidirectional relationships
- ✅ Professional admin interface

Navigate to **Admin → Database Settings** to get started!
