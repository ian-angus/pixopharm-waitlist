-- PIXOPHARM Waitlist Table
-- Run this in the Supabase SQL Editor for your project

-- Create the waitlist table
CREATE TABLE IF NOT EXISTS public.waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  island TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'pharmacist', 'technician', 'instructor', 'institution', 'other')),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  contacted BOOLEAN DEFAULT false,
  notes TEXT
);

-- Create index on email for fast duplicate checks
CREATE UNIQUE INDEX IF NOT EXISTS waitlist_email_idx ON public.waitlist (email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS waitlist_created_at_idx ON public.waitlist (created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous inserts (for the public waitlist form)
CREATE POLICY "Allow anonymous waitlist signups"
  ON public.waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Only authenticated admins can read the waitlist
CREATE POLICY "Admins can read waitlist"
  ON public.waitlist
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Policy: Only authenticated admins can update the waitlist
CREATE POLICY "Admins can update waitlist"
  ON public.waitlist
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Grant insert permission to anon role
GRANT INSERT ON public.waitlist TO anon;

-- Grant full access to authenticated role (for admin operations)
GRANT SELECT, UPDATE ON public.waitlist TO authenticated;

-- View: Waitlist stats by island
CREATE OR REPLACE VIEW public.waitlist_stats_by_island AS
SELECT
  island,
  COUNT(*) as signups,
  COUNT(CASE WHEN role = 'student' THEN 1 END) as students,
  COUNT(CASE WHEN role = 'pharmacist' THEN 1 END) as pharmacists,
  COUNT(CASE WHEN role = 'instructor' THEN 1 END) as instructors,
  COUNT(CASE WHEN role = 'institution' THEN 1 END) as institutions,
  MIN(created_at) as first_signup,
  MAX(created_at) as latest_signup
FROM public.waitlist
GROUP BY island
ORDER BY signups DESC;

-- View: Waitlist stats by role
CREATE OR REPLACE VIEW public.waitlist_stats_by_role AS
SELECT
  role,
  COUNT(*) as signups,
  COUNT(DISTINCT island) as islands_represented
FROM public.waitlist
GROUP BY role
ORDER BY signups DESC;
