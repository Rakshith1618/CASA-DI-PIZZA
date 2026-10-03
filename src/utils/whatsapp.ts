import { restaurant } from '../data/restaurant';
import type { CartItem } from '../hooks/useCart';

export interface OrderDetails {
  name: string;
  phone: string;
  orderType: 'pickup' | 'delivery';
  address?: string;
  notes?: string;
}

export function generateWhatsAppMessage(
  orderDetails: OrderDetails,
  cartItems: CartItem[],
  subtotal: number,
  deliveryFee: number
): string {
  const lines: string[] = [];

  lines.push(`🍕 *NEW ORDER — ${restaurant.name}*`);
  lines.push('');
  lines.push(`*Customer:* ${orderDetails.name}`);
  lines.push(`*Phone:* ${orderDetails.phone}`);
  lines.push(`*Order Type:* ${orderDetails.orderType === 'delivery' ? 'Delivery' : 'Pickup'}`);

  if (orderDetails.orderType === 'delivery' && orderDetails.address) {
    lines.push(`*Address:* ${orderDetails.address}`);
  }

  lines.push('');
  lines.push('*--- ORDER ITEMS ---*');

  cartItems.forEach((ci) => {
    const unitPrice = ci.selectedSize?.price ?? ci.item.price;
    const itemTotal = unitPrice * ci.quantity;
    const sizeLabel = ci.selectedSize ? ` (${ci.selectedSize.label})` : '';
    lines.push(
      `• ${ci.item.name}${sizeLabel} × ${ci.quantity}${unitPrice > 0 ? ` — ₹${itemTotal.toFixed(2)}` : ''}`
    );
  });

  lines.push('');
  lines.push('*--- ORDER SUMMARY ---*');
  if (subtotal > 0) {
    lines.push(`*Subtotal:* ₹${subtotal.toFixed(2)}`);
    if (orderDetails.orderType === 'delivery' && deliveryFee > 0) {
      lines.push(`*Delivery Fee:* ₹${deliveryFee.toFixed(2)}`);
    }
    const total =
      subtotal +
      (orderDetails.orderType === 'delivery' ? deliveryFee : 0);
    lines.push(`*Total:* ₹${total.toFixed(2)}`);
  }

  if (orderDetails.notes) {
    lines.push('');
    lines.push(`*Notes:* ${orderDetails.notes}`);
  }

  return lines.join('\n');
}

export function openWhatsApp(message: string): boolean {
  const whatsappNumber = restaurant.whatsapp;
  if (!whatsappNumber) {
    return false;
  }
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${whatsappNumber}?text=${encoded}`;
  window.open(url, '_blank');
  return true;
}
