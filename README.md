# TaniAsset 🌾

**Tokenizing Real-World Agricultural Assets in Indonesia**

TaniAsset is a prototype application built for the **"Local Finance & Real World Access" Hackathon**. It aims to connect local real-world assets (like rice, coffee, fish stock, and local commodities) to blockchain infrastructure using the Stellar Testnet.

⚠️ **DISCLAIMER:** This is a hackathon prototype running on the Stellar Testnet. It is not a real investment product and does not claim legal ownership or financial return. It is built for demonstration purposes only.

---

## 📖 The Problem
Local real-world agricultural assets often lack transparent digital proof and access to modern financial infrastructure. This limits the ability of local cooperatives, farmers, and MSMEs to prove ownership, track quality, and access global or decentralized finance opportunities.

## 💡 The Solution
TaniAsset digitally verifies physical assets through uploaded proofs and an administrative review process. Once verified, the platform issues representative tokens (classic assets) on the fast, low-cost Stellar Testnet. A public QR code is generated for each asset, providing instant, unforgeable traceability and proof of the asset record.

---

## ✨ Features
- **Asset Registration:** Cooperatives/Farmers can register their assets and upload proof photos/documents.
- **Admin Verification:** An admin dashboard to review, approve, or reject submitted assets.
- **Stellar Tokenization:** Approved assets are automatically tokenized on the Stellar Testnet (minting assets from an Issuer to a Distributor account).
- **Public Verification Page:** Clean, certificate-like public pages to verify asset existence and blockchain record.
- **QR Code Generation:** Easily scannable QR codes for each asset.

---

## 🛠 Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, `lucide-react` for icons
- **Database & Storage:** Supabase (PostgreSQL + S3 Storage)
- **Blockchain Integration:** `@stellar/stellar-sdk` (Stellar Testnet)
- **Utilities:** `qrcode.react`, `date-fns`

---

## 🚀 How Stellar is Used
This project uses the Stellar SDK to interact with the Stellar Testnet:
1. **Asset Code Generation:** Dynamically generates a max-12-character asset code based on the asset's name.
2. **Trustlines:** The Distributor account creates a trustline to the Issuer account for the specific custom asset.
3. **Minting/Payment:** The Issuer account sends the supply amount (matching the asset quantity) to the Distributor.
4. **Transparency:** Saves the transaction hash and account keys in the database for public verification via Stellar Expert.

### 🔑 Stellar Contract / Issuer Address
As this project leverages native Stellar Custom Assets (RWA Tokenization) rather than Soroban smart contracts, the core identity of the assets is tied to the **Issuer Account Public Key**. 
- **TaniAsset Issuer Account (Testnet):** `GCNVRTBGOFNQKWUXJ2Y7MX2ODXMFPDK6MDXMOBZ6EWG26WAERLENI7YU`

---

## 💻 Setup Instructions

### 1. Supabase Setup
1. Create a project on [Supabase](https://supabase.com).
2. Go to the SQL Editor and run the queries provided in `database.sql` (found in the root directory) to set up the `assets` table, Row Level Security (RLS) policies, storage buckets, and triggers.

### 2. Stellar Testnet Keys
You will need two funded Stellar Testnet accounts (Issuer and Distributor).
1. Go to the [Stellar Laboratory Account Creator](https://laboratory.stellar.org/#account-creator?network=test).
2. Click "Generate keypair" twice to get two pairs of Public/Secret keys.
3. Fund both accounts on the Testnet by clicking "Fund this account with Friendbot".

### 3. Environment Variables
Create a `.env` or `.env.local` file in the root directory based on `.env.example`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

STELLAR_NETWORK=testnet
STELLAR_HORIZON_URL=https://horizon-testnet.stellar.org
STELLAR_ISSUER_SECRET=your_issuer_secret_key
STELLAR_DISTRIBUTOR_SECRET=your_distributor_secret_key

NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Run Locally
```bash
npm install
npm run dev
```
Open `http://localhost:3000` with your browser to see the result.

---

## 🎥 Demo Flow
1. **Open Landing Page:** Navigate to `/`.
2. **Register Asset:** Click "Register Asset" and fill out the form.
   - Example: *Beras Premium Kebumen*, 500 kg, upload a placeholder photo.
3. **View Dashboard:** See the asset marked as "Pending Verification".
4. **Admin Verification:** Go to "Admin" (`/admin/verification`), click the Check icon to Approve.
5. **Tokenize:** Click "Issue Token". This will trigger the Stellar SDK to create the trustline and mint the asset.
6. **Public Verification:** Click the external link icon or scan the QR code on the asset detail page to open the certificate view (`/verify/[id]`).
7. **Blockchain Explorer:** On the verification page, click the link to view the transaction on Stellar Expert.
