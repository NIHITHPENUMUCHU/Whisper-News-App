// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://hdrshdteymaoebeawiki.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkcnNoZHRleW1hb2ViZWF3aWtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyNTc3ODQsImV4cCI6MjA0OTgzMzc4NH0.Fo7fVFH8Ru6QezcS0xPe3rFvx5G6k-voSZ0IrAOuQXg";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);