import { supabase } from "../lib/supabaseClient";

// Insert one card
export async function addCreditCard(payload) {
  // payload is already normalized (see handler below)
  const { data, error } = await supabase.from("credit_cards")
    .insert([payload])
    .select("*")
    .single();
  if (error) throw error;
  return data;
}

// Fetch all cards (later filter by user)
export async function listCreditCards() {
  const { data, error } = await supabase.from("credit_cards")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data || [];
}
