import { useState, ChangeEvent } from 'react';
interface IUseFormProps {
  [key: string]: string;
}
export function useForm(inputValues: IUseFormProps) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange };
}
