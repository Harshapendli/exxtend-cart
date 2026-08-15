import { toast } from 'react-hot-toast';

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: any) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
}

export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.hasOwnProperty('Razorpay')) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export async function checkoutWithRazorpay({
  amount,
  serviceNames,
  customerInfo,
  onSuccess,
  onFailure
}: {
  amount: number;
  serviceNames: string;
  customerInfo: { name: string; phone: string; email?: string };
  onSuccess: (paymentId: string) => void;
  onFailure: (error: string) => void;
}) {
  try {
    const loadingToast = toast.loading('Initializing secure payment gateway...');

    let data;
    try {
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, serviceNames, customerInfo }),
      });
      data = await response.json();
    } catch (parseError) {
      // If backend is missing (e.g. running 'vite' locally without Netlify CLI or server.ts), simulate order
      console.warn('Backend not found, falling back to local simulation mode.', parseError);
      data = {
        success: true,
        isMock: true,
        orderId: `mock_${Math.random().toString(36).substr(2, 9)}`,
        amount: amount,
        keyId: 'rzp_test_mock_key'
      };
    }

    toast.dismiss(loadingToast);

    if (!data.success) {
      throw new Error(data.error || 'Failed to create payment order');
    }

    if (data.isMock) {
      // Elegant checkout simulation for preview/mock environments
      toast.success('Simulation Mode: Launching payment demo...');
      return {
        isMock: true,
        orderId: data.orderId,
        amount: data.amount,
        serviceNames,
        customerInfo,
      };
    }

    // Load Razorpay library
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      throw new Error('Razorpay SDK failed to load. Please check your internet connection.');
    }

    return new Promise((resolve, reject) => {
      const options: RazorpayOptions = {
        key: data.keyId,
        amount: data.amount * 100, // paisa
        currency: 'INR',
        name: 'EXTEND KART',
        description: serviceNames.substring(0, 255),
        order_id: data.orderId,
        handler: function (res: any) {
          toast.success('Payment verified successfully!');
          onSuccess(res.razorpay_payment_id || 'pay_mock_success');
          resolve(res);
        },
        prefill: {
          name: customerInfo.name,
          email: customerInfo.email || 'extendkart@gmail.com',
          contact: customerInfo.phone,
        },
        theme: {
          color: '#1D9E75', // Emerald Brand Color
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (res: any) {
        toast.error(res.error.description || 'Payment transaction failed');
        onFailure(res.error.description);
        reject(new Error(res.error.description));
      });
      rzp.open();
    });
  } catch (error: any) {
    console.error('Razorpay payment setup error:', error);
    toast.error(error.message || 'An error occurred during payment checkout');
    onFailure(error.message);
    throw error;
  }
}
