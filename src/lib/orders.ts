import { supabase } from './supabaseClient';
import { v4 as uuidv4 } from 'uuid';

export async function submitOrderWithDocuments(
  customerInfo: { name: string; phone: string; email: string },
  cartItems: any[],
  totalAmount: number,
  files: File[]
) {
  try {
    // Check if Supabase is properly configured
    if (!supabase) {
      console.warn('Supabase not configured — skipping order save.');
      return null;
    }

    // 1. Upload files to Supabase Storage (if any)
    const uploadedFileUrls: string[] = [];

    for (const file of files) {
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const safePhone = customerInfo.phone.replace(/[^a-zA-Z0-9]/g, '');
        const filePath = `${safePhone}/${fileName}`;

        const { data, error } = await supabase.storage
          .from('documents')
          .upload(filePath, file);

        if (error) {
          console.warn('File upload failed (non-critical):', error.message);
          continue; // Skip failed uploads, don't crash the whole order
        }

        const { data: publicUrlData } = supabase.storage
          .from('documents')
          .getPublicUrl(filePath);

        uploadedFileUrls.push(publicUrlData.publicUrl);
      } catch (uploadErr) {
        console.warn('File upload error (skipping):', uploadErr);
      }
    }

    // 2. Insert order into Supabase Database
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert([
        {
          customer_name: customerInfo.name,
          customer_phone: customerInfo.phone,
          customer_email: customerInfo.email || '',
          total_amount: totalAmount,
          items: cartItems,
          documents: uploadedFileUrls,
          status: 'pending'
        }
      ])
      .select();

    if (orderError) {
      console.warn('Order insert failed:', orderError.message);
      // Don't throw — let payment continue
      return null;
    }

    console.log('Order saved to Supabase:', orderData);
    return orderData;
  } catch (error) {
    console.warn('Order submission error (non-blocking):', error);
    // Return null instead of throwing — payment should still proceed
    return null;
  }
}
