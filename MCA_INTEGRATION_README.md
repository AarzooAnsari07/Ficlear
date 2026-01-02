# 🏢 MCA Sandbox API Integration Guide

## Overview
This guide explains how to integrate the **Sandbox MCA API** to automatically fetch company details by CIN number in the FiClear admin panel.

---

## 📋 Current Status

**✅ WORKING NOW:** Mock data mode (for development/testing)
- Uses sample data for 11+ major Indian companies
- No backend required
- Perfect for development and demos

**🔜 PRODUCTION MODE:** Real Sandbox MCA API
- Requires backend deployment (Supabase or Express.js)
- Fetches live data from MCA database
- Follows instructions below

---

## 🎯 Features

### Current (Mock Mode)
- ✅ CIN validation (21 characters)
- ✅ Auto-fill all company details
- ✅ Loading states & success indicators
- ✅ Error handling
- ✅ Sample CIN quick-select buttons
- ✅ Works with 11+ real Indian companies

### Production (With Backend)
- 🔜 Real-time MCA data fetching
- 🔜 Unlimited company lookup
- 🔜 Latest company information
- 🔜 Directors, capital, addresses
- 🔜 API caching for performance

---

## 🚀 Quick Start (Development Mode)

**Currently active** - No setup needed!

1. Go to Admin Panel → Company Management
2. Click "Add Company"
3. Click any sample CIN button (or enter manually)
4. Click "Fetch Details"
5. Watch fields auto-populate! ✨

### Sample CINs Available:
- `L22210MH1995PLC084781` - Tata Consultancy Services
- `L65910MH1994PLC080618` - HDFC Bank
- `L67120MH1958PLC011126` - ICICI Bank
- `L72900GJ1999PLC035648` - Infosys
- `L24100GJ1988PLC011652` - Reliance Industries
- And more...

---

## 🔧 Production Setup (Real API)

### Option 1: Supabase Edge Functions (Recommended) ⚡

**Why Supabase?**
- ✅ Serverless (no server management)
- ✅ Built-in security
- ✅ Free tier available
- ✅ Easy deployment
- ✅ Automatic HTTPS

**Steps:**

#### 1. Get Sandbox API Credentials
```bash
# Sign up at: https://www.sandbox.co.in/
# Subscribe to MCA Master Data API
# Get your credentials:
# - x-api-key
# - Authorization token
```

#### 2. Install Supabase CLI
```bash
npm install -g supabase
```

#### 3. Create Supabase Project
```bash
# Login
supabase login

# Initialize project
supabase init
```

#### 4. Create Edge Function
```bash
# Create function
supabase functions new fetch-company-by-cin

# Copy the code from: /BACKEND_INTEGRATION_GUIDE.ts
# Paste into: supabase/functions/fetch-company-by-cin/index.ts
```

#### 5. Set API Secrets
```bash
supabase secrets set SANDBOX_API_KEY=your_api_key_here
supabase secrets set SANDBOX_AUTH_TOKEN=your_auth_token_here
```

#### 6. Deploy Function
```bash
supabase functions deploy fetch-company-by-cin
```

#### 7. Update React App
Create `.env` file in your React app:
```env
REACT_APP_BACKEND_URL=https://your-project.supabase.co/functions/v1/fetch-company-by-cin
```

#### 8. Restart App
```bash
npm start
```

**Done!** 🎉 Now fetching real MCA data!

---

### Option 2: Express.js Backend 🚂

**Steps:**

#### 1. Create Backend Project
```bash
mkdir ficlear-backend
cd ficlear-backend
npm init -y
npm install express axios dotenv cors
```

#### 2. Create `.env` file
```env
SANDBOX_API_KEY=your_api_key_here
SANDBOX_AUTH_TOKEN=your_auth_token_here
PORT=3001
```

#### 3. Create `server.js`
```javascript
import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const MCA_URL = "https://api.sandbox.co.in/mca/company/master-data/search";

app.post("/api/mca/fetch-company-by-cin", async (req, res) => {
  try {
    const { cin } = req.body;

    if (!cin || cin.length !== 21) {
      return res.status(400).json({
        success: false,
        error: "Invalid CIN number"
      });
    }

    const response = await axios.post(
      MCA_URL,
      {
        "@entity": "in.co.sandbox.kyc.mca.master_data.request",
        id: cin,
        consent: "Y",
        reason: "Company verification for loan eligibility"
      },
      {
        headers: {
          "x-api-key": process.env.SANDBOX_API_KEY,
          "Authorization": process.env.SANDBOX_AUTH_TOKEN,
          "Content-Type": "application/json"
        }
      }
    );

    return res.json({
      success: true,
      data: response.data
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.response?.data || "MCA fetch failed"
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
```

#### 4. Deploy Backend
Deploy to:
- **Heroku**: `git push heroku main`
- **Railway**: Connect GitHub repo
- **Render**: Connect GitHub repo
- **Digital Ocean**: Use App Platform

#### 5. Update React App
```env
REACT_APP_BACKEND_URL=https://your-backend-url.com/api/mca/fetch-company-by-cin
```

