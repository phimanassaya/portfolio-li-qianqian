interface BadgeProps {
  label: string;
  variant?: 'default' | 'secondary' | 'success' | 'error';
}

const badgeStyles: Record<NonNullable<BadgeProps['variant']>, string> = {
  default: 'border border-primary bg-transparent text-primary hover:bg-primary hover:text-background',
  secondary: 'border border-border bg-transparent text-body hover:border-primary hover:text-heading',
  success: 'border border-success/30 bg-success/10 text-success',
  error: 'border border-error/30 bg-error/10 text-error'
};

function Badge({ label, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={`inline-flex rounded-badge px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ${badgeStyles[variant]}`}
    >
      {label}
    </span>
  );
}

export default Badge;
