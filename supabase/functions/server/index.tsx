import { Hono } from "npm:hono@4";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-6159e8d5/health", (c) => {
  return c.json({ status: "ok" });
});

// ==================== PIN CODE DATABASE (LOCAL) ====================

// Bulk import PIN codes from CSV file - OPTIMIZED
app.post("/make-server-6159e8d5/pincode-bulk-import", async (c) => {
  try {
    const body = await c.req.json();
    const { data, batchIndex = 0, batchSize = 500 } = body; // Increased to 500 per batch
    
    if (!data || !Array.isArray(data)) {
      return c.json({ success: false, error: "Invalid data format" }, 400);
    }

    // Calculate batch boundaries
    const startIdx = batchIndex * batchSize;
    const endIdx = Math.min(startIdx + batchSize, data.length);
    const batchData = data.slice(startIdx, endIdx);
    const isLastBatch = endIdx >= data.length;

    console.log(`Batch ${batchIndex + 1}: ${startIdx}-${endIdx}/${data.length}`);
    
    // Prepare bulk insert arrays
    const keys: string[] = [];
    const values: string[] = [];

    for (const record of batchData) {
      const pincode = record.pincode || record.Pincode || record.PIN || record.pin;
      if (!pincode) continue;

      const normalizedRecord = {
        pincode: String(pincode),
        officename: record.officename || record.OfficeName || record.office_name || '',
        officeType: record.officeType || record.OfficeType || record.office_type || '',
        Deliverystatus: record.Deliverystatus || record.DeliveryStatus || record.delivery_status || '',
        divisionname: record.divisionname || record.DivisionName || record.division_name || '',
        regionname: record.regionname || record.RegionName || record.region_name || '',
        circlename: record.circlename || record.CircleName || record.circle_name || '',
        Taluk: record.Taluk || record.taluk || '',
        Districtname: record.Districtname || record.DistrictName || record.district_name || '',
        statename: record.statename || record.StateName || record.state_name || record.State || ''
      };

      const key = `pincode-data:${normalizedRecord.pincode}:${normalizedRecord.officename}`;
      keys.push(key);
      values.push(JSON.stringify(normalizedRecord));
    }

    // Bulk insert using mset for speed
    if (keys.length > 0) {
      await kv.mset(keys, values);
    }

    const imported = keys.length;
    const failed = batchData.length - imported;

    console.log(`✓ Batch ${batchIndex + 1}: ${imported} imported`);
    
    return c.json({ 
      success: true, 
      imported,
      failed,
      totalRecords: data.length,
      processedRecords: endIdx,
      isLastBatch,
      nextBatchIndex: isLastBatch ? null : batchIndex + 1,
      progress: Math.round((endIdx / data.length) * 100)
    });
  } catch (error) {
    console.log("Bulk import error:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ==================== COMPANY DATABASE (FROM DATA.GOV.IN) ====================

// Bulk import companies from data.gov.in CSV
app.post("/make-server-6159e8d5/company-bulk-import", async (c) => {
  try {
    const body = await c.req.json();
    const { data, batchIndex = 0, batchSize = 500 } = body;
    
    if (!data || !Array.isArray(data)) {
      return c.json({ success: false, error: "Invalid data format" }, 400);
    }

    const startIdx = batchIndex * batchSize;
    const endIdx = Math.min(startIdx + batchSize, data.length);
    const batchData = data.slice(startIdx, endIdx);
    const isLastBatch = endIdx >= data.length;

    console.log(`Company Batch ${batchIndex + 1}: ${startIdx}-${endIdx}/${data.length}`);
    
    const keys: string[] = [];
    const values: any[] = [];

    for (const record of batchData) {
      const name = record.company_name || record.CompanyName || record.name || record.Name;
      if (!name) continue;

      const companyId = record.company_id || record.CompanyID || `COMP${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const normalizedRecord = {
        companyId,
        name: String(name).trim(),
        category: record.category || record.Category || 'C',
        cin: record.cin || record.CIN || '',
        industry: record.industry || record.Industry || '',
        sector: record.sector || record.Sector || '',
        registeredOffice: record.registered_office || record.RegisteredOffice || '',
        paidUpCapital: record.paid_up_capital || record.PaidUpCapital || '',
        authorizedCapital: record.authorized_capital || record.AuthorizedCapital || '',
        listedStatus: record.listed_status || record.ListedStatus || '',
        createdAt: new Date().toISOString()
      };

      const key = `company:${companyId}`;
      keys.push(key);
      values.push(normalizedRecord);
    }

    if (keys.length > 0) {
      await kv.mset(keys, values);
    }

    const imported = keys.length;
    const failed = batchData.length - imported;

    console.log(`✓ Company Batch ${batchIndex + 1}: ${imported} imported`);
    
    return c.json({ 
      success: true, 
      imported,
      failed,
      totalRecords: data.length,
      processedRecords: endIdx,
      isLastBatch,
      nextBatchIndex: isLastBatch ? null : batchIndex + 1,
      progress: Math.round((endIdx / data.length) * 100)
    });
  } catch (error) {
    console.log("Company bulk import error:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Search PIN codes from local KV store
app.get("/make-server-6159e8d5/pincode-search/:pincode", async (c) => {
  try {
    const pincode = c.req.param("pincode");
    
    console.log(`Searching local database for PIN code: ${pincode}`);
    const localResults = await kv.getByPrefix(`pincode-data:${pincode}:`);
    
    if (localResults && localResults.length > 0) {
      console.log(`Found ${localResults.length} records in local database`);
      const parsedRecords = localResults.map(r => {
        try {
          return JSON.parse(r.value);
        } catch {
          return null;
        }
      }).filter(r => r !== null);
      
      return c.json({ 
        success: true, 
        data: parsedRecords,
        total: parsedRecords.length,
        source: 'local'
      });
    }
    
    // Not found
    console.log(`PIN code ${pincode} not found in local database`);
    return c.json({ 
      success: true, 
      data: [],
      total: 0,
      source: 'local',
      message: 'PIN code not found. Please import PIN code data via Admin Panel.'
    });
  } catch (error) {
    console.log("Error searching PIN codes:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Search PIN codes by area name from local database
app.get("/make-server-6159e8d5/pincode-search-by-area/:area", async (c) => {
  try {
    const area = c.req.param("area").toLowerCase();
    
    console.log(`Searching local database for area: ${area}`);
    const allResults = await kv.getByPrefix(`pincode-data:`);
    
    if (allResults && allResults.length > 0) {
      const parsedRecords = allResults.map(r => {
        try {
          return JSON.parse(r.value);
        } catch {
          return null;
        }
      }).filter(r => r !== null);
      
      // Filter by area name
      const matchingRecords = parsedRecords.filter(record => {
        const officename = (record.officename || '').toLowerCase();
        const districtname = (record.Districtname || '').toLowerCase();
        const statename = (record.statename || '').toLowerCase();
        
        return officename.includes(area) || 
               districtname.includes(area) || 
               statename.includes(area);
      });
      
      console.log(`Found ${matchingRecords.length} matching records`);
      
      return c.json({ 
        success: true, 
        data: matchingRecords.slice(0, 100), // Limit to 100 results
        total: matchingRecords.length,
        source: 'local'
      });
    }
    
    // Not found
    console.log(`No results found for area: ${area}`);
    return c.json({ 
      success: true, 
      data: [],
      total: 0,
      source: 'local',
      message: 'No matching areas found. Please import PIN code data via Admin Panel.'
    });
  } catch (error) {
    console.log("Error searching by area:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ==================== COMPANIES ENDPOINTS ====================

// Get all companies
app.get("/make-server-6159e8d5/companies", async (c) => {
  try {
    const results = await kv.getByPrefix("company:");
    // getByPrefix returns values directly
    const companies = results.map(r => typeof r === 'string' ? JSON.parse(r) : r);
    return c.json({ success: true, data: companies, count: companies.length });
  } catch (error) {
    console.log("Error fetching companies:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get company by ID
app.get("/make-server-6159e8d5/companies/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const result = await kv.get(`company:${id}`);
    if (!result) {
      return c.json({ success: false, error: "Company not found" }, 404);
    }
    const company = typeof result.value === 'string' ? JSON.parse(result.value) : result.value;
    return c.json({ success: true, data: company });
  } catch (error) {
    console.log("Error fetching company:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Create company
app.post("/make-server-6159e8d5/companies", async (c) => {
  try {
    const company = await c.req.json();
    const id = company.companyId || `COMP${Date.now()}`;
    await kv.set(`company:${id}`, company);
    return c.json({ success: true, data: { ...company, companyId: id } });
  } catch (error) {
    console.log("Error creating company:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Update company
app.put("/make-server-6159e8d5/companies/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const company = await c.req.json();
    await kv.set(`company:${id}`, company);
    return c.json({ success: true, data: company });
  } catch (error) {
    console.log("Error updating company:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Delete company
app.delete("/make-server-6159e8d5/companies/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`company:${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.log("Error deleting company:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Bulk import companies
app.post("/make-server-6159e8d5/companies/bulk-import", async (c) => {
  try {
    const { companies } = await c.req.json();
    const keys = companies.map((comp: any) => `company:${comp.companyId}`);
    const values = companies;
    await kv.mset(keys, values);
    return c.json({ success: true, count: companies.length });
  } catch (error) {
    console.log("Error bulk importing companies:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ==================== PINCODES ENDPOINTS ====================

// Get all pincodes
app.get("/make-server-6159e8d5/pincodes", async (c) => {
  try {
    const results = await kv.getByPrefix("pincode:");
    // getByPrefix returns values directly
    const pincodes = results.map(r => typeof r === 'string' ? JSON.parse(r) : r);
    return c.json({ success: true, data: pincodes, count: pincodes.length });
  } catch (error) {
    console.log("Error fetching pincodes:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get pincode by code
app.get("/make-server-6159e8d5/pincodes/:code", async (c) => {
  try {
    const code = c.req.param("code");
    const result = await kv.get(`pincode:${code}`);
    if (!result) {
      return c.json({ success: false, error: "Pincode not found" }, 404);
    }
    const pincode = typeof result.value === 'string' ? JSON.parse(result.value) : result.value;
    return c.json({ success: true, data: pincode });
  } catch (error) {
    console.log("Error fetching pincode:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Create pincode
app.post("/make-server-6159e8d5/pincodes", async (c) => {
  try {
    const pincode = await c.req.json();
    await kv.set(`pincode:${pincode.code}`, pincode);
    return c.json({ success: true, data: pincode });
  } catch (error) {
    console.log("Error creating pincode:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Update pincode
app.put("/make-server-6159e8d5/pincodes/:code", async (c) => {
  try {
    const code = c.req.param("code");
    const pincode = await c.req.json();
    await kv.set(`pincode:${code}`, pincode);
    return c.json({ success: true, data: pincode });
  } catch (error) {
    console.log("Error updating pincode:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Delete pincode
app.delete("/make-server-6159e8d5/pincodes/:code", async (c) => {
  try {
    const code = c.req.param("code");
    await kv.del(`pincode:${code}`);
    return c.json({ success: true });
  } catch (error) {
    console.log("Error deleting pincode:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Bulk import pincodes
app.post("/make-server-6159e8d5/pincodes/bulk-import", async (c) => {
  try {
    const { pincodes } = await c.req.json();
    const keys = pincodes.map((pin: any) => `pincode:${pin.code}`);
    const values = pincodes;
    await kv.mset(keys, values);
    return c.json({ success: true, count: pincodes.length });
  } catch (error) {
    console.log("Error bulk importing pincodes:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ==================== BANKS ENDPOINTS ====================

// Get all banks
app.get("/make-server-6159e8d5/banks", async (c) => {
  try {
    const results = await kv.getByPrefix("bank:");
    // getByPrefix returns values directly
    const banks = results.map(r => typeof r === 'string' ? JSON.parse(r) : r);
    return c.json({ success: true, data: banks, count: banks.length });
  } catch (error) {
    console.log("Error fetching banks:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get bank by ID
app.get("/make-server-6159e8d5/banks/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const result = await kv.get(`bank:${id}`);
    if (!result) {
      return c.json({ success: false, error: "Bank not found" }, 404);
    }
    const bank = typeof result.value === 'string' ? JSON.parse(result.value) : result.value;
    return c.json({ success: true, data: bank });
  } catch (error) {
    console.log("Error fetching bank:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Create bank
app.post("/make-server-6159e8d5/banks", async (c) => {
  try {
    const bank = await c.req.json();
    await kv.set(`bank:${bank.id}`, bank);
    return c.json({ success: true, data: bank });
  } catch (error) {
    console.log("Error creating bank:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Update bank
app.put("/make-server-6159e8d5/banks/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const bank = await c.req.json();
    await kv.set(`bank:${id}`, bank);
    return c.json({ success: true, data: bank });
  } catch (error) {
    console.log("Error updating bank:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Delete bank
app.delete("/make-server-6159e8d5/banks/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`bank:${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.log("Error deleting bank:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Bulk import banks
app.post("/make-server-6159e8d5/banks/bulk-import", async (c) => {
  try {
    const { banks } = await c.req.json();
    const keys = banks.map((bank: any) => `bank:${bank.id}`);
    const values = banks;
    await kv.mset(keys, values);
    return c.json({ success: true, count: banks.length });
  } catch (error) {
    console.log("Error bulk importing banks:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ==================== OFFERS ENDPOINTS ====================

// Get all offers
app.get("/make-server-6159e8d5/offers", async (c) => {
  try {
    const results = await kv.getByPrefix("offer:");
    // getByPrefix already returns values directly, no need to access .value
    const offers = results.map(r => typeof r === 'string' ? JSON.parse(r) : r);
    return c.json({ success: true, data: offers, count: offers.length });
  } catch (error) {
    console.log("Error fetching offers:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get offer by ID
app.get("/make-server-6159e8d5/offers/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const result = await kv.get(`offer:${id}`);
    if (!result) {
      return c.json({ success: false, error: "Offer not found" }, 404);
    }
    // kv.get returns the value directly
    const offer = typeof result === 'string' ? JSON.parse(result) : result;
    return c.json({ success: true, data: offer });
  } catch (error) {
    console.log("Error fetching offer:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Create offer
app.post("/make-server-6159e8d5/offers", async (c) => {
  try {
    const offer = await c.req.json();
    const id = offer.id || `OFFER${Date.now()}`;
    await kv.set(`offer:${id}`, { ...offer, id });
    return c.json({ success: true, data: { ...offer, id } });
  } catch (error) {
    console.log("Error creating offer:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Update offer
app.put("/make-server-6159e8d5/offers/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const offer = await c.req.json();
    await kv.set(`offer:${id}`, offer);
    return c.json({ success: true, data: offer });
  } catch (error) {
    console.log("Error updating offer:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Delete offer
app.delete("/make-server-6159e8d5/offers/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`offer:${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.log("Error deleting offer:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ==================== SETTINGS ====================

// Get platform settings
app.get("/make-server-6159e8d5/settings", async (c) => {
  try {
    const settingsData = await kv.get("platform:settings");
    
    // Return default settings if not found
    if (!settingsData) {
      const defaultSettings = {
        platformName: 'FiClear',
        supportEmail: 'support@ficlear.com',
        supportPhone: '+91 1800-XXX-XXXX',
        primaryColor: '#2563eb',
        logoUrl: '',
        footerText: '© 2026 FiClear. All rights reserved.',
        address: '123 Finance Street, Mumbai, India'
      };
      return c.json({ success: true, data: defaultSettings });
    }
    
    const settings = typeof settingsData === 'string' ? JSON.parse(settingsData) : settingsData;
    return c.json({ success: true, data: settings });
  } catch (error) {
    console.log("Error fetching settings:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Update platform settings
app.put("/make-server-6159e8d5/settings", async (c) => {
  try {
    const settings = await c.req.json();
    await kv.set("platform:settings", JSON.stringify(settings));
    return c.json({ success: true, data: settings });
  } catch (error) {
    console.log("Error updating settings:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

Deno.serve(app.fetch);