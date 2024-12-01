import { useSelector } from '../../services/storage/store';
import { selectLoading, selectUser } from '../../services/slices/userSlice';
import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth
}: ProtectedRouteProps) => {
  const user = useSelector(selectUser);
  const loading = useSelector(selectLoading);
  const location = useLocation();

  if (loading) return <Preloader />;

  if (!user && !onlyUnAuth) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (user && onlyUnAuth) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
