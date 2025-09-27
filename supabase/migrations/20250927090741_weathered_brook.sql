/*
  # Create credit cards table

  1. New Tables
    - `credit_cards`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `nickname` (text, card nickname)
      - `card_number` (text, encrypted card number)
      - `last_four` (text, last 4 digits)
      - `cardholder_name` (text)
      - `card_type` (text, visa/mastercard/amex/etc)
      - `bank` (text, issuing bank)
      - `expiry_date` (text, MM/YY format)
      - `cvv` (text, encrypted)
      - `credit_limit` (decimal)
      - `current_balance` (decimal, default 0)
      - `billing_date` (integer, day of month)
      - `due_date` (integer, day of month)
      - `interest_rate` (decimal)
      - `annual_fee` (decimal, default 0)
      - `status` (text, active/inactive/closed)
      - `description` (text, optional notes)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `credit_cards` table
    - Add policies for authenticated users to manage their own cards
*/

CREATE TABLE IF NOT EXISTS credit_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  nickname text NOT NULL,
  card_number text NOT NULL,
  last_four text NOT NULL,
  cardholder_name text NOT NULL,
  card_type text NOT NULL,
  bank text NOT NULL,
  expiry_date text NOT NULL,
  cvv text NOT NULL,
  credit_limit decimal(10,2) NOT NULL DEFAULT 0,
  current_balance decimal(10,2) NOT NULL DEFAULT 0,
  billing_date integer NOT NULL CHECK (billing_date >= 1 AND billing_date <= 31),
  due_date integer NOT NULL CHECK (due_date >= 1 AND due_date <= 31),
  interest_rate decimal(5,2) DEFAULT 0,
  annual_fee decimal(8,2) DEFAULT 0,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'closed')),
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE credit_cards ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own credit cards"
  ON credit_cards
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own credit cards"
  ON credit_cards
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own credit cards"
  ON credit_cards
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own credit cards"
  ON credit_cards
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_credit_cards_updated_at
  BEFORE UPDATE ON credit_cards
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();