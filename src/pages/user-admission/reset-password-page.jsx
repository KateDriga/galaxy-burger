import { useFormInputs } from '../../hooks/useFormInputs';
import { AdmissionForm } from '../../components/admission-form/admission-form';
import {
  FORGOT_RESET_PASSWORD_ACTIONS,
  FORM_INPUTS,
} from '../../utils/const-variables/form-variables';

export const ResetPasswordPage = () => {
  const resetPasswordForm = useFormInputs({ password: '', code: '' });

  const emailInput = {
    ...FORM_INPUTS.password,
    value: resetPasswordForm.form.password,
    placeholder: 'Введите новый пароль',
  };

  const codeInput = { ...FORM_INPUTS.code, value: resetPasswordForm.form.code };

  return (
    <AdmissionForm
      title="Восстановление пароля"
      inputs={[emailInput, codeInput]}
      buttonName="Сохранить"
      onFormChange={resetPasswordForm.handleFormChange}
      actions={FORGOT_RESET_PASSWORD_ACTIONS}
    />
  );
};
