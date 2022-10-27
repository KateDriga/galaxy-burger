import { useEffect, useState } from 'react';

export const useFormInputs = formState => {
  const [form, setForm] = useState(formState);

  useEffect(() => {
    setForm(formState);
    // formState dependency is included
    // eslint-disable-next-line
  }, [JSON.stringify(formState)]);

  const handleFormChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return { form, handleFormChange, setForm };
};
