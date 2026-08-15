import { toast } from 'react-hot-toast';

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: any) => void;
  modal: {
    ondismiss: () => void;
  };
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
    if ((window as any).Razorpay) {
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

      // Check if we got HTML back instead of JSON (means API route isn't working)
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('text/html')) {
        console.error('API returned HTML instead of JSON — API route not configured properly on hosting.');
        throw new Error('Payment server not configured. Please contact support.');
      }

      if (!response.ok) {
        const errBody = await response.json().catch(() => ({}));
        throw new Error(errBody.error || `Server responded with ${response.status}`);
      }

      data = await response.json();
    } catch (fetchError: any) {
      console.error('Payment API error:', fetchError);
      toast.error(fetchError.message || 'Could not reach payment server. Please try again.');
      onFailure(fetchError.message || 'Payment API unreachable');
      throw fetchError;
    }

    toast.dismiss(loadingToast);

    if (!data.success) {
      throw new Error(data.error || 'Failed to create payment order');
    }

    // Mock/simulation mode — no real Razorpay keys configured
    if (data.isMock) {
      toast.success('Demo Mode: Simulating payment flow...');
      return {
        isMock: true,
        orderId: data.orderId,
        amount: data.amount,
        serviceNames,
        customerInfo,
      };
    }

    // Real Razorpay payment — load the SDK
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      throw new Error('Razorpay SDK failed to load. Please check your internet connection.');
    }

    return new Promise((resolve, reject) => {
      const options: RazorpayOptions = {
        key: data.keyId,
        // Amount is already in paisa from the server — do NOT multiply again
        amount: data.amount * 100,
        currency: 'INR',
        name: 'EXTEND KART',
        description: serviceNames.substring(0, 255),
        order_id: data.orderId,
        handler: function (res: any) {
          toast.success('Payment verified successfully! 🎉');
          onSuccess(res.razorpay_payment_id || 'pay_success');
          resolve(res);
        },
        modal: {
          ondismiss: function () {
            // User closed the Razorpay popup without paying
            toast('Payment cancelled.', { icon: '⚠️' });
            onFailure('Payment cancelled by user');
            resolve({ cancelled: true });
          },
        },
        prefill: {
          name: customerInfo.name,
          email: customerInfo.email || '',
          contact: customerInfo.phone,
        },
        theme: {
          color: '#1D9E75',
        },
      };

      const rzp = new (window as any).Razorpay(options);

      rzp.on('payment.failed', function (res: any) {
        const errorMsg = res.error?.description || 'Payment transaction failed';
        toast.error(errorMsg);
        onFailure(errorMsg);
        reject(new Error(errorMsg));
      });

      rzp.open();
    });
  } catch (error: any) {
    console.error('Razorpay checkout error:', error);
    toast.error(error.message || 'An error occurred during payment');
    onFailure(error.message);
    throw error;
  }
}
