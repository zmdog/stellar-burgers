import { ChangeEvent } from 'react';
import { PageUIProps } from '../common-type';

export type RegisterUIProps = PageUIProps & {
  password: string;
  userName: string;
  handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
