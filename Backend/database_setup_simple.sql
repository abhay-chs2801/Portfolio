-- Simple setup script for Supabase
-- Run this in Supabase SQL Editor

-- Drop table if exists (for clean setup)
DROP TABLE IF EXISTS sections CASCADE;

-- Create sections table
CREATE TABLE sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content JSONB NOT NULL,
    section_type TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_section_type ON sections(section_type);
CREATE INDEX idx_order ON sections("order");
CREATE INDEX idx_is_active ON sections(is_active);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger
CREATE TRIGGER update_sections_updated_at 
    BEFORE UPDATE ON sections 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions (important for Supabase)
GRANT ALL ON sections TO authenticated;
GRANT ALL ON sections TO anon;
GRANT ALL ON sections TO service_role;

-- Note: We're not enabling RLS for simplicity
-- If you want RLS, uncomment the lines below:
-- ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Public read access for active sections"
--     ON sections FOR SELECT
--     USING (is_active = true);

