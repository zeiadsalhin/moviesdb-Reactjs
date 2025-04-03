import { createClient } from '@supabase/supabase-js';

// This file contains the Supabase client configuration for authentication
// and database operations. It uses environment variables to securely store the supabase URL and anon key.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
