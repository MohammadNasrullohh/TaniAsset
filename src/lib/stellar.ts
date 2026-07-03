import * as StellarSdk from 'stellar-sdk';

const STELLAR_NETWORK = process.env.STELLAR_NETWORK || 'testnet';
const HORIZON_URL = process.env.STELLAR_HORIZON_URL || 'https://horizon-testnet.stellar.org';

const server = new StellarSdk.Horizon.Server(HORIZON_URL);

export const getStellarServer = () => server;

export const getNetworkPassphrase = () => {
  return STELLAR_NETWORK === 'public' 
    ? StellarSdk.Networks.PUBLIC 
    : StellarSdk.Networks.TESTNET;
};

// Generate an asset code from the asset name (max 12 chars, uppercase, alphanumeric)
export const generateAssetCode = (name: string): string => {
  const code = name.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  return code.substring(0, 12);
};

export const issueAsset = async (
  assetName: string, 
  quantity: string
): Promise<{
  assetCode: string;
  issuerPublicKey: string;
  distributorPublicKey: string;
  transactionHash: string;
}> => {
  const issuerSecret = process.env.STELLAR_ISSUER_SECRET;
  const distributorSecret = process.env.STELLAR_DISTRIBUTOR_SECRET;

  if (!issuerSecret || !distributorSecret) {
    throw new Error('Stellar secrets are not configured in environment variables.');
  }

  const issuerKeypair = StellarSdk.Keypair.fromSecret(issuerSecret);
  const distributorKeypair = StellarSdk.Keypair.fromSecret(distributorSecret);
  const assetCode = generateAssetCode(assetName);

  try {
    // 1. Load distributor account to check if it exists and get sequence number
    const distributorAccount = await server.loadAccount(distributorKeypair.publicKey());
    
    // 2. Create the Asset object
    const asset = new StellarSdk.Asset(assetCode, issuerKeypair.publicKey());
    
    // 3. Create a trustline from distributor to issuer
    const trustlineTx = new StellarSdk.TransactionBuilder(distributorAccount, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: getNetworkPassphrase(),
    })
      .addOperation(
        StellarSdk.Operation.changeTrust({
          asset: asset,
          limit: '922337203685.4775807', // max limit
        })
      )
      .setTimeout(30)
      .build();

    trustlineTx.sign(distributorKeypair);
    await server.submitTransaction(trustlineTx);

    // 4. Load issuer account to send the payment (mint)
    const issuerAccount = await server.loadAccount(issuerKeypair.publicKey());

    const mintTx = new StellarSdk.TransactionBuilder(issuerAccount, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: getNetworkPassphrase(),
    })
      .addOperation(
        StellarSdk.Operation.payment({
          destination: distributorKeypair.publicKey(),
          asset: asset,
          amount: quantity.toString(),
        })
      )
      .setTimeout(30)
      .build();

    mintTx.sign(issuerKeypair);
    const mintResult = await server.submitTransaction(mintTx);

    return {
      assetCode,
      issuerPublicKey: issuerKeypair.publicKey(),
      distributorPublicKey: distributorKeypair.publicKey(),
      transactionHash: mintResult.hash,
    };
  } catch (error: any) {
    console.error('Stellar Issuance Error:', error?.response?.data || error);
    throw new Error(error?.response?.data?.extras?.result_codes?.operations?.[0] || error.message || 'Failed to issue asset on Stellar');
  }
};
