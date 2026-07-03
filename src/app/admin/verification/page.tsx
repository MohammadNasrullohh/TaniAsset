export const dynamic = 'force-dynamic';

import { supabase } from '@/lib/supabase';
import AdminTable from './AdminTable';
import { Asset } from '@/types';
import { ShieldCheck } from 'lucide-react';

export default async function AdminVerificationPage() {
  const { data: assets, error } = await supabase
    .from('assets')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching assets for admin:', error);
  }

  const allAssets = (assets as Asset[]) || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow flex flex-col h-full">
      <div className="mb-8 flex items-center border-b border-gray-200 pb-5">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-lg mr-4">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Verification</h1>
          <p className="mt-1 text-gray-500">Review submitted assets and issue Stellar tokens.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <AdminTable assets={allAssets} />
      </div>
    </div>
  );
}
