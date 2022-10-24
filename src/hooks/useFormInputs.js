import { useState } from 'react';

export const useFormInputs = formState => {
  const [form, setForm] = useState(formState);

  const handleFormChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return { form, handleFormChange };
};
