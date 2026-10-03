export function validateName(name: string): string | null {
  if (!name.trim()) return 'Name is required';
  if (name.trim().length < 2) return 'Name must be at least 2 characters';
  return null;
}

export function validatePhone(phone: string): string | null {
  if (!phone.trim()) return 'Phone number is required';
  const cleaned = phone.replace(/[\s\-()]/g, '');
  if (!/^\+?[0-9]{7,15}$/.test(cleaned)) return 'Please enter a valid phone number';
  return null;
}

export function validateEmail(email: string): string | null {
  if (!email.trim()) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email address';
  return null;
}

export function validateMessage(message: string): string | null {
  if (!message.trim()) return 'Message is required';
  if (message.trim().length < 10) return 'Message must be at least 10 characters';
  return null;
}

export function validateAddress(address: string): string | null {
  if (!address.trim()) return 'Delivery address is required';
  if (address.trim().length < 5) return 'Please enter a complete address';
  return null;
}
