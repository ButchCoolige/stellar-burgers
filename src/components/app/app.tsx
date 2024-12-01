import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { ProtectedRoute } from '../routes/ProtectedRoute';
import { getCookie } from '../../utils/cookie';
import { getUser } from '../../services/slices/userSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/storage/store';
import {
  getIngredients,
  selectIngredients
} from '../../services/slices/ingredientsSlice';
import { getFeed, selectFeed } from '../../services/slices/feedSlice';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };
  const navigate = useNavigate();
  const ingredients = useSelector(selectIngredients);
  const feed = useSelector(selectFeed);

  useEffect(() => {
    const token = getCookie('accessToken');

    if (token) dispatch(getUser());
    if (!ingredients.length) dispatch(getIngredients());
    if (!feed.orders.length) dispatch(getFeed());
  }, [dispatch]);

  const handleCloseModal = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes location={state?.backgroundLocation || location}>
        {/* {appRoutes.map((route) => (
          <Route key={route.path} {...route} />
        ))} */}
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' index element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route path='/profile'>
          <Route
            index
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='orders'
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path='orders/:number'
            element={
              <ProtectedRoute>
                <OrderInfo />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route
            path='feed/:number'
            element={
              <Modal title='Детали заказа' onClose={handleCloseModal}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={handleCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal title='Детали заказа' onClose={handleCloseModal}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

/* const appRoutes = [
  { path: '/', element: <ConstructorPage /> },
  { path: '/feed', index: true, element: <Feed /> },
  { path: '/feed/:number', element: <OrderInfo /> },
  { path: '/ingredients/:id', element: <IngredientDetails /> },
  {
    path: '/login',
    element: (
      <ProtectedRoute onlyUnAuth>
        <Login />
      </ProtectedRoute>
    )
  },
  {
    path: '/register',
    element: (
      <ProtectedRoute onlyUnAuth>
        <Register />
      </ProtectedRoute>
    )
  },
  {
    path: '/forgot-password',
    element: (
      <ProtectedRoute onlyUnAuth>
        <ForgotPassword />
      </ProtectedRoute>
    )
  },
  {
    path: '/reset-password',
    element: (
      <ProtectedRoute onlyUnAuth>
        <ResetPassword />
      </ProtectedRoute>
    )
  },
  {
    path: '/profile',
    index: true,
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    )
  },
  {
    path: '/orders',
    element: (
      <ProtectedRoute>
        <ProfileOrders />
      </ProtectedRoute>
    )
  },
  {
    path: 'orders/:number',
    element: (
      <ProtectedRoute>
        <OrderInfo />
      </ProtectedRoute>
    )
  },
  { path: '*', element: <NotFound404 /> }
]; */

export default App;
