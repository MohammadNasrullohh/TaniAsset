import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Asset } from '@/types';
import StatusBadge from '@/components/StatusBadge';
import QRCodeBlock from '@/components/QRCodeBlock';
import { notFound } from 'next/navigation';
import { Calendar, MapPin, User, Wallet, FileText, CheckCircle2, Box, ExternalLink, Activity } from 'lucide-react';
import { format } from 'date-fns';

export const dynamic = 'force-dynamic';

export default async function AssetDetailPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;

  const { data: asset, error } = await supabase
    .from('assets')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !asset) {
    notFound();
  }

  const a = asset as Asset;
  
  // Need to get the full URL for QR code, assuming we are deployed or localhost
  // For hackathon MVP, we can construct a relative path but QRCode needs absolute usually, 
  // though we can use window.location in client, but since we are server side, we will just use a placeholder domain or pass the path.
  // We'll create a client component wrapper or just pass the path and let the user scan it with the full domain if we knew it.
  // Actually, we can just encode the path and the client component will resolve it. Wait, qrcode.react can just take the full URL.
  // Let's assume an env variable NEXT_PUBLIC_SITE_URL or fallback to localhost
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const verifyUrl = `${siteUrl}/verify/${a.id}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="p-6 sm:p-10 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                {a.category}
              </span>
              <StatusBadge status={a.status} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{a.asset_name}</h1>
            <div className="flex items-center text-gray-500">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{a.location || 'Location not specified'}</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center sm:items-end">
            <QRCodeBlock url={verifyUrl} />
            <p className="text-xs text-gray-500 mt-2">Scan to verify asset</p>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          
          {/* Left Column: Asset Details */}
          <div className="p-6 sm:p-10 md:col-span-2 space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Box className="w-5 h-5 mr-2 text-green-600" />
                Asset Details
              </h2>
              <div className="grid grid-cols-2 gap-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div>
                  <p className="text-sm font-medium text-gray-500">Quantity</p>
                  <p className="text-lg font-semibold text-gray-900">{a.quantity} {a.unit}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Estimated Value</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {a.estimated_value_idr ? `IDR ${new Intl.NumberFormat('id-ID').format(a.estimated_value_idr)}` : '-'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Harvest / Prod Date</p>
                  <p className="text-base text-gray-900">
                    {a.harvest_date ? format(new Date(a.harvest_date), 'PPP') : '-'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Registration Date</p>
                  <p className="text-base text-gray-900">
                    {format(new Date(a.created_at), 'PPP')}
                  </p>
                </div>
              </div>
              
              {a.description && (
                <div className="mt-6">
                  <p className="text-sm font-medium text-gray-500 mb-2">Description</p>
                  <p className="text-gray-700 whitespace-pre-wrap">{a.description}</p>
                </div>
              )}
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-green-600" />
                Ownership
              </h2>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-4">
                <div className="flex items-start">
                  <User className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Owner Name</p>
                    <p className="text-base font-medium text-gray-900">{a.owner_name}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Wallet className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Owner Wallet Address</p>
                    <p className="text-base font-mono text-gray-600 break-all">{a.owner_wallet || 'Not provided'}</p>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Proofs */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-green-600" />
                Verification Proofs
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {a.proof_image_url && (
                  <a href={a.proof_image_url} target="_blank" rel="noopener noreferrer" className="block group">
                    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:border-green-400 transition-colors">
                      <div className="h-40 bg-gray-100">
                        <img src={a.proof_image_url} alt="Proof" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div className="p-3 bg-white flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-900">Proof Photo</span>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </a>
                )}
                
                {a.proof_document_url ? (
                  <a href={a.proof_document_url} target="_blank" rel="noopener noreferrer" className="block group">
                    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:border-green-400 transition-colors h-full flex flex-col">
                      <div className="flex-1 bg-slate-50 flex items-center justify-center p-6">
                        <FileText className="w-12 h-12 text-gray-300 group-hover:text-green-500 transition-colors" />
                      </div>
                      <div className="p-3 bg-white flex justify-between items-center border-t border-gray-200">
                        <span className="text-sm font-medium text-gray-900">Supporting Document</span>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </a>
                ) : (
                  <div className="border border-dashed border-gray-200 rounded-xl h-full flex items-center justify-center bg-gray-50 p-6">
                    <span className="text-sm text-gray-400">No document provided</span>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Right Column: Stellar Blockchain Info */}
          <div className="p-6 sm:p-10 bg-slate-50">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-green-600" />
              Blockchain Record
            </h2>

            {a.status === 'Tokenized' ? (
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-green-800 text-sm">Tokenized on Stellar Testnet</h3>
                    <p className="text-green-700 text-xs mt-1">This asset has been successfully verified and issued on the blockchain.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Asset Code</p>
                    <p className="font-mono font-bold text-gray-900 text-lg">{a.asset_code}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Issuer Account</p>
                    <div className="bg-white border border-gray-200 rounded p-2 text-xs font-mono break-all text-gray-600">
                      {a.stellar_issuer_public_key}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Distributor Account</p>
                    <div className="bg-white border border-gray-200 rounded p-2 text-xs font-mono break-all text-gray-600">
                      {a.stellar_distributor_public_key}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Transaction Hash</p>
                    <div className="bg-white border border-gray-200 rounded p-2 text-xs font-mono break-all text-gray-600">
                      {a.stellar_transaction_hash}
                    </div>
                  </div>

                  <a 
                    href={`https://stellar.expert/explorer/testnet/tx/${a.stellar_transaction_hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    View on Stellar Expert
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-center py-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <Activity className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Not Tokenized Yet</h3>
                <p className="text-sm text-gray-500">
                  This asset is currently in "{a.status}" status. It will appear on the blockchain once approved and issued by an administrator.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
