import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://xciavyhsoevzxopleumv.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log("Testing Supabase connection...");
  
  // Test querying the orders table
  const { data, error } = await supabase.from('orders').select('id').limit(1);
  
  if (error) {
    console.error("Error querying 'orders' table:", error.message);
  } else {
    console.log("Successfully connected to Supabase and queried 'orders' table.");
    console.log("Data received:", data);
  }
}

testConnection();
