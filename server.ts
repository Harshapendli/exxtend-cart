import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse incoming JSON
  app.use(express.json());

  // API Routes
  app.post('/api/create-order', async (req, res) => {
    try {
      const { amount, serviceNames, customerInfo } = req.body;
      
      const keyId = process.env.RAZORPAY_KEY_ID;
      const keySecret = process.env.RAZORPAY_KEY_SECRET;

      const orderAmount = Number(amount) || 100;
      const mockOrderId = `order_${Math.random().toString(36).substring(2, 15)}`;

      // If keys are not configured, return a mock success response
      if (!keyId || !keySecret || keyId.includes('xxxxx')) {
        console.log('Razorpay keys not configured. Falling back to secure transaction simulation.');
        return res.json({
          success: true,
          orderId: mockOrderId,
          amount: orderAmount,
          currency: 'INR',
          isMock: true,
          keyId: 'rzp_test_mock_key'
        });
      }

      // If keys are present, make a real REST API call to Razorpay to create the order
      console.log(`Connecting to Razorpay gateway for order amount: ${orderAmount} INR`);
      const authHeader = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
      
      const response = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${authHeader}`
        },
        body: JSON.stringify({
          amount: orderAmount * 100, // Razorpay works in paisa
          currency: 'INR',
          receipt: `receipt_${Date.now()}`,
          notes: {
            customerName: customerInfo?.name || 'Anonymous',
            customerPhone: customerInfo?.phone || '',
            services: serviceNames || 'Digital Compliance Service'
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Razorpay API error response:', errorData);
        throw new Error(errorData.error?.description || 'Razorpay Gateway Order Creation Failed');
      }

      const orderData = await response.json();
      console.log('Razorpay Order Created Successfully:', orderData.id);

      return res.json({
        success: true,
        orderId: orderData.id,
        amount: orderAmount,
        currency: 'INR',
        isMock: false,
        keyId: keyId
      });

    } catch (err: any) {
      console.error('Error creating payment order:', err);
      return res.status(500).json({
        success: false,
        error: err.message || 'Internal server error while creating payment'
      });
    }
  });

  // Vite Middleware for Asset Rendering & Hot Reload
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serving Static compiled files in Production Mode
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`EXTEND KART backend running on http://localhost:${PORT}`);
  });
}

startServer();
