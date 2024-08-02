import { ChangeEvent } from 'react';
import { PageUIProps } from '../common-type';

export type ResetPasswordUIProps = Omit<PageUIProps, 'email' | 'setEmail'> & {
  password: string;
  token: string;
  handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
