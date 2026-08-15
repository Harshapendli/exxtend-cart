import { supabase } from './supabaseClient';
import { v4 as uuidv4 } from 'uuid';

export async function submitOrderWithDocuments(
  customerInfo: { name: string; phone: string; email: string },
  cartItems: any[],
  totalAmount: number,
  files: File[]
) {
  try {
    // 1. Upload files to Supabase Storage
    const uploadedFileUrls: string[] = [];
    
    for (const file of files) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const safePhone = customerInfo.phone.replace(/[^a-zA-Z0-9]/g, '');
      const filePath = `${safePhone}/${fileName}`;

      const { data, error } = await supabase.storage
        .from('documents')
        .upload(filePath, file);

      if (error) throw error;

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath);

      uploadedFileUrls.push(publicUrlData.publicUrl);
    }

    // 2. Insert order into Supabase Database
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert([
        {
          customer_name: customerInfo.name,
          customer_phone: customerInfo.phone,
          customer_email: customerInfo.email,
          total_amount: totalAmount,
          items: cartItems,
          documents: uploadedFileUrls,
          status: 'pending'
        }
      ])
      .select();

    if (orderError) throw orderError;

    return orderData;
  } catch (error) {
    console.error("Error submitting order:", error);
    throw error;
  }
}
