import Link from 'next/link';
import { Asset } from '@/types';
import StatusBadge from './StatusBadge';
import { MapPin, Boxes, Coins } from 'lucide-react';

export default function AssetCard({ asset }: { asset: Asset }) {
  return (
    <Link href={`/assets/${asset.id}`} className="block group">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1">
        <div className="h-48 w-full bg-gray-100 relative overflow-hidden">
          {asset.proof_image_url ? (
            <img 
              src={asset.proof_image_url} 
              alt={asset.asset_name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <Boxes className="w-12 h-12" />
            </div>
          )}
          <div className="absolute top-3 right-3">
            <StatusBadge status={asset.status} />
          </div>
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-gray-700 shadow-sm">
            {asset.category}
          </div>
        </div>
        
        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">{asset.asset_name}</h3>
          
          <div className="flex items-center text-sm text-gray-500 mb-4 truncate">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="truncate">{asset.location || 'Unknown location'}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-3 flex-shrink-0">
                <Boxes className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Quantity</p>
                <p className="text-sm font-semibold text-gray-900">{asset.quantity} {asset.unit}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center mr-3 flex-shrink-0">
                <Coins className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Value (IDR)</p>
                <p className="text-sm font-semibold text-gray-900">
                  {asset.estimated_value_idr ? new Intl.NumberFormat('id-ID').format(asset.estimated_value_idr) : '-'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
