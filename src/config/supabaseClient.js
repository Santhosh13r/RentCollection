import { createClient } from '@supabase/supabase-js'
import process  from 'process'

const supabaseUrl = 'https://xsxhyxyqodxldtpdsbnu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzeGh5eHlxb2R4bGR0cGRzYm51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5MjU0MzEsImV4cCI6MjA1NzUwMTQzMX0.eTT8XO-mKvW_1PySm0wG0lmfUpCUKGH2pLAIVSnzeKE'

if (!supabaseUrl || !supabaseKey) {
    throw new Error("Check the Key & URL in your Supabase configuration.");
}

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;






