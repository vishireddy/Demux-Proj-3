import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!url || !key) {
  // Do not throw here; allow app to run but log a warning for developers.
  // Supabase SMS requires these env vars and a configured SMS provider (Twilio) in Supabase.
  // The developer should set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in their .env.
  // Example: VITE_SUPABASE_URL=https://xyz.supabase.co
  //          VITE_SUPABASE_ANON_KEY=public-anon-key
  // See README or Supabase docs for details.
  // eslint-disable-next-line no-console
  console.warn('Supabase client: missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. SMS login will not work until configured.');
}

export const supabase = createClient(url ?? '', key ?? '');

export default supabase;
