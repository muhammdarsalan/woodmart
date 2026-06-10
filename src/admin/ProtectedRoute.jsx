import { Navigate, useLocation } from 'react-router-dom';
import { TOKEN_KEY } from './config';

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const token = localStorage.getItem(TOKEN_KEY);

  if (!token) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return children;
}
