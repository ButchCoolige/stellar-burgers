import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/storage/store';
import { selectUser } from '../../services/slices/userSlice';

export const AppHeader: FC = () => {
  const user = useSelector(selectUser);

  return <AppHeaderUI userName={user ? user.name : ''} />;
};
