'use client';

import { useState } from 'react';
import { createAsset } from './actions';
import { Loader2 } from 'lucide-react';

export default function CreateAssetPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const formData = new FormData(e.currentTarget);
      await createAsset(formData);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-800 tracking-tight">Register Real-World Asset</h1>
        <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">Enter the details of your physical asset to begin the tokenization process securely on the Stellar blockchain.</p>
      </div>

      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-200/50 border border-white overflow-hidden ring-1 ring-slate-900/5">
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-md text-sm mb-6">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="asset_name" className="block text-sm font-medium text-gray-700 mb-1">Asset Name *</label>
                <input type="text" id="asset_name" name="asset_name" required placeholder="e.g. Beras Premium Kebumen" className="w-full border border-slate-200 rounded-lg shadow-sm p-2.5 text-slate-700 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 bg-white/50 backdrop-blur-sm" />
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select id="category" name="category" required className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500 bg-white">
                  <option value="Rice">Rice</option>
                  <option value="Coffee">Coffee</option>
                  <option value="Fish">Fish</option>
                  <option value="Crops">Crops</option>
                  <option value="Livestock">Livestock</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
                <input type="number" step="0.01" id="quantity" name="quantity" required placeholder="500" className="w-full border border-slate-200 rounded-lg shadow-sm p-2.5 text-slate-700 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 bg-white/50 backdrop-blur-sm" />
              </div>
              
              <div>
                <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">Unit *</label>
                <select id="unit" name="unit" required className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500 bg-white">
                  <option value="kg">kg</option>
                  <option value="ton">ton</option>
                  <option value="liter">liter</option>
                  <option value="unit">unit</option>
                  <option value="sack">sack</option>
                </select>
              </div>

              <div>
                <label htmlFor="estimated_value_idr" className="block text-sm font-medium text-gray-700 mb-1">Estimated Value (IDR)</label>
                <input type="number" id="estimated_value_idr" name="estimated_value_idr" placeholder="7500000" className="w-full border border-slate-200 rounded-lg shadow-sm p-2.5 text-slate-700 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 bg-white/50 backdrop-blur-sm" />
              </div>
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea id="description" name="description" rows={3} placeholder="Provide details about the asset's quality, origin, etc." className="w-full border border-slate-200 rounded-lg shadow-sm p-2.5 text-slate-700 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 bg-white/50 backdrop-blur-sm"></textarea>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Ownership & Location</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="owner_name" className="block text-sm font-medium text-gray-700 mb-1">Owner / Cooperative Name *</label>
                <input type="text" id="owner_name" name="owner_name" required placeholder="Koperasi Tani Makmur" className="w-full border border-slate-200 rounded-lg shadow-sm p-2.5 text-slate-700 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 bg-white/50 backdrop-blur-sm" />
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                <input type="text" id="location" name="location" required placeholder="Kebumen, Central Java" className="w-full border border-slate-200 rounded-lg shadow-sm p-2.5 text-slate-700 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 bg-white/50 backdrop-blur-sm" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="owner_wallet" className="block text-sm font-medium text-gray-700 mb-1">Owner Stellar Wallet (Optional)</label>
                <input type="text" id="owner_wallet" name="owner_wallet" placeholder="G..." className="w-full border border-slate-200 rounded-lg shadow-sm p-2.5 text-slate-700 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 bg-white/50 backdrop-blur-sm" />
              </div>
              
              <div>
                <label htmlFor="harvest_date" className="block text-sm font-medium text-gray-700 mb-1">Harvest / Production Date</label>
                <input type="date" id="harvest_date" name="harvest_date" className="w-full border border-slate-200 rounded-lg shadow-sm p-2.5 text-slate-700 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 bg-white/50 backdrop-blur-sm" />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Proof Upload</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="proof_image" className="block text-sm font-medium text-gray-700 mb-1">Proof Photo *</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label htmlFor="proof_image" className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500">
                        <span>Upload a file</span>
                        <input id="proof_image" name="proof_image" type="file" accept="image/*" required className="sr-only" />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="proof_document" className="block text-sm font-medium text-gray-700 mb-1">Supporting Document (Optional)</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label htmlFor="proof_document" className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500">
                        <span>Upload a file</span>
                        <input id="proof_document" name="proof_document" type="file" accept=".pdf,.doc,.docx" className="sr-only" />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PDF, DOC up to 5MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-emerald-500/30 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-0.5"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                  Submitting Asset...
                </>
              ) : (
                'Submit Asset for Verification'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
