import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { ADMIN_EMAIL, ADMIN_PASSWORD, TOKEN_KEY, TOKEN_VALUE } from '../../admin/config';
import { handleImageError } from '../../utils/images';
import { supabase } from '../../lib/supabase';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const login = async event => {
    event.preventDefault();
    
    // Authenticate with Supabase so that auth.uid() is set for RLS
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(true);
      setTimeout(() => setError(false), 500);
      return;
    }

    // Still maintain the token in localStorage for legacy route protection
    localStorage.setItem(TOKEN_KEY, TOKEN_VALUE);
    navigate('/admin/dashboard');
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-primary p-4">
      <form onSubmit={login} className={'w-full max-w-md bg-white p-8 shadow-soft ' + (error ? 'animate-pulse' : '')}>
        <img src="/logo/logo.jpeg" alt="Wood Mart" loading="eager" decoding="async" onError={handleImageError} className="mx-auto h-14 w-14 object-cover" />
        <h1 className="mt-5 text-center text-2xl font-semibold text-primary">Admin Login</h1>
        <p className="mt-2 text-center text-sm text-secondary">Manage Wood Mart products, orders, and messages.</p>
        <label className="mt-6 block">
          <span className="mb-2 block text-sm font-medium">Email</span>
          <input value={email} onChange={event => setEmail(event.target.value)} className="input-field" type="email" />
        </label>
        <label className="mt-4 block">
          <span className="mb-2 block text-sm font-medium">Password</span>
          <span className="flex border border-border-light">
            <input value={password} onChange={event => setPassword(event.target.value)} className="h-11 flex-1 px-3 outline-none" type={showPassword ? 'text' : 'password'} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="flex h-11 w-11 items-center justify-center" aria-label="Toggle password">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </span>
        </label>
        {error && <p className="mt-3 text-sm text-accent-red">Invalid admin credentials.</p>}
        <Button type="submit" className="mt-6 w-full">Login</Button>
      </form>
    </main>
  );
}
