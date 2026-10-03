import type { ReactNode, ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  children: ReactNode;
  fullWidth?: boolean;
}

const variants = {
  primary:
    'bg-[#AA110D] text-[#F9F2E7] hover:bg-[#8a0e0b] shadow-sm hover:shadow-md hover:shadow-[#AA110D]/10',
  secondary:
    'bg-[#124C26] text-[#F9F2E7] hover:bg-[#0e3d1e] shadow-sm hover:shadow-md hover:shadow-[#124C26]/10',
  outline:
    'bg-transparent border-2 border-[#3A1B0A] text-[#3A1B0A] hover:bg-[#3A1B0A] hover:text-[#F9F2E7]',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3.5 text-base',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  to,
  children,
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#AA110D] focus:ring-offset-2 focus:ring-offset-[#F9F2E7] disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
