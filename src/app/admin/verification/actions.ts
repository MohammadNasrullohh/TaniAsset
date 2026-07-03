'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { issueAsset } from '@/lib/stellar';

export async function approveAsset(assetId: string) {
  const { error } = await supabase
    .from('assets')
    .update({ status: 'Verified' })
    .eq('id', assetId);

  if (error) {
    throw new Error('Failed to approve asset');
  }

  revalidatePath('/admin/verification');
  revalidatePath('/dashboard');
  revalidatePath('/assets');
  revalidatePath(`/assets/${assetId}`);
}

export async function rejectAsset(assetId: string, reason: string) {
  const { error } = await supabase
    .from('assets')
    .update({ 
      status: 'Rejected',
      rejection_reason: reason
    })
    .eq('id', assetId);

  if (error) {
    throw new Error('Failed to reject asset');
  }

  revalidatePath('/admin/verification');
  revalidatePath('/dashboard');
  revalidatePath('/assets');
  revalidatePath(`/assets/${assetId}`);
}

export async function tokenizeAsset(assetId: string) {
  // Get asset details
  const { data: asset, error: fetchError } = await supabase
    .from('assets')
    .select('*')
    .eq('id', assetId)
    .single();

  if (fetchError || !asset) {
    throw new Error('Asset not found');
  }

  if (asset.status !== 'Verified') {
    throw new Error('Asset must be verified before tokenization');
  }

  try {
    // Call Stellar SDK to issue asset
    const stellarData = await issueAsset(asset.asset_name, asset.quantity.toString());

    // Update database with Stellar details
    const { error: updateError } = await supabase
      .from('assets')
      .update({
        status: 'Tokenized',
        asset_code: stellarData.assetCode,
        stellar_issuer_public_key: stellarData.issuerPublicKey,
        stellar_distributor_public_key: stellarData.distributorPublicKey,
        stellar_transaction_hash: stellarData.transactionHash,
      })
      .eq('id', assetId);

    if (updateError) {
      console.error('Failed to update asset in database after tokenization', updateError);
      throw new Error('Tokenized successfully, but failed to save to database');
    }

    revalidatePath('/admin/verification');
    revalidatePath('/dashboard');
    revalidatePath('/assets');
    revalidatePath(`/assets/${assetId}`);
    
    return { success: true };
  } catch (error: any) {
    console.error('Tokenization failed:', error);
    throw new Error(error.message || 'Tokenization failed');
  }
}
