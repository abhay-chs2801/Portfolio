-- Create sections table for portfolio content
CREATE TABLE IF NOT EXISTS sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content JSONB NOT NULL,
    section_type TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_section_type ON sections(section_type);
CREATE INDEX IF NOT EXISTS idx_order ON sections("order");
CREATE INDEX IF NOT EXISTS idx_is_active ON sections(is_active);

-- Create a function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_sections_updated_at 
    BEFORE UPDATE ON sections 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions (important for Supabase)
GRANT ALL ON sections TO authenticated;
GRANT ALL ON sections TO anon;
GRANT ALL ON sections TO service_role;

-- Enable Row Level Security (optional, for additional security)
-- Uncomment the lines below if you want RLS enabled
-- ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Public read access for active sections"
--     ON sections FOR SELECT
--     USING (is_active = true);

-- Note: Service role key bypasses RLS, so admin operations will work regardless

