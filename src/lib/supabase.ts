// Safe Supabase client with a dev fallback when env vars are missing.
import { createClient as _createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Provide a single exported `supabase` binding.
let supabase: any;
if (url && key) {
  supabase = _createClient(url, key);
} else {
  // Dev fallback: minimal supabase-like API used by the app.
  type Row = Record<string, any>;

  const demoFarmers: Row[] = [
    { id: 'f1', phone: '+919876543210', mobile: '9876543210', name: 'Ravi Kumar' },
    { id: 'f2', phone: '+919876543211', mobile: '9876543211', name: 'Lakshmi' },
    { id: 'f3', phone: '+919876543212', mobile: '9876543212', name: 'Suresh' },
  ];

  function filterFarmersByCond(cond: { phone?: string; mobile?: string } = {}) {
    if (!cond.phone && !cond.mobile) return demoFarmers.slice();
    return demoFarmers.filter(f => (cond.phone ? f.phone === cond.phone : false) || (cond.mobile ? f.mobile === cond.mobile : false));
  }

  class QueryBuilder {
    table: string;
    _cond: { phone?: string; mobile?: string } = {};
    _limit = Infinity;
    constructor(table: string) { this.table = table; }
    select(_sel?: string) { return this; }
    or(_expr: string) { return this; }
    limit(n: number) { this._limit = n; return this; }
    eq(col: string, val: string) { if (col === 'phone') this._cond.phone = val; if (col === 'mobile') this._cond.mobile = val; return this; }
    then(cb: (res: { data: Row[]; error: null }) => any) {
      const rows = this.table === 'farmers' ? filterFarmersByCond(this._cond).slice(0, this._limit) : [];
      return Promise.resolve(cb({ data: rows, error: null }));
    }
    async insert(arr: Row[]) { // minimal insert -> returns inserted rows
      const inserted = arr.map((r, i) => ({ id: `dev-${Date.now()}-${i}`, ...r }));
      // append to demoFarmers so subsequent queries see them (in-memory only)
      demoFarmers.push(...inserted);
      return { data: inserted, error: null };
    }
    async selectSingle() { const rows = filterFarmersByCond(this._cond); return { data: rows.slice(0,1), error: null }; }
  }

  supabase = {
    auth: {
      async signInWithOtp({ phone }: { phone: string }) {
        const token = String(Math.floor(100000 + Math.random() * 900000));
        try { console.info(`[DEV OTP] send to ${phone}: ${token}`); localStorage.setItem(`dev_otp_${phone}`, token); } catch(e){}
        return { data: null, error: null };
      },
      async verifyOtp({ phone, token }: { phone: string; token: string }) {
        try {
          const expected = localStorage.getItem(`dev_otp_${phone}`) || null;
          if (expected && expected === token) {
            return { data: { user: { id: 'dev-user', phone } }, error: null };
          }
          return { data: null, error: new Error('Invalid OTP') };
        } catch (e) {
          return { data: null, error: e as any };
        }
      },
      async getUser() { return { data: { user: { id: 'dev-user', phone: null } }, error: null }; },
    },
    from(table: string) { return new QueryBuilder(table); }
  } as any;
}

export { supabase };
