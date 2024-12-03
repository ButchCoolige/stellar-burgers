import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/storage/store';
import {
  getFeed,
  selectFeed,
  selectLoading
} from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const feed = useSelector(selectFeed);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    if (!feed.orders.length) {
      dispatch(getFeed());
    }
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={feed.orders} handleGetFeeds={() => dispatch(getFeed())} />
  );
};
