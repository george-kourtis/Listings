-- Database initialization script for listings application
-- This script runs when the PostgreSQL container starts for the first time

CREATE TABLE IF NOT EXISTS listings (
    id SERIAL PRIMARY KEY,
    title VARCHAR(155) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('rent', 'buy', 'exchange', 'donation')),
    area VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    place_id VARCHAR(255) NOT NULL,
    extra_description TEXT,
    levels TEXT,
    bathrooms INTEGER DEFAULT 0,
    bedrooms INTEGER DEFAULT 0,
    property_type VARCHAR(20) NOT NULL CHECK (property_type IN ('apartment', 'house', 'villa', 'office', 'store', 'other')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_listings_type ON listings(type);
CREATE INDEX IF NOT EXISTS idx_listings_property_type ON listings(property_type);
CREATE INDEX IF NOT EXISTS idx_listings_created_at ON listings(created_at);

-- Insert some sample data for development
INSERT INTO listings (title, type, area, price, place_id, extra_description, levels, bathrooms, bedrooms, property_type) VALUES
('Beautiful 2-bedroom apartment in downtown', 'rent', 'Downtown, Athens', 1200.00, 'place_123', 'Modern apartment with great views', '1', 2, 2, 'apartment'),
('Spacious family house with garden', 'buy', 'Kifissia, Athens', 350000.00, 'place_456', 'Perfect for families with children', '1,2', 3, 4, 'house'),
('Office space in business district', 'rent', 'Syntagma, Athens', 2500.00, 'place_789', 'Professional office space', '1', 1, 0, 'office')
ON CONFLICT DO NOTHING;
