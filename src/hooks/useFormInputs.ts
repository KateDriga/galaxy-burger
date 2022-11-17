import { ChangeEvent, useEffect, useState } from 'react';
import { IFormState, IUseFormInputs } from '../utils/ts-types/form-types';

export const useFormInputs = (formState: IFormState): IUseFormInputs => {
  const [form, setForm] = useState<IFormState>(formState);

  useEffect(() => {
    setForm(formState);
    // formState dependency is included
    // eslint-disable-next-line
  }, [JSON.stringify(formState)]);

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>): void =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return { form, handleFormChange, setForm };
};
