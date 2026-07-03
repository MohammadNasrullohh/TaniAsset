export const dynamic = 'force-dynamic';

import { supabase } from '@/lib/supabase';
import { Asset } from '@/types';
import { notFound } from 'next/navigation';
import { ShieldCheck, Calendar, MapPin, Box, User, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';
import QRCodeBlock from '@/components/QRCodeBlock';
import { format } from 'date-fns';

export default async function VerifyPage({
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
  const isTokenized = a.status === 'Tokenized';
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const verifyUrl = `${siteUrl}/verify/${a.id}`;

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-3xl w-full">
        
        {/* Certificate Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          
          {/* Header Banner */}
          <div className={`p-6 text-center ${isTokenized ? 'bg-green-600' : 'bg-gray-600'} text-white`}>
            {isTokenized ? (
              <div className="flex flex-col items-center justify-center">
                <ShieldCheck className="w-16 h-16 mb-4 text-green-200" />
                <h1 className="text-3xl font-bold tracking-widest uppercase">Verified Asset</h1>
                <p className="mt-2 text-green-100">Secured on Stellar Blockchain</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <AlertCircle className="w-16 h-16 mb-4 text-gray-300" />
                <h1 className="text-3xl font-bold tracking-widest uppercase">Asset Record</h1>
                <p className="mt-2 text-gray-200">Status: {a.status}</p>
              </div>
            )}
          </div>

          <div className="p-8 sm:p-12">
            
            {/* Asset Name & Details */}
            <div className="text-center mb-10 pb-10 border-b border-gray-200">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-2">Asset Certificate</p>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-4 font-serif">{a.asset_name}</h2>
              <div className="inline-block bg-gray-100 rounded-full px-4 py-1.5 text-sm font-medium text-gray-700">
                {a.quantity} {a.unit} • {a.category}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              
              <div className="space-y-6">
                <div>
                  <h3 className="flex items-center text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                    <User className="w-4 h-4 mr-2" /> Owner Details
                  </h3>
                  <p className="text-xl font-medium text-gray-900">{a.owner_name}</p>
                  {a.owner_wallet && (
                    <p className="text-sm text-gray-500 mt-1 font-mono break-all">{a.owner_wallet}</p>
                  )}
                </div>

                <div>
                  <h3 className="flex items-center text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                    <MapPin className="w-4 h-4 mr-2" /> Origin
                  </h3>
                  <p className="text-lg text-gray-900">{a.location || 'Unknown'}</p>
                </div>

                <div>
                  <h3 className="flex items-center text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                    <Calendar className="w-4 h-4 mr-2" /> Timestamps
                  </h3>
                  <div className="space-y-2">
                    {a.harvest_date && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Harvested:</span>
                        <span className="font-medium text-gray-900">{format(new Date(a.harvest_date), 'MMM d, yyyy')}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-500">Registered:</span>
                      <span className="font-medium text-gray-900">{format(new Date(a.created_at), 'MMM d, yyyy')}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-xl border border-gray-100">
                <QRCodeBlock url={verifyUrl} />
                <p className="mt-4 text-sm text-gray-500 font-medium text-center">Scan to verify authenticity</p>
                
                {isTokenized && (
                  <div className="mt-6 w-full pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-center mb-2 text-green-600">
                      <CheckCircle2 className="w-5 h-5 mr-1" />
                      <span className="font-bold text-sm">Blockchain Verified</span>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Asset Code</p>
                      <p className="font-mono font-bold text-gray-800 text-lg">{a.asset_code}</p>
                    </div>
                    <div className="mt-3 text-center">
                      <a 
                        href={`https://stellar.expert/explorer/testnet/tx/${a.stellar_transaction_hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:text-blue-800 underline"
                      >
                        View Transaction Hash
                      </a>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {a.proof_image_url && (
              <div className="mt-10 pt-10 border-t border-gray-200">
                <h3 className="flex items-center text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                  <FileText className="w-4 h-4 mr-2" /> Visual Proof
                </h3>
                <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm max-h-64 flex justify-center bg-gray-100">
                  <img src={a.proof_image_url} alt="Proof" className="max-w-full h-auto object-contain" />
                </div>
              </div>
            )}
            
          </div>
          
          <div className="bg-gray-50 p-4 text-center border-t border-gray-200 text-xs text-gray-500">
            <p><strong>TaniAsset Hackathon Prototype</strong> - Not a legal or financial document.</p>
            <p>ID: {a.id}</p>
          </div>
        </div>
        
      </div>
    </div>
  );
}
