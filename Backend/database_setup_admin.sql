-- Admin table for authentication
-- Run this in Supabase SQL Editor after creating the sections table

CREATE TABLE IF NOT EXISTS admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    email TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE
);

-- Create index for username lookup
CREATE INDEX IF NOT EXISTS idx_admin_username ON admins(username);
CREATE INDEX IF NOT EXISTS idx_admin_active ON admins(is_active);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_admin_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger
CREATE TRIGGER update_admins_updated_at 
    BEFORE UPDATE ON admins 
    FOR EACH ROW 
    EXECUTE FUNCTION update_admin_updated_at();

-- Grant permissions
GRANT ALL ON admins TO authenticated;
GRANT ALL ON admins TO anon;
GRANT ALL ON admins TO service_role;

-- Note: We're not enabling RLS for simplicity
-- Admin operations use service_role key which bypasses RLS

-- Example: Insert a default admin (password: admin123)
-- You should change this password hash after first login!
-- Password hash for 'admin123' using bcrypt (you'll need to generate this properly)
-- For now, we'll create a script to add admins securely

