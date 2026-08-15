import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers for all responses
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, serviceNames, customerInfo } = req.body || {};

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    const orderAmount = Number(amount) || 100;

    // Validate minimum amount (Razorpay requires minimum ₹1 = 100 paisa)
    if (orderAmount < 1) {
      return res.status(400).json({
        success: false,
        error: 'Order amount must be at least ₹1',
      });
    }

    // If Razorpay keys are not configured, return mock response
    if (!keyId || !keySecret || keyId.includes('xxxxx') || keyId === 'rzp_test_xxxxxxxxxxxxx') {
      console.log('Razorpay keys not configured. Returning simulation response.');
      return res.status(200).json({
        success: true,
        orderId: `order_sim_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
        amount: orderAmount,
        currency: 'INR',
        isMock: true,
        keyId: 'rzp_test_mock_key',
      });
    }

    // Real Razorpay order creation
    const authHeader = Buffer.from(`${keyId}:${keySecret}`).toString('base64');

    const razorpayResponse = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${authHeader}`,
      },
      body: JSON.stringify({
        amount: orderAmount * 100, // Convert to paisa (₹1 = 100 paisa)
        currency: 'INR',
        receipt: `rcpt_${Date.now()}`,
        notes: {
          customerName: customerInfo?.name || 'Walk-in',
          customerPhone: customerInfo?.phone || '',
          services: (serviceNames || 'Service Order').substring(0, 512),
        },
      }),
    });

    if (!razorpayResponse.ok) {
      let errorMsg = 'Razorpay order creation failed';
      try {
        const errorData = await razorpayResponse.json();
        errorMsg = errorData.error?.description || errorMsg;
      } catch {}
      console.error('Razorpay API error:', errorMsg);
      throw new Error(errorMsg);
    }

    const orderData = await razorpayResponse.json();
    console.log('Razorpay order created:', orderData.id, '- Amount:', orderAmount);

    return res.status(200).json({
      success: true,
      orderId: orderData.id,
      amount: orderAmount,
      currency: 'INR',
      isMock: false,
      keyId,
    });
  } catch (err: any) {
    console.error('Create-order error:', err.message || err);
    return res.status(500).json({
      success: false,
      error: err.message || 'Internal server error while creating payment',
    });
  }
}
