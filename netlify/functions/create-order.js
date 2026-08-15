const https = require('https');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { amount, serviceNames, customerInfo } = JSON.parse(event.body);

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    const orderAmount = Number(amount) || 100;
    const mockOrderId = `order_${Math.random().toString(36).substring(2, 15)}`;

    // If keys are not configured or still the default placeholders, use simulation mode
    if (!keyId || !keySecret || keyId.includes('xxxxx') || keyId.includes('rzp_test_T3qH2B138uDjah')) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          orderId: mockOrderId,
          amount: orderAmount,
          currency: 'INR',
          isMock: true,
          keyId: 'rzp_test_mock_key'
        })
      };
    }

    // Call Razorpay API
    const authHeader = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
    const postData = JSON.stringify({
      amount: orderAmount * 100, // paisa
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        customerName: customerInfo?.name || 'Anonymous',
        customerPhone: customerInfo?.phone || '',
        services: serviceNames || 'Digital Compliance Service'
      }
    });

    const responseData = await new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.razorpay.com',
        port: 443,
        path: '/v1/orders',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${authHeader}`,
          'Content-Length': Buffer.byteLength(postData)
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          resolve({ statusCode: res.statusCode, data: JSON.parse(data) });
        });
      });

      req.on('error', (e) => reject(e));
      req.write(postData);
      req.end();
    });

    if (responseData.statusCode >= 400) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          error: responseData.data.error?.description || 'Razorpay Gateway Order Creation Failed'
        })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        orderId: responseData.data.id,
        amount: orderAmount,
        currency: 'INR',
        isMock: false,
        keyId: keyId
      })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: err.message || 'Internal server error while creating payment'
      })
    };
  }
};
