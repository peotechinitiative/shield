import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
});

export async function anonymousSignIn(deviceId: string) {
  // Try anonymous sign in first
  const { data: anonData, error: anonError } = await supabase.auth.signInAnonymously();
  
  if (!anonError && anonData.user) {
    return anonData;
  }
  
  // Fallback: sign in with password using device ID
  const email = `${deviceId}@shield.local`;
  const password = deviceId;
  
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (!signInError && signInData.session) {
    return signInData;
  }
  
  // If that fails too, sign up
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (signUpError) throw signUpError;
  return signUpData;
}

export async function getCurrentUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export async function getProfile() {
  const user = await getCurrentUser();
  if (!user) return null;
  const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
  return data;
}

export async function updateTrustedContacts(contacts: Array<{ name: string; phone: string }>) {
  const user = await getCurrentUser();
  if (!user) return;
  await supabase.from('profiles').update({ trusted_contacts: contacts }).eq('id', user.id);
}

export async function updateFcmToken(token: string) {
  const user = await getCurrentUser();
  if (!user) return;
  await supabase.from('profiles').update({ fcm_token: token }).eq('id', user.id);
}

export async function lookupReport(identifier: string) {
  const { data } = await supabase
    .from('reports')
    .select('*')
    .eq('identifier_hash', identifier)
    .eq('status', 'approved')
    .single();
  return data;
}

export async function submitReport(identifier: string, tier: 'low' | 'high', note: string) {
  const user = await getCurrentUser();
  const { data, error } = await supabase.from('reports').insert({
    identifier_hash: identifier,
    tier,
    note,
    status: 'pending',
    submitted_by: user?.id,
  });
  return { data, error };
}

export async function startCheckIn(contactName: string, durationMinutes: number, contactPhone?: string) {
  const user = await getCurrentUser();
  const expiresAt = new Date(Date.now() + durationMinutes * 60000).toISOString();
  const { data, error } = await supabase.from('check_ins').insert({
    user_id: user?.id,
    contact_name: contactName,
    contact_phone: contactPhone,
    duration_minutes: durationMinutes,
    expires_at: expiresAt,
    status: 'active',
  }).select().single();
  
  if (error) throw error;
  return data;
}

export async function getCheckIn(id: string) {
  const { data } = await supabase.from('check_ins').select('*').eq('id', id).single();
  return data;
}

export async function checkInSafe(id: string) {
  await supabase.from('check_ins').update({ status: 'checked_in' }).eq('id', id);
}

export async function cancelCheckIn(id: string) {
  await supabase.from('check_ins').update({ status: 'cancelled' }).eq('id', id);
}

export async function updateCheckInLocation(id: string, lat: number, lng: number, accuracy?: number) {
  await supabase.from('check_ins').update({
    last_location: { lat, lng, accuracy },
  }).eq('id', id);
}

export async function triggerPanic(location?: { lat: number; lng: number; accuracy?: number }) {
  const user = await getCurrentUser();
  const { data: profile } = await getProfile();
  
  const { data, error } = await supabase.functions.invoke('panic', {
    body: {
      userId: user?.id,
      location,
      trustedContacts: profile?.trusted_contacts || [],
    },
  });
  
  return { data, error };
}

export async function getVaultBackup() {
  const user = await getCurrentUser();
  if (!user) return null;
  const { data } = await supabase.from('vault_backups').select('*').eq('user_id', user.id).single();
  return data;
}

export async function saveVaultBackup(salt: string, iv: string, cipher: string) {
  const user = await getCurrentUser();
  if (!user) return;
  await supabase.from('vault_backups').upsert({
    user_id: user.id,
    salt,
    iv,
    cipher,
    updated_at: new Date().toISOString(),
  });
}