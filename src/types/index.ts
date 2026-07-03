export interface Asset {
  id: string;
  asset_name: string;
  category: string;
  quantity: number;
  unit: string;
  estimated_value_idr: number | null;
  location: string | null;
  owner_name: string | null;
  owner_wallet: string | null;
  harvest_date: string | null;
  description: string | null;
  proof_image_url: string | null;
  proof_document_url: string | null;
  status: 'Pending Verification' | 'Verified' | 'Tokenized' | 'Rejected';
  rejection_reason: string | null;
  asset_code: string | null;
  stellar_issuer_public_key: string | null;
  stellar_distributor_public_key: string | null;
  stellar_transaction_hash: string | null;
  stellar_explorer_url: string | null;
  created_at: string;
  updated_at: string;
}
