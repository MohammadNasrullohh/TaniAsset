export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import AssetCard from '@/components/AssetCard';
import { Asset } from '@/types';
import { BarChart3, Clock, CheckCircle, Database } from 'lucide-react';

export default async function DashboardPage() {
  const { data: assets, error } = await supabase
    .from('assets')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching assets for dashboard:', error);
  }

  const allAssets = (assets as Asset[]) || [];
  
  const totalAssets = allAssets.length;
  const pendingCount = allAssets.filter(a => a.status === 'Pending Verification').length;
  const verifiedCount = allAssets.filter(a => a.status === 'Verified').length;
  const tokenizedCount = allAssets.filter(a => a.status === 'Tokenized').length;

  const recentAssets = allAssets.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-gray-500">Overview of all real-world assets on the platform.</p>
        </div>
        <Link 
          href="/assets/new" 
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
        >
          Register New Asset
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Assets</p>
            <p className="text-2xl font-bold text-gray-900">{totalAssets}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center">
          <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Pending Review</p>
            <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center">
          <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Verified</p>
            <p className="text-2xl font-bold text-gray-900">{verifiedCount}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center">
          <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Tokenized</p>
            <p className="text-2xl font-bold text-gray-900">{tokenizedCount}</p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recently Added</h2>
          <Link href="/assets" className="text-green-600 hover:text-green-700 font-medium text-sm">
            View all assets &rarr;
          </Link>
        </div>
        
        {recentAssets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentAssets.map(asset => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500 mb-4">No assets registered yet.</p>
            <Link 
              href="/assets/new" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200"
            >
              Register your first asset
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
