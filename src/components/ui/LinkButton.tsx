import { type AnchorHTMLAttributes, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { buttonBaseStyles, buttonVariantStyles, buttonSizeStyles, type ButtonVariant, type ButtonSize } from './Button';

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  to?: string;
  children: ReactNode;
}

function LinkButton({ variant = 'primary', size = 'md', to, className = '', children, ...props }: LinkButtonProps) {
  const classes = `${buttonBaseStyles} ${buttonVariantStyles[variant]} ${buttonSizeStyles[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a className={classes} {...props}>
      {children}
    </a>
  );
}

export default LinkButton;
