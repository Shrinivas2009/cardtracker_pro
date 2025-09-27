import { supabase } from "../lib/supabaseClient";

// Authentication functions
export const auth = {
  // Sign up with email and password
  async signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  // Sign in with email and password
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Get current user
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  },

  // Listen to auth changes
  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback);
  }
};

// Credit Cards functions
export const creditCards = {
  // Get all credit cards for current user
  async getAll() {
    const { data, error } = await supabase
      .from('credit_cards')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Get single credit card
  async getById(id) {
    const { data, error } = await supabase
      .from('credit_cards')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Create new credit card
  async create(cardData) {
    const user = await auth.getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('credit_cards')
      .insert([{
        ...cardData,
        user_id: user.id,
        last_four: cardData.cardNumber.slice(-4),
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Update credit card
  async update(id, updates) {
    const { data, error } = await supabase
      .from('credit_cards')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Delete credit card
  async delete(id) {
    const { error } = await supabase
      .from('credit_cards')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Transactions functions
export const transactions = {
  // Get all transactions for a card
  async getByCardId(cardId) {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('card_id', cardId)
      .order('transaction_date', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Get all transactions for current user
  async getAll() {
    const { data, error } = await supabase
      .from('transactions')
      .select(`
        *,
        credit_cards (
          nickname,
          last_four
        )
      `)
      .order('transaction_date', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Create new transaction
  async create(transactionData) {
    const user = await auth.getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('transactions')
      .insert([{
        ...transactionData,
        user_id: user.id,
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Update transaction
  async update(id, updates) {
    const { data, error } = await supabase
      .from('transactions')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Delete transaction
  async delete(id) {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Payments functions
export const payments = {
  // Get all payments for a card
  async getByCardId(cardId) {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('card_id', cardId)
      .order('payment_date', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Create new payment
  async create(paymentData) {
    const user = await auth.getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('payments')
      .insert([{
        ...paymentData,
        user_id: user.id,
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Update payment
  async update(id, updates) {
    const { data, error } = await supabase
      .from('payments')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Delete payment
  async delete(id) {
    const { error } = await supabase
      .from('payments')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};