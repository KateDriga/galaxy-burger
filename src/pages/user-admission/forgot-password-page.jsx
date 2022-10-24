import { useFormInputs } from '../../hooks/useFormInputs';
import {
  FORM_INPUTS,
  FORGOT_RESET_PASSWORD_ACTIONS,
} from '../../utils/const-variables/form-variables';
import { AdmissionForm } from '../../components/admission-form/admission-form';

export const ForgotPasswordPage = () => {
  const forgotPasswordForm = useFormInputs({ email: '' });

  const emailInput = {
    ...FORM_INPUTS.email,
    value: forgotPasswordForm.form.email,
    placeholder: 'Укажите e-mail',
  };

  return (
    <AdmissionForm
      title="Восстановление пароля"
      inputs={[emailInput]}
      buttonName="Восстановить"
      onFormChange={forgotPasswordForm.handleFormChange}
      actions={FORGOT_RESET_PASSWORD_ACTIONS}
    />
  );
};
