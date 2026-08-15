import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  return res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    razorpay: {
      keyIdSet: !!keyId,
      keyIdPrefix: keyId ? keyId.substring(0, 12) + '...' : 'NOT SET',
      secretSet: !!keySecret,
      secretLength: keySecret ? keySecret.length : 0,
      wouldMock: !keyId || !keySecret || keyId.includes('xxxxx') || keyId === 'rzp_test_xxxxxxxxxxxxx',
    },
  });
}
