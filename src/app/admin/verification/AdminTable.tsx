'use client';

import { useState } from 'react';
import { Asset } from '@/types';
import StatusBadge from '@/components/StatusBadge';
import { approveAsset, rejectAsset, tokenizeAsset } from './actions';
import { Check, X, Coins, Loader2, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

export default function AdminTable({ assets }: { assets: Asset[] }) {
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [actionType, setActionType] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleApprove = async (id: string) => {
    setProcessingId(id);
    setActionType('approve');
    setError(null);
    try {
      await approveAsset(id);
    } catch (err: any) {
      setError(err.message || 'Failed to approve');
    } finally {
      setProcessingId(null);
      setActionType(null);
    }
  };

  const handleReject = async (id: string) => {
    const reason = window.prompt('Enter rejection reason:');
    if (reason === null) return; // User cancelled
    
    setProcessingId(id);
    setActionType('reject');
    setError(null);
    try {
      await rejectAsset(id, reason || 'No reason provided');
    } catch (err: any) {
      setError(err.message || 'Failed to reject');
    } finally {
      setProcessingId(null);
      setActionType(null);
    }
  };

  const handleTokenize = async (id: string) => {
    setProcessingId(id);
    setActionType('tokenize');
    setError(null);
    try {
      await tokenizeAsset(id);
      alert('Asset successfully tokenized on Stellar Testnet!');
    } catch (err: any) {
      setError(err.message || 'Failed to tokenize');
      alert(`Tokenization failed: ${err.message}`);
    } finally {
      setProcessingId(null);
      setActionType(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      {error && (
        <div className="mb-4 bg-red-50 text-red-700 p-4 rounded-md text-sm border border-red-200">
          {error}
        </div>
      )}
      
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset Info</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {assets.map((asset) => (
            <tr key={asset.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md overflow-hidden">
                    {asset.proof_image_url ? (
                      <img className="h-10 w-10 object-cover" src={asset.proof_image_url} alt="" />
                    ) : (
                      <div className="h-10 w-10 flex items-center justify-center text-gray-400">?</div>
                    )}
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{asset.asset_name}</div>
                    <div className="text-sm text-gray-500">{asset.quantity} {asset.unit} • {asset.category}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{asset.owner_name}</div>
                <div className="text-xs text-gray-500 max-w-[150px] truncate">{asset.owner_wallet || '-'}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {format(new Date(asset.created_at), 'MMM d, yyyy')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge status={asset.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end items-center gap-2">
                  <Link href={`/assets/${asset.id}`} className="text-gray-500 hover:text-gray-900 p-1 bg-gray-100 rounded hover:bg-gray-200 transition-colors mr-2">
                    <ExternalLink className="w-4 h-4" />
                  </Link>

                  {asset.status === 'Pending Verification' && (
                    <>
                      <button 
                        onClick={() => handleApprove(asset.id)}
                        disabled={processingId === asset.id}
                        className="text-white bg-blue-600 hover:bg-blue-700 p-1.5 rounded flex items-center disabled:opacity-50"
                        title="Approve"
                      >
                        {processingId === asset.id && actionType === 'approve' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                      </button>
                      <button 
                        onClick={() => handleReject(asset.id)}
                        disabled={processingId === asset.id}
                        className="text-white bg-red-600 hover:bg-red-700 p-1.5 rounded flex items-center disabled:opacity-50"
                        title="Reject"
                      >
                        {processingId === asset.id && actionType === 'reject' ? <Loader2 className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4" />}
                      </button>
                    </>
                  )}

                  {asset.status === 'Verified' && (
                    <button 
                      onClick={() => handleTokenize(asset.id)}
                      disabled={processingId === asset.id}
                      className="text-white bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded flex items-center gap-1 text-xs font-bold shadow-sm disabled:opacity-50"
                    >
                      {processingId === asset.id && actionType === 'tokenize' ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Issuing...</>
                      ) : (
                        <><Coins className="w-4 h-4" /> Issue Token</>
                      )}
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
          
          {assets.length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-10 text-center text-sm text-gray-500">
                No assets found in the system.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
