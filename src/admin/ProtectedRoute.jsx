import { Navigate, Outlet } from 'react-router-dom';
import { TOKEN_KEY, TOKEN_VALUE } from './config';

export default function ProtectedRoute() {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token !== TOKEN_VALUE) {
    return <Navigate to="/admin/login" replace />;
  }
  return <Outlet />;
}
