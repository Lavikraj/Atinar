/*
  # API Monitoring Platform Schema

  1. New Tables
    - `api_endpoints`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `name` (text, endpoint name)
      - `url` (text, endpoint URL)
      - `interval` (integer, check interval in minutes)
      - `status` (text, current status: up/down/unknown)
      - `last_checked` (timestamp)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `api_checks`
      - `id` (uuid, primary key)
      - `endpoint_id` (uuid, foreign key to api_endpoints)
      - `status` (text, check result: up/down)
      - `response_time` (integer, response time in ms)
      - `status_code` (integer, HTTP status code)
      - `error_message` (text, error details if any)
      - `checked_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create api_endpoints table
CREATE TABLE IF NOT EXISTS api_endpoints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  url text NOT NULL,
  interval integer DEFAULT 5 CHECK (interval >= 1 AND interval <= 60),
  status text DEFAULT 'unknown' CHECK (status IN ('up', 'down', 'unknown')),
  last_checked timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create api_checks table
CREATE TABLE IF NOT EXISTS api_checks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  endpoint_id uuid REFERENCES api_endpoints(id) ON DELETE CASCADE NOT NULL,
  status text NOT NULL CHECK (status IN ('up', 'down')),
  response_time integer NOT NULL,
  status_code integer,
  error_message text,
  checked_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE api_endpoints ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_checks ENABLE ROW LEVEL SECURITY;

-- Policies for api_endpoints
CREATE POLICY "Users can view own endpoints"
  ON api_endpoints
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own endpoints"
  ON api_endpoints
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own endpoints"
  ON api_endpoints
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own endpoints"
  ON api_endpoints
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for api_checks
CREATE POLICY "Users can view checks for own endpoints"
  ON api_checks
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM api_endpoints 
      WHERE api_endpoints.id = api_checks.endpoint_id 
      AND api_endpoints.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert checks for own endpoints"
  ON api_checks
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM api_endpoints 
      WHERE api_endpoints.id = api_checks.endpoint_id 
      AND api_endpoints.user_id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_api_endpoints_user_id ON api_endpoints(user_id);
CREATE INDEX IF NOT EXISTS idx_api_checks_endpoint_id ON api_checks(endpoint_id);
CREATE INDEX IF NOT EXISTS idx_api_checks_checked_at ON api_checks(checked_at);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_api_endpoints_updated_at
  BEFORE UPDATE ON api_endpoints
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();