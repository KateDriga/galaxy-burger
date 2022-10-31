import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormInputs } from '../../hooks/useFormInputs';
import { AdmissionForm } from '../../components/admission-form/admission-form';
import {
  FORGOT_RESET_PASSWORD_ACTIONS,
  FORM_INPUTS,
} from '../../utils/const-variables/form-variables';
import { selectSaveNewPasswordState } from '../../services/selectors/user-admission';
import { onPasswordReset } from '../../services/thunks/user-admission';
import { clearSavePasswordErrorMessage } from '../../services/slices/user-admission';
import { Loader } from '../../components/loader/loader';
import {
  FORGOT_PASSWORD_ROUTE,
  LOGIN_ROUTE,
} from '../../utils/const-variables/route-variables';
import { useEffect } from 'react';

export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const fromPath = location.state?.from?.pathname;

  useEffect(() => {
    if (location.state?.from?.pathname !== FORGOT_PASSWORD_ROUTE) {
      navigate(FORGOT_PASSWORD_ROUTE, { replace: true });
    }
    // dependency is included (fromPath)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, fromPath]);

  const resetPasswordForm = useFormInputs({ password: '', code: '' });
  const dispatch = useDispatch();

  const { isLoading, errorMessage } = useSelector(selectSaveNewPasswordState);

  const emailInput = {
    ...FORM_INPUTS.password,
    value: resetPasswordForm.form.password,
    placeholder: 'Введите новый пароль',
  };

  const codeInput = { ...FORM_INPUTS.code, value: resetPasswordForm.form.code };

  const handleSavePassword = e => {
    e.preventDefault();
    dispatch(onPasswordReset(resetPasswordForm.form)).then(res => {
      if (res.payload.success) {
        navigate(LOGIN_ROUTE);
      }
    });
  };

  const handleCloseModal = () => dispatch(clearSavePasswordErrorMessage());

  return isLoading ? (
    <Loader />
  ) : (
    <div className="pt-30">
      <AdmissionForm
        title="Восстановление пароля"
        inputs={[emailInput, codeInput]}
        buttons={[{ title: 'Сохранить', onClick: handleSavePassword }]}
        onFormChange={resetPasswordForm.handleFormChange}
        actions={FORGOT_RESET_PASSWORD_ACTIONS}
        errors={[{ errorMessage, handleCloseModal }]}
      />
    </div>
  );
};
