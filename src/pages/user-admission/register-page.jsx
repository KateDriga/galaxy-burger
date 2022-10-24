import { useFormInputs } from '../../hooks/useFormInputs';
import { AdmissionForm } from '../../components/admission-form/admission-form';
import {
  FORM_INPUTS,
  REGISTER_ACTIONS,
} from '../../utils/const-variables/form-variables';

export const RegisterPage = () => {
  const registerForm = useFormInputs({ name: '', email: '', password: '' });

  const nameInput = {
    ...FORM_INPUTS.name,
    value: registerForm.form.name,
  };

  const emailInput = {
    ...FORM_INPUTS.email,
    value: registerForm.form.email,
  };

  const passwordInput = {
    ...FORM_INPUTS.password,
    value: registerForm.form.password,
  };

  return (
    <AdmissionForm
      title="Регистрация"
      inputs={[nameInput, emailInput, passwordInput]}
      buttonName="Зарегистрироваться"
      onFormChange={registerForm.handleFormChange}
      actions={REGISTER_ACTIONS}
    />
  );
};
