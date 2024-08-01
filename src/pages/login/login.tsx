import { FC, SyntheticEvent } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { fetchUserLogin } from '../../slices/authSlice';
import { useForm } from '../../hooks/useForm';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const { values, handleChange } = useForm({
    email: '',
    password: ''
  });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      fetchUserLogin({ email: values.email, password: values.password })
    );
  };
  return (
    <LoginUI
      errorText=''
      email={values.email}
      password={values.password}
      handleSubmit={handleSubmit}
      handleOnChange={handleChange}
    />
  );
};
