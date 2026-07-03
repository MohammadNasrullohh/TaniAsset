'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createAsset(formData: FormData) {
  const assetName = formData.get('asset_name') as string;
  const category = formData.get('category') as string;
  const quantity = parseFloat(formData.get('quantity') as string);
  const unit = formData.get('unit') as string;
  const estimatedValue = formData.get('estimated_value_idr') ? parseFloat(formData.get('estimated_value_idr') as string) : null;
  const location = formData.get('location') as string;
  const ownerName = formData.get('owner_name') as string;
  const ownerWallet = formData.get('owner_wallet') as string;
  const harvestDate = formData.get('harvest_date') as string;
  const description = formData.get('description') as string;
  
  const proofImage = formData.get('proof_image') as File;
  const proofDocument = formData.get('proof_document') as File;

  let proofImageUrl = null;
  let proofDocumentUrl = null;

  // Upload image
  if (proofImage && proofImage.size > 0) {
    const fileExt = proofImage.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const { data, error } = await supabase.storage
      .from('proofs')
      .upload(fileName, proofImage);
      
    if (error) {
      console.error('Error uploading image:', error);
      throw new Error('Failed to upload proof image');
    }
    
    const { data: { publicUrl } } = supabase.storage.from('proofs').getPublicUrl(fileName);
    proofImageUrl = publicUrl;
  }

  // Upload document
  if (proofDocument && proofDocument.size > 0) {
    const fileExt = proofDocument.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const { data, error } = await supabase.storage
      .from('proofs')
      .upload(fileName, proofDocument);
      
    if (error) {
      console.error('Error uploading document:', error);
      throw new Error('Failed to upload proof document');
    }
    
    const { data: { publicUrl } } = supabase.storage.from('proofs').getPublicUrl(fileName);
    proofDocumentUrl = publicUrl;
  }

  // Insert into DB
  const { data: asset, error } = await supabase
    .from('assets')
    .insert([{
      asset_name: assetName,
      category,
      quantity,
      unit,
      estimated_value_idr: estimatedValue,
      location,
      owner_name: ownerName,
      owner_wallet: ownerWallet,
      harvest_date: harvestDate || null,
      description,
      proof_image_url: proofImageUrl,
      proof_document_url: proofDocumentUrl,
      status: 'Pending Verification'
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating asset:', error);
    throw new Error('Failed to create asset record');
  }

  revalidatePath('/dashboard');
  revalidatePath('/assets');
  redirect(`/assets/${asset.id}`);
}
