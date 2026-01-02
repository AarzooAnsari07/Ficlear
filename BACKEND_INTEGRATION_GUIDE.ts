/**
 * Supabase Edge Function: fetch-company-by-cin
 * 
 * This Edge Function securely calls the Sandbox MCA API
 * and returns company details based on CIN number.
 * 
 * DEPLOYMENT STEPS:
 * ==================
 * 
 * 1. Install Supabase CLI:
 *    npm install -g supabase
 * 
 * 2. Login to Supabase:
 *    supabase login
 * 
 * 3. Create this function:
 *    Create file: supabase/functions/fetch-company-by-cin/index.ts
 *    Copy the code below into that file
 * 
 * 4. Set secrets (IMPORTANT):
 *    supabase secrets set SANDBOX_API_KEY=your_api_key_here
 *    supabase secrets set SANDBOX_AUTH_TOKEN=your_access_token_here
 * 
 * 5. Deploy the function:
 *    supabase functions deploy fetch-company-by-cin
 * 
 * 6. Update your React app with the function URL:
 *    Update REACT_APP_BACKEND_URL in your .env:
 *    REACT_APP_BACKEND_URL=https://your-project.supabase.co/functions/v1/fetch-company-by-cin
 * 
 * ==================
 * EDGE FUNCTION CODE (Copy to supabase/functions/fetch-company-by-cin/index.ts)
 * ==================
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const MCA_API_URL = "https://api.sandbox.co.in/mca/company/master-data/search"

interface MCARequest {
  cin: string;
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  }

  try {
    // Parse request body
    const { cin }: MCARequest = await req.json()

    // Validate CIN
    if (!cin || cin.length !== 21) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid CIN number. Must be 21 characters.',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
    }

    // Get API credentials from environment
    const apiKey = Deno.env.get('SANDBOX_API_KEY')
    const authToken = Deno.env.get('SANDBOX_AUTH_TOKEN')

    if (!apiKey || !authToken) {
      console.error('Missing API credentials')
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Server configuration error',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
    }

    // Call Sandbox MCA API
    const mcaResponse = await fetch(MCA_API_URL, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'Authorization': authToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        '@entity': 'in.co.sandbox.kyc.mca.master_data.request',
        id: cin,
        consent: 'Y',
        reason: 'Company verification for loan eligibility',
      }),
    })

    if (!mcaResponse.ok) {
      const errorText = await mcaResponse.text()
      console.error('MCA API Error:', errorText)
      
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Failed to fetch company details from MCA',
          details: errorText,
        }),
        {
          status: mcaResponse.status,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
    }

    // Parse and return MCA response
    const mcaData = await mcaResponse.json()

    return new Response(
      JSON.stringify({
        success: true,
        data: mcaData,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  } catch (error) {
    console.error('Edge Function Error:', error)
    
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Internal server error',
        message: error.message,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  }
})

/**
 * TESTING THE FUNCTION:
 * =====================
 * 
 * Test locally before deploying:
 * 
 * 1. Run function locally:
 *    supabase functions serve fetch-company-by-cin
 * 
 * 2. Test with curl:
 *    curl -X POST http://localhost:54321/functions/v1/fetch-company-by-cin \
 *      -H "Content-Type: application/json" \
 *      -d '{"cin": "L22210MH1995PLC084781"}'
 * 
 * 3. Or test with frontend (update API_ENDPOINT to local URL)
 * 
 * =====================
 * ALTERNATIVE: Express.js Backend
 * =====================
 * 
 * If you prefer to host your own Express.js server:
 * 
 * 1. Use the code provided in your chat
 * 2. Deploy to:
 *    - Heroku
 *    - Railway.app
 *    - Render.com
 *    - Digital Ocean
 *    - AWS/GCP/Azure
 * 
 * 3. Update REACT_APP_BACKEND_URL to your deployed URL
 * 
 * =====================
 * CACHING (RECOMMENDED)
 * =====================
 * 
 * To avoid repeated API calls and save costs:
 * 
 * 1. Create a Supabase table:
 *    CREATE TABLE companies (
 *      cin VARCHAR(21) PRIMARY KEY,
 *      company_data JSONB,
 *      fetched_at TIMESTAMP DEFAULT NOW()
 *    );
 * 
 * 2. Update Edge Function to:
 *    - Check database first
 *    - If found and fresh (< 30 days), return cached
 *    - Else, fetch from API and cache
 * 
 * 3. Benefits:
 *    - Faster response times
 *    - Reduced API costs
 *    - Offline capability
 */
