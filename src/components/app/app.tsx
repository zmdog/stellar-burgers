import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { Modal, OrderInfo, IngredientDetails, Layout } from '@components';
import '../../index.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { useEffect } from 'react';
import {
  fetchUserLoginWithRefresh,
  getIsAuth,
  getIsAuthChecked
} from '../../slices/authSlice';
import { getOrderData } from '../../slices/ordersSlice';
import { ProtectedRoute } from '../protected-route/ProtectedRoute';
import { TOrder } from '@utils-types';
import { getCookie } from '../../utils/cookie';
import { fetchIngredients } from '../../slices/ingredientsSlice';
import { useOrders } from '../../hooks/useOrders';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state?.background;
  const isAuth = useSelector<boolean>(getIsAuth);
  const isAuthChecked = useSelector<boolean>(getIsAuthChecked);
  const orderNumber: TOrder | undefined = useSelector<TOrder | undefined>(
    getOrderData
  );
  const handleClose = () => history.back();
  useOrders(location.pathname);
  useEffect(() => {
    dispatch(fetchIngredients());
    getCookie('accessToken') && dispatch(fetchUserLoginWithRefresh());
  }, []);

  return (
    <>
      <Routes location={background || location}>
        <Route path={'/'} element={<Layout />}>
          <Route index element={<ConstructorPage />} />
          <Route path={'ingredients/:id'} element={<IngredientDetails />} />
          <Route path={'feed'} element={<Feed />}>
            <Route path={':number'} element={<OrderInfo />} />
          </Route>
          <Route
            path={'profile'}
            element={
              <ProtectedRoute
                isState={!isAuth}
                isChecked={isAuthChecked}
                route={'/login'}
                children={<Profile />}
              />
            }
          />
          <Route
            path={'profile/orders'}
            element={
              <ProtectedRoute
                isState={!isAuth}
                isChecked={isAuthChecked}
                route={'/login'}
                children={<ProfileOrders />}
              />
            }
          >
            <Route path={':number'} element={<OrderInfo />} />
          </Route>
          <Route
            path={'login'}
            element={
              <ProtectedRoute
                isState={isAuth}
                isChecked={isAuthChecked}
                route={'/'}
                children={<Login />}
              />
            }
          />
          <Route
            path={'register'}
            element={
              <ProtectedRoute
                isState={isAuth}
                isChecked={isAuthChecked}
                route={'/'}
                children={<Register />}
              />
            }
          />
          <Route path={'forgot-password'} element={<ForgotPassword />} />
          <Route path={'reset-password'} element={<ResetPassword />} />
        </Route>
        <Route path={'*'} element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path={'/ingredients/:id'}
            element={
              <Modal
                title={'Детали ингредиента'}
                onClose={handleClose}
                children={<IngredientDetails />}
              />
            }
          />
          <Route
            path={'/feed/:number'}
            element={
              <Modal
                title={`${orderNumber ? `#0${orderNumber?.number}` : ''}`}
                onClose={handleClose}
                children={<OrderInfo />}
              />
            }
          />
          <Route
            path={'/profile/orders/:number'}
            element={
              <Modal
                title={`${orderNumber ? `#0${orderNumber?.number}` : ''}`}
                onClose={handleClose}
                children={<OrderInfo />}
              />
            }
          />
        </Routes>
      )}
    </>
  );
};

export default App;
