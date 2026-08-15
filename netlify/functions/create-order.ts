import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  // CORS headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const body = JSON.parse(event.body || '{}');
    const { amount, serviceNames, customerInfo } = body;

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    const orderAmount = Number(amount) || 100;

    // If keys are not configured, return a mock success response
    if (!keyId || !keySecret || keyId.includes('xxxxx')) {
      console.log('Razorpay keys not configured. Falling back to simulation.');
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          orderId: `order_${Math.random().toString(36).substring(2, 15)}`,
          amount: orderAmount,
          currency: 'INR',
          isMock: true,
          keyId: 'rzp_test_mock_key',
        }),
      };
    }

    // Real Razorpay order creation
    const authHeader = Buffer.from(`${keyId}:${keySecret}`).toString('base64');

    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${authHeader}`,
      },
      body: JSON.stringify({
        amount: orderAmount * 100, // paisa
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
        notes: {
          customerName: customerInfo?.name || 'Anonymous',
          customerPhone: customerInfo?.phone || '',
          services: serviceNames || 'Digital Compliance Service',
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.description || 'Razorpay order creation failed');
    }

    const orderData = await response.json();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        orderId: orderData.id,
        amount: orderAmount,
        currency: 'INR',
        isMock: false,
        keyId,
      }),
    };
  } catch (err: any) {
    console.error('Error creating payment order:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: err.message || 'Internal server error',
      }),
    };
  }
};

export { handler };
