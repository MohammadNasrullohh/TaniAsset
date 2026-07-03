import Link from 'next/link';
import { ShieldCheck, Coins, QrCode, Sprout, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-50 to-white pt-20 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
            Tokenize Real-World <span className="text-green-600">Agricultural Assets</span>
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Connecting local farmers, cooperatives, and MSMEs in Indonesia to blockchain infrastructure. 
            Register, verify, and issue transparent asset proofs on the Stellar Testnet.
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/assets/new" 
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700 transition-colors"
            >
              Register Asset
              <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
            </Link>
            <Link 
              href="/assets" 
              className="inline-flex items-center px-8 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm"
            >
              Explore Assets
            </Link>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">The Problem</h2>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                Local real-world agricultural assets—like rice, coffee, and fish stock—often lack transparent digital proof and access to modern financial infrastructure.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                This limits the ability of local cooperatives and MSMEs to prove ownership, track quality, and access global or decentralized finance opportunities.
              </p>
            </div>
            <div className="bg-green-50 rounded-2xl p-8 border border-green-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">The Solution: <span className="text-green-600">TaniAsset</span></h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <ShieldCheck className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 text-lg">Digitally verify physical assets through uploaded proofs and admin review.</span>
                </li>
                <li className="flex items-start">
                  <Coins className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 text-lg">Issue representative tokens on the fast, low-cost Stellar Testnet.</span>
                </li>
                <li className="flex items-start">
                  <QrCode className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 text-lg">Generate public QR codes for instant, unforgeable traceability and ownership proof.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-xl text-gray-600">Five simple steps to tokenize a real-world asset.</p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-8">
            {[
              { title: 'Register', desc: 'Submit real-world asset details.' },
              { title: 'Upload', desc: 'Provide photos and documents as proof.' },
              { title: 'Verify', desc: 'Admin reviews the submitted asset.' },
              { title: 'Tokenize', desc: 'Issue a representative Stellar Testnet asset.' },
              { title: 'Share', desc: 'Share the public QR verification page.' },
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm text-center h-full relative z-10">
                  <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">
                    {idx + 1}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500">{step.desc}</p>
                </div>
                {idx < 4 && (
                  <div className="hidden md:block absolute top-1/4 -right-4 w-8 h-0.5 bg-slate-300 z-0"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
