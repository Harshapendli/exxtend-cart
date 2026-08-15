import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xciavyhsoevzxopleumv.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjaWF2eWhzb2V2enhvcGxldW12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMyMTk5NDEsImV4cCI6MjA5ODc5NTk0MX0.qeKFvPrENE17ylOdd6n_ACmuTtrVck-V_Yb4bKkXvQs';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase credentials in environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
