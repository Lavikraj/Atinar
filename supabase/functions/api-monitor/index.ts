import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ApiEndpoint {
  id: string
  url: string
  interval: number
  user_id: string
}

interface ApiCheck {
  endpoint_id: string
  status: 'up' | 'down'
  response_time: number
  status_code?: number
  error_message?: string
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get all API endpoints that need checking
    const { data: endpoints, error: fetchError } = await supabaseClient
      .from('api_endpoints')
      .select('*')

    if (fetchError) {
      throw fetchError
    }

    const results = []

    for (const endpoint of endpoints as ApiEndpoint[]) {
      try {
        const startTime = Date.now()
        
        const response = await fetch(endpoint.url, {
          method: 'GET',
          headers: {
            'User-Agent': 'ATINAR-Monitor/1.0',
          },
          signal: AbortSignal.timeout(30000), // 30 second timeout
        })

        const endTime = Date.now()
        const responseTime = endTime - startTime

        const checkData: ApiCheck = {
          endpoint_id: endpoint.id,
          status: response.ok ? 'up' : 'down',
          response_time: responseTime,
          status_code: response.status,
        }

        if (!response.ok) {
          checkData.error_message = `HTTP ${response.status}: ${response.statusText}`
        }

        // Insert check record
        const { error: insertError } = await supabaseClient
          .from('api_checks')
          .insert([checkData])

        if (insertError) {
          console.error('Failed to insert check:', insertError)
        }

        // Update endpoint status and last_checked
        const { error: updateError } = await supabaseClient
          .from('api_endpoints')
          .update({
            status: checkData.status,
            last_checked: new Date().toISOString(),
          })
          .eq('id', endpoint.id)

        if (updateError) {
          console.error('Failed to update endpoint:', updateError)
        }

        results.push({
          endpoint_id: endpoint.id,
          url: endpoint.url,
          status: checkData.status,
          response_time: responseTime,
          status_code: response.status,
        })

      } catch (error) {
        console.error(`Failed to check ${endpoint.url}:`, error)

        const checkData: ApiCheck = {
          endpoint_id: endpoint.id,
          status: 'down',
          response_time: 0,
          error_message: error.message || 'Connection failed',
        }

        // Insert failed check record
        await supabaseClient
          .from('api_checks')
          .insert([checkData])

        // Update endpoint status
        await supabaseClient
          .from('api_endpoints')
          .update({
            status: 'down',
            last_checked: new Date().toISOString(),
          })
          .eq('id', endpoint.id)

        results.push({
          endpoint_id: endpoint.id,
          url: endpoint.url,
          status: 'down',
          error: error.message,
        })
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        checked: results.length,
        results,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )

  } catch (error) {
    console.error('Monitor function error:', error)
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})