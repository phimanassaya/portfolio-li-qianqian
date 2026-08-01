import { type ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'error';
export type ButtonSize = 'sm' | 'md' | 'lg';

export const buttonBaseStyles =
  'inline-flex items-center justify-center gap-2.5 rounded-btn font-button font-semibold uppercase tracking-[0.18em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background';

export const buttonVariantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-primary-600 via-primary to-primary-300 text-background hover:from-primary hover:via-primary-300 hover:to-primary-100 hover:shadow-glow focus-visible:ring-primary-300',
  secondary:
    'border border-primary bg-surface text-primary hover:bg-gradient-to-r hover:from-primary-600 hover:via-primary hover:to-primary-300 hover:text-background hover:shadow-glow focus-visible:ring-primary-300',
  outline: 'border border-border bg-transparent text-heading hover:border-accent hover:text-accent focus-visible:ring-accent-300',
  ghost: 'bg-transparent text-heading hover:text-accent focus-visible:ring-accent-300',
  success: 'bg-success text-background hover:opacity-90 focus-visible:ring-success',
  error: 'bg-error text-background hover:opacity-90 focus-visible:ring-error'
};

export const buttonSizeStyles: Record<ButtonSize, string> = {
  sm: 'px-5 py-2.5 text-[11px]',
  md: 'px-7 py-3.5 text-xs',
  lg: 'px-8 py-4 text-xs'
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

function Button({ variant = 'primary', size = 'md', className = '', type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={`${buttonBaseStyles} ${buttonVariantStyles[variant]} ${buttonSizeStyles[size]} ${className}`}
      {...props}
    />
  );
}

export default Button;
