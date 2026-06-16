export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  as: Component = 'button',
  ...props
}) {
  const variants = {
    primary: 'bg-primary text-white border-primary hover:bg-black',
    outline: 'bg-white text-primary border-primary hover:bg-primary hover:text-white',
    ghost: 'bg-transparent text-primary border-transparent hover:bg-bg-light',
    danger: 'bg-accent-red text-white border-accent-red hover:bg-red-700'
  };
  const sizes = {
    sm: 'h-9 px-3 text-xs',
    md: 'h-11 px-5 text-sm',
    lg: 'h-12 px-6 text-sm'
  };
  return (
    <Component
      type={Component === 'button' ? type : undefined}
      className={'inline-flex items-center justify-center gap-2 border font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ' + variants[variant] + ' ' + sizes[size] + ' ' + className}
      {...props}
    >
      {children}
    </Component>
  );
}
