import { AlertTriangle } from 'lucide-react';

export default function DisclaimerBanner() {
  return (
    <div className="bg-amber-100 text-amber-800 px-4 py-2 text-sm flex items-center justify-center gap-2 border-b border-amber-200">
      <AlertTriangle className="w-4 h-4" />
      <span className="font-medium text-center">
        This is a Hackathon Prototype running on Stellar Testnet. It is not a real investment product and does not claim legal ownership or financial return.
      </span>
    </div>
  );
}
