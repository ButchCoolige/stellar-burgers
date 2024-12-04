import { FC, useMemo, useState } from 'react';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  selectIngredients,
  selectLoading
} from '../../services/slices/orderSlice';
import { selectUser } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { sendOrder } from '../../services/slices/orderSlice';
import { useDispatch, useSelector } from '../../services/storage/store';

export const BurgerConstructor: FC = () => {
  const isLoading = useSelector(selectLoading);
  const Ingredients = useSelector(selectIngredients);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const constructorItems = useMemo(() => {
    const bun = Ingredients.find((item) => item.type === 'bun');
    const otherIngredients = Ingredients.filter((item) => item.type !== 'bun');
    return {
      bun: bun ? { ...bun, id: bun._id } : null,
      ingredients: otherIngredients.map((ingredient) => ({
        ...ingredient
      }))
    };
  }, [Ingredients]);

  const [orderModalData, setOrderModalData] = useState<TOrder | null>(null);

  const onOrderClick = () => {
    if (!constructorItems.bun || !constructorItems.ingredients.length) return;
    if (!user) return navigate('/login');

    const ingredients = [
      constructorItems.bun.id,
      ...constructorItems.ingredients.map((item) => item._id)
    ];
    dispatch(sendOrder(ingredients))
      .unwrap()
      .then((response) => {
        const newOrder = response.order;
        setOrderModalData(newOrder);
      })
      .catch((err) => {
        console.log('Ошибка при оформлении заказа:', err);
      });
  };

  const closeOrderModal = () => {
    setOrderModalData(null);
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (sum: number, item: TConstructorIngredient) => sum + item.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={isLoading}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
