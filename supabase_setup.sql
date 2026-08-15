-- Run this in your Supabase SQL Editor

-- 1. Create the `orders` table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    total_amount NUMERIC NOT NULL,
    items JSONB NOT NULL,
    documents TEXT[] DEFAULT '{}',
    status TEXT DEFAULT 'pending'
);

-- 2. Enable Row Level Security (RLS) on orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 3. Create policies for `orders`
-- Allow public insert (so customers can create orders during checkout)
CREATE POLICY "Enable insert for all users" 
ON public.orders FOR INSERT 
WITH CHECK (true);

-- Allow public read (or ideally only authenticated admin, but we'll allow public for now for simplicity if you don't have auth setup)
CREATE POLICY "Enable read access for all users" 
ON public.orders FOR SELECT 
USING (true);

-- Allow public update (so admin dashboard can mark them complete without auth)
CREATE POLICY "Enable update for all users" 
ON public.orders FOR UPDATE 
USING (true);


-- 4. Create the storage bucket for documents
INSERT INTO storage.buckets (id, name, public) 
VALUES ('documents', 'documents', true)
ON CONFLICT (id) DO NOTHING;

-- 5. Create storage policies for `documents` bucket
-- Allow public upload
CREATE POLICY "Public Upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'documents' );

-- Allow public read
CREATE POLICY "Public Read"
ON storage.objects FOR SELECT
USING ( bucket_id = 'documents' );
