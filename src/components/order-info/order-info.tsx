import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/storage/store';
import { selectIngredients } from '../../services/slices/ingredientsSlice';
import { selectOrders, getOrders } from '../../services/slices/ordersSlice';
import {
  getFeed,
  selectFeed,
  selectLoading
} from '../../services/slices/feedSlice';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const number = Number(useParams().number);
  const ingredients = useSelector(selectIngredients);
  const feed = useSelector(selectFeed);
  const orders = useSelector(selectOrders);
  const loading = useSelector(selectLoading);
  const location = useLocation();
  const comesFromProfile = location.pathname.startsWith('/profile');
  const comesFromFeed = location.pathname.startsWith('/feed');

  useEffect(() => {
    if (!feed.orders.length && comesFromFeed) {
      dispatch(getFeed());
    } else if (!orders.length && comesFromProfile) {
      dispatch(getOrders());
    }
  }, [dispatch]);

  const order =
    (comesFromFeed && feed.orders.find((i) => i.number === number)) ||
    (comesFromProfile && orders.find((i) => i.number === number));

  const orderData = order
    ? {
        createdAt: order.createdAt,
        ingredients: order.ingredients,
        _id: order._id,
        status: order.status,
        name: order.name,
        updatedAt: order.updatedAt,
        number: order.number
      }
    : null;

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (loading) {
    return <Preloader />;
  }

  if (!orderInfo) return;

  return <OrderInfoUI orderInfo={orderInfo} />;
};
