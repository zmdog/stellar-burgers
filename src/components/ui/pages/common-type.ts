import { SyntheticEvent, ChangeEvent } from 'react';

export type PageUIProps = {
  errorText: string | undefined;
  email: string;
  handleSubmit: (e: SyntheticEvent) => void;
  handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