---

## 💾 Optional: Database Caching (Highly Recommended)

**Why cache?**
- ⚡ Faster response times
- 💰 Reduce API costs
- 📊 Track fetch history
- 🔄 Update only when needed

### Supabase Table Schema
```sql
CREATE TABLE mca_company_cache (
  cin VARCHAR(21) PRIMARY KEY,
  company_data JSONB NOT NULL,
  fetched_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX idx_fetched_at ON mca_company_cache(fetched_at);

-- Auto-update timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_mca_cache_updated_at
BEFORE UPDATE ON mca_company_cache
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();
```

### Update Edge Function Logic
```typescript
// Check cache first (if less than 30 days old, use cached)
const { data: cached } = await supabase
  .from('mca_company_cache')
  .select('*')
  .eq('cin', cin)
  .single();

if (cached && isFresh(cached.fetched_at, 30)) {
  return cached.company_data;
}

// Otherwise fetch from API and cache
const freshData = await fetchFromMCA(cin);

await supabase
  .from('mca_company_cache')
  .upsert({ cin, company_data: freshData });

return freshData;
```

---

## 🧪 Testing

### Test Mock Data
```bash
# Already working - just use the UI!
# Go to Admin → Company Management → Add Company
# Click sample CIN and fetch
```

### Test Real API (Local)
```bash
# Run Supabase function locally
supabase functions serve fetch-company-by-cin

# Test with curl
curl -X POST http://localhost:54321/functions/v1/fetch-company-by-cin \
  -H "Content-Type: application/json" \
  -d '{"cin": "L22210MH1995PLC084781"}'
```

### Test Production API
```bash
# Test deployed endpoint
curl -X POST https://your-project.supabase.co/functions/v1/fetch-company-by-cin \
  -H "Content-Type: application/json" \
  -d '{"cin": "L22210MH1995PLC084781"}'
```

---

## 📊 API Response Format

### Sandbox MCA API Returns:
```json
{
  "company_name": "Tata Consultancy Services Limited",
  "cin": "L22210MH1995PLC084781",
  "company_class": "IT Services",
  "date_of_incorporation": "1995-08-25",
  "company_type": "Public Limited Company",
  "company_status": "Active",
  "authorized_capital": 850000000,
  "paid_up_capital": 371196875,
  "registered_address": "...",
  "directors": ["..."],
  "email": "..."
}
```

### Our App Auto-Fills:
- ✅ Company Name
- ✅ Industry (from company_class)
- ✅ Incorporation Date
- ✅ Company Type
- ✅ Company Status
- ✅ Employee Size (calculated from capital)
- ✅ Risk Tag (Low/Medium/High)

---

## 🔐 Security Best Practices

### ⚠️ NEVER DO THIS:
```javascript
// ❌ DON'T expose API keys in frontend
const API_KEY = "abc123...";
```

### ✅ ALWAYS DO THIS:
```javascript
// ✅ Store in backend environment variables
// ✅ Call backend which calls MCA API
// ✅ Backend validates and sanitizes input
```

---

## 💰 Cost Estimation (Sandbox API)

**Typical Pricing:**
- Pay-per-call model
- ~₹2-5 per API call
- Bulk discounts available

**With Caching:**
- First fetch: ₹2-5
- Subsequent fetches: ₹0 (from cache)
- **Savings: 80-90%** on repeated queries

---

## 🆘 Troubleshooting

### Issue: "Network error"
**Solution:** Check backend URL in `.env` file

### Issue: "Invalid CIN format"
**Solution:** Ensure CIN is exactly 21 characters

### Issue: "Company not found"
**Solution:** CIN may not exist in MCA database

### Issue: "Server configuration error"
**Solution:** Check API key and token are set correctly

### Issue: Backend not responding
**Solution:** 
- Check backend is running
- Verify CORS is enabled
- Check network/firewall

---

## 📚 Resources

- **Sandbox API Docs:** https://www.sandbox.co.in/docs
- **Supabase Edge Functions:** https://supabase.com/docs/guides/functions
- **MCA Portal:** https://www.mca.gov.in/
- **CIN Format Guide:** https://www.mca.gov.in/MinistryV2/corporateidentitynumber.html

---

## ✅ Checklist

### Development (Current)
- [x] Mock data service created
- [x] UI integration complete
- [x] Sample CINs available
- [x] Auto-fill working
- [x] Error handling implemented
- [x] Loading states added

### Production (Next Steps)
- [ ] Get Sandbox API credentials
- [ ] Choose backend option (Supabase/Express)
- [ ] Deploy backend
- [ ] Set environment variables
- [ ] Test with real API
- [ ] Implement caching (optional)
- [ ] Monitor API usage
- [ ] Set up error logging

---

## 🎉 You're All Set!

The feature is **working now** with mock data. When ready for production, follow the steps above to integrate with real Sandbox MCA API.

**Questions?** Check the code comments in:
- `/src/app/services/companyApi.ts`
- `/src/app/services/mockMCAData.ts`
- `/BACKEND_INTEGRATION_GUIDE.ts`
