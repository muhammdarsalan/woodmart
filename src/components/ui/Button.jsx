import { Loader2 } from 'lucide-react';

const variants = {
  primary: 'bg-gold text-darktext hover:bg-gold-light border border-gold',
  outline: 'border-2 border-darktext text-darktext hover:bg-gold hover:border-gold bg-transparent',
  ghost: 'text-darktext hover:bg-beige bg-transparent border border-transparent',
  gold: 'bg-gold text-darktext hover:bg-gold-light border border-gold shadow-md',
  dark: 'bg-darktext text-lighttext hover:bg-gold hover:text-darktext border border-darktext',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  children,
  onClick,
  className = '',
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 font-medium rounded-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
      {!loading && Icon && iconPosition === 'left' && <Icon className="w-4 h-4" aria-hidden="true" />}
      {children}
      {!loading && Icon && iconPosition === 'right' && <Icon className="w-4 h-4" aria-hidden="true" />}
    </button>
  );
}
