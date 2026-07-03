import Link from 'next/link';
import { Sprout } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start items-center gap-2 mb-4 md:mb-0">
            <Sprout className="h-6 w-6 text-green-600" />
            <span className="font-bold text-lg text-gray-900">TaniAsset</span>
          </div>
          <div className="mt-4 md:mt-0 md:order-1">
            <p className="text-center text-xs text-gray-500 leading-relaxed max-w-2xl mx-auto">
              <strong>Disclaimer:</strong> This application is a prototype built for the "Local Finance & Real World Access" Hackathon. 
              All tokenizations are simulated on the Stellar Testnet. This is not a real investment product, and the assets here 
              do not represent legal ownership or financial return.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
