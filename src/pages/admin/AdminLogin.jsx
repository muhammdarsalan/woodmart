import { useState } from 'react';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ADMIN_EMAIL, ADMIN_PASSWORD, TOKEN_KEY } from '../../admin/config';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem(TOKEN_KEY, `woodmart-${Date.now()}`);
      navigate('/admin/dashboard', { replace: true });
      return;
    }
    setError('Invalid admin credentials');
    setShake(true);
    window.setTimeout(() => setShake(false), 450);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{
        backgroundColor: '#1C0A00',
        backgroundImage:
          'radial-gradient(circle at 20% 20%, rgba(196,154,42,0.16) 0 1px, transparent 1px), radial-gradient(circle at 80% 40%, rgba(196,154,42,0.12) 0 1px, transparent 1px)',
        backgroundSize: '34px 34px, 52px 52px',
      }}
    >
      <style>{`
        @keyframes admin-shake {
          10%, 90% { transform: translateX(-1px); }
          20%, 80% { transform: translateX(2px); }
          30%, 50%, 70% { transform: translateX(-4px); }
          40%, 60% { transform: translateX(4px); }
        }
      `}</style>
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-md bg-white rounded-lg shadow-2xl border border-gold/20 p-8 ${shake ? 'animate-[admin-shake_0.42s]' : ''}`}
      >
        <div className="text-center mb-8">
          <img src="/logo/logo.jpeg" alt="Wood Mart" className="h-16 w-auto object-contain mx-auto mb-4" />
          <h1 className="font-serif text-3xl text-darktext">Wood Mart</h1>
          <p className="text-gold font-medium mt-1">Admin Panel</p>
        </div>

        {error && <p className="mb-4 rounded bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

        <label className="block text-sm font-medium text-brown-light mb-1">Email</label>
        <div className="relative mb-4">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brown-light" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field pl-10"
            required
          />
        </div>

        <label className="block text-sm font-medium text-brown-light mb-1">Password</label>
        <div className="relative mb-6">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brown-light" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field pl-10 pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-brown-light hover:text-gold"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        <button type="submit" className="w-full bg-gold text-darktext font-semibold py-3 rounded hover:bg-gold-light transition-colors">
          Login
        </button>
      </form>
    </div>
  );
}
