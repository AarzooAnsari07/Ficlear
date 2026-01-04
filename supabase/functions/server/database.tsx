// Database Schema and Helper Functions
import { createClient } from "jsr:@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

export const supabase = createClient(supabaseUrl, supabaseServiceKey);

// ==================== TABLE SCHEMAS ====================

export const TABLE_SCHEMAS = {
  companies: `
    CREATE TABLE IF NOT EXISTS companies_6159e8d5 (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `,
  
  pincodes: `
    CREATE TABLE IF NOT EXISTS pincodes_6159e8d5 (
      id SERIAL PRIMARY KEY,
      pincode TEXT NOT NULL,
      officename TEXT NOT NULL,
      officetype TEXT,
      deliverystatus TEXT,
      divisionname TEXT,
      regionname TEXT,
      circlename TEXT,
      taluk TEXT,
      districtname TEXT,
      statename TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      UNIQUE(pincode, officename)
    );
    CREATE INDEX IF NOT EXISTS idx_pincodes_pincode ON pincodes_6159e8d5(pincode);
    CREATE INDEX IF NOT EXISTS idx_pincodes_officename ON pincodes_6159e8d5(officename);
    CREATE INDEX IF NOT EXISTS idx_pincodes_statename ON pincodes_6159e8d5(statename);
  `,
  
  banks: `
    CREATE TABLE IF NOT EXISTS banks_6159e8d5 (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      logo TEXT,
      roi DECIMAL(5,2),
      processing_fee DECIMAL(5,2),
      max_tenure INTEGER,
      criteria JSONB,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `,
  
  bank_offers: `
    CREATE TABLE IF NOT EXISTS bank_offers_6159e8d5 (
      id SERIAL PRIMARY KEY,
      bank_id TEXT NOT NULL,
      loan_type TEXT NOT NULL,
      min_amount DECIMAL(15,2),
      max_amount DECIMAL(15,2),
      roi DECIMAL(5,2),
      tenure_months INTEGER,
      conditions JSONB,
      created_at TIMESTAMP DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS idx_offers_bank_id ON bank_offers_6159e8d5(bank_id);
  `,
  
  leads: `
    CREATE TABLE IF NOT EXISTS leads_6159e8d5 (
      id TEXT PRIMARY KEY,
      customer_name TEXT NOT NULL,
      email TEXT,
      phone TEXT,
      loan_type TEXT,
      loan_amount DECIMAL(15,2),
      salary DECIMAL(15,2),
      cibil_score INTEGER,
      company_category TEXT,
      pincode TEXT,
      status TEXT DEFAULT 'new',
      assigned_to TEXT,
      eligibility_results JSONB,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS idx_leads_status ON leads_6159e8d5(status);
    CREATE INDEX IF NOT EXISTS idx_leads_created ON leads_6159e8d5(created_at);
  `,
  
  activities: `
    CREATE TABLE IF NOT EXISTS activities_6159e8d5 (
      id SERIAL PRIMARY KEY,
      lead_id TEXT NOT NULL,
      activity_type TEXT NOT NULL,
      description TEXT,
      user_name TEXT,
      metadata JSONB,
      created_at TIMESTAMP DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS idx_activities_lead_id ON activities_6159e8d5(lead_id);
    CREATE INDEX IF NOT EXISTS idx_activities_created ON activities_6159e8d5(created_at);
  `
};

// ==================== INITIALIZE DATABASE ====================

export async function initializeTables() {
  console.log("🗄️ Initializing database tables...");
  
  for (const [tableName, schema] of Object.entries(TABLE_SCHEMAS)) {
    try {
      const { error } = await supabase.rpc('exec_sql', { sql: schema });
      if (error) {
        console.log(`⚠️ Table ${tableName} creation: ${error.message}`);
      } else {
        console.log(`✅ Table ${tableName} ready`);
      }
    } catch (err) {
      console.log(`❌ Error creating table ${tableName}:`, err);
    }
  }
  
  console.log("✅ Database initialization complete");
}

// ==================== HELPER FUNCTIONS ====================

// Companies
export async function getAllCompanies() {
  const { data, error } = await supabase
    .from('companies_6159e8d5')
    .select('*')
    .order('name');
  return { data, error };
}

export async function createCompany(company: any) {
  const { data, error } = await supabase
    .from('companies_6159e8d5')
    .insert(company)
    .select()
    .single();
  return { data, error };
}

// PIN Codes
export async function searchPincodesByCode(pincode: string) {
  const { data, error } = await supabase
    .from('pincodes_6159e8d5')
    .select('*')
    .eq('pincode', pincode);
  return { data, error };
}

export async function searchPincodesByArea(searchTerm: string) {
  const { data, error } = await supabase
    .from('pincodes_6159e8d5')
    .select('*')
    .or(`officename.ilike.%${searchTerm}%,districtname.ilike.%${searchTerm}%,statename.ilike.%${searchTerm}%`)
    .limit(100);
  return { data, error };
}

export async function bulkInsertPincodes(pincodes: any[]) {
  const { data, error } = await supabase
    .from('pincodes_6159e8d5')
    .upsert(pincodes, { onConflict: 'pincode,officename', ignoreDuplicates: true })
    .select();
  return { data, error };
}

export async function getPincodeCount() {
  const { count, error } = await supabase
    .from('pincodes_6159e8d5')
    .select('*', { count: 'exact', head: true });
  return { count, error };
}

// Banks
export async function getAllBanks() {
  const { data, error } = await supabase
    .from('banks_6159e8d5')
    .select('*')
    .order('name');
  return { data, error };
}

export async function createBank(bank: any) {
  const { data, error } = await supabase
    .from('banks_6159e8d5')
    .insert(bank)
    .select()
    .single();
  return { data, error };
}

// Bank Offers
export async function getAllOffers() {
  const { data, error } = await supabase
    .from('bank_offers_6159e8d5')
    .select('*')
    .order('created_at', { ascending: false });
  return { data, error };
}

export async function getOffersByBank(bankId: string) {
  const { data, error } = await supabase
    .from('bank_offers_6159e8d5')
    .select('*')
    .eq('bank_id', bankId);
  return { data, error };
}

export async function createOffer(offer: any) {
  const { data, error } = await supabase
    .from('bank_offers_6159e8d5')
    .insert(offer)
    .select()
    .single();
  return { data, error };
}

// Leads
export async function getAllLeads() {
  const { data, error } = await supabase
    .from('leads_6159e8d5')
    .select('*')
    .order('created_at', { ascending: false });
  return { data, error };
}

export async function getLeadById(id: string) {
  const { data, error } = await supabase
    .from('leads_6159e8d5')
    .select('*')
    .eq('id', id)
    .single();
  return { data, error };
}

export async function createLead(lead: any) {
  const { data, error } = await supabase
    .from('leads_6159e8d5')
    .insert(lead)
    .select()
    .single();
  return { data, error };
}

export async function updateLead(id: string, updates: any) {
  const { data, error } = await supabase
    .from('leads_6159e8d5')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  return { data, error };
}

export async function deleteLead(id: string) {
  const { error } = await supabase
    .from('leads_6159e8d5')
    .delete()
    .eq('id', id);
  return { error };
}

// Activities
export async function getActivitiesByLead(leadId: string) {
  const { data, error } = await supabase
    .from('activities_6159e8d5')
    .select('*')
    .eq('lead_id', leadId)
    .order('created_at', { ascending: false });
  return { data, error };
}

export async function createActivity(activity: any) {
  const { data, error } = await supabase
    .from('activities_6159e8d5')
    .insert(activity)
    .select()
    .single();
  return { data, error };
}
