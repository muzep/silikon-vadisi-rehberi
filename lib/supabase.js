import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mifrhvhhugptqtgtfmyz.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pZnJodmhodWdwdHF0Z3RmbXl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwNzU3NzQsImV4cCI6MjA2MDY1MTc3NH0.DMQf2GSdZvrR9y4Fpc5J45EPs2kmyIxXxr2VxCtc7lI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 