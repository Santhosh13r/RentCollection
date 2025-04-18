import { createClient } from '@supabase/supabase-js'


const supabaseUrl = 'https://roqgejjyqclpqzsgebge.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvcWdlamp5cWNscHF6c2dlYmdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5OTA3NDYsImV4cCI6MjA2MDU2Njc0Nn0.gYMwXAsK5AS3-p48L-9BpEHZskz1J-fn0m0QskiMBL0'

if (!supabaseUrl || !supabaseKey) {
    throw new Error("Check the Key & URL in your Supabase configuration.");
}

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;






