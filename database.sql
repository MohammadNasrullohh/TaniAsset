-- Create assets table
CREATE TABLE IF NOT EXISTS public.assets (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_name text NOT NULL,
    category text NOT NULL,
    quantity numeric NOT NULL,
    unit text NOT NULL,
    estimated_value_idr numeric,
    location text,
    owner_name text,
    owner_wallet text,
    harvest_date date,
    description text,
    proof_image_url text,
    proof_document_url text,
    status text DEFAULT 'Pending Verification',
    rejection_reason text,
    asset_code text,
    stellar_issuer_public_key text,
    stellar_distributor_public_key text,
    stellar_transaction_hash text,
    stellar_explorer_url text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.assets ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access
CREATE POLICY "Allow public read access on assets"
ON public.assets FOR SELECT
TO anon, authenticated
USING (true);

-- Allow anonymous insert access (for MVP hackathon purposes to avoid complex auth)
CREATE POLICY "Allow public insert on assets"
ON public.assets FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow anonymous update access (for MVP hackathon purposes)
CREATE POLICY "Allow public update on assets"
ON public.assets FOR UPDATE
TO anon, authenticated
USING (true);

-- Create storage buckets for proofs
INSERT INTO storage.buckets (id, name, public) 
VALUES ('proofs', 'proofs', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to proofs bucket
CREATE POLICY "Allow public access to proofs bucket"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'proofs');

CREATE POLICY "Allow public upload to proofs bucket"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'proofs');

-- Function to handle updated_at
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updated_at
CREATE TRIGGER update_assets_updated_at
BEFORE UPDATE ON public.assets
FOR EACH ROW
EXECUTE FUNCTION handle_updated_at();
