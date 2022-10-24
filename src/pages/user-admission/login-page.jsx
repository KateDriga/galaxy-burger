import { useFormInputs } from '../../hooks/useFormInputs';
import { AdmissionForm } from '../../components/admission-form/admission-form';
import {
  FORM_INPUTS,
  LOGIN_ACTIONS,
} from '../../utils/const-variables/form-variables';

export const LoginPage = () => {
  const loginForm = useFormInputs({ email: '', password: '' });

  const emailInput = {
    ...FORM_INPUTS.email,
    value: loginForm.form.email,
  };

  const passwordInput = {
    ...FORM_INPUTS.password,
    value: loginForm.form.password,
  };

  return (
    <AdmissionForm
      title="Вход"
      inputs={[emailInput, passwordInput]}
      buttonName="Войти"
      onFormChange={loginForm.handleFormChange}
      actions={LOGIN_ACTIONS}
    />
  );
};
