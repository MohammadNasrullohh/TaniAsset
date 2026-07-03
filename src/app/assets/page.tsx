export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import AssetCard from '@/components/AssetCard';
import { Asset } from '@/types';
import { Search } from 'lucide-react';

export default async function AssetsPage({
  searchParams,
}: {
  searchParams?: Promise<{
    query?: string;
    status?: string;
  }>;
}) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.query || '';
  const status = resolvedSearchParams?.status || '';

  let supabaseQuery = supabase
    .from('assets')
    .select('*')
    .order('created_at', { ascending: false });

  if (query) {
    supabaseQuery = supabaseQuery.ilike('asset_name', `%${query}%`);
  }

  if (status && status !== 'All') {
    supabaseQuery = supabaseQuery.eq('status', status);
  }

  const { data: assets, error } = await supabaseQuery;

  if (error) {
    console.error('Error fetching assets:', error);
  }

  const allAssets = (assets as Asset[]) || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Explore Assets</h1>
          <p className="mt-1 text-gray-500">Discover and verify tokenized real-world assets.</p>
        </div>
        <Link 
          href="/assets/new" 
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
        >
          Register New Asset
        </Link>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-8">
        <form className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="query"
              defaultValue={query}
              placeholder="Search assets by name..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          
          <div className="sm:w-48">
            <select
              name="status"
              defaultValue={status}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
            >
              <option value="All">All Statuses</option>
              <option value="Pending Verification">Pending Verification</option>
              <option value="Verified">Verified</option>
              <option value="Tokenized">Tokenized</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          
          <button
            type="submit"
            className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Filter
          </button>
        </form>
      </div>

      {allAssets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allAssets.map(asset => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500 text-lg mb-2">No assets found matching your criteria.</p>
          <p className="text-gray-400 text-sm">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
