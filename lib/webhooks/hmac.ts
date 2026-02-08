import { createHmac, timingSafeEqual } from 'crypto';

const WEBHOOK_SECRET = process.env.AGA_WEBHOOK_SECRET || '';

export function generateSignature(payload: string): string {
  return createHmac('sha256', WEBHOOK_SECRET)
    .update(payload)
    .digest('hex');
}

export function verifySignature(payload: string, signature: string): boolean {
  if (!WEBHOOK_SECRET) return false;

  const expected = generateSignature(payload);

  try {
    return timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expected, 'hex')
    );
  } catch {
    return false;
  }
}

export function validateWebhookRequest(
  body: string,
  signatureHeader: string | null
): { valid: boolean; error?: string } {
  if (!WEBHOOK_SECRET) {
    return { valid: false, error: 'Webhook secret not configured' };
  }

  if (!signatureHeader) {
    return { valid: false, error: 'Missing X-Webhook-Signature header' };
  }

  // Expect format: sha256=<hex>
  const parts = signatureHeader.split('=');
  if (parts.length !== 2 || parts[0] !== 'sha256') {
    return { valid: false, error: 'Invalid signature format. Expected: sha256=<hex>' };
  }

  const isValid = verifySignature(body, parts[1]);
  if (!isValid) {
    return { valid: false, error: 'Invalid signature' };
  }

  return { valid: true };
}
