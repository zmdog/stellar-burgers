import { FC, SyntheticEvent } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { fetchUserRegistration } from '../../slices/authSlice';
import { useForm } from '../../hooks/useForm';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const { values, handleChange } = useForm({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      fetchUserRegistration({
        name: values.name,
        email: values.email,
        password: values.password
      })
    );
  };
  return (
    <RegisterUI
      errorText=''
      email={values.email}
      userName={values.name}
      password={values.password}
      handleSubmit={handleSubmit}
      handleOnChange={handleChange}
    />
  );
};
