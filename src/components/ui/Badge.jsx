export default function Badge({ children, tone = 'dark', className = '' }) {
  const tones = {
    dark: 'bg-primary text-white',
    light: 'bg-bg-light text-primary',
    red: 'bg-accent-red text-white',
    green: 'bg-green-100 text-green-700',
    yellow: 'bg-yellow-100 text-yellow-800',
    blue: 'bg-blue-100 text-blue-700'
  };
  return (
    <span className={'inline-flex items-center px-2 py-1 text-[11px] font-medium uppercase tracking-wide ' + tones[tone] + ' ' + className}>
      {children}
    </span>
  );
}
