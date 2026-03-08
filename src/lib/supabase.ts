import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://thvnijhbwysltnnuedbf.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRodm5pamhid3lzbHRubnVlZGJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NzU5OTksImV4cCI6MjA4ODU1MTk5OX0.O3ZgcOAyVnR5WxLGwkxJNNLrk327ThT6_WOa-MZAUs4";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
