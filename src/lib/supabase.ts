import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!url || !key) {
  // eslint-disable-next-line no-console
  console.warn('Supabase client: missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. SMS login will not work until configured.');
}

let supabase: any;
if (url && key) {
  supabase = createClient(url, key);
} else {
  // Provide a minimal stub to avoid runtime crashes when env vars are missing.
  supabase = {
    auth: {
      signInWithOtp: async () => ({ error: new Error('Supabase not configured') }),
      verifyOtp: async () => ({ error: new Error('Supabase not configured') }),
    },
  };
}

export { supabase };
export default supabase;
