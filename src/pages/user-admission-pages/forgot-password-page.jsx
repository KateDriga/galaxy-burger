import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormInputs } from '../../hooks/useFormInputs';
import {
  FORM_INPUTS,
  FORGOT_RESET_PASSWORD_ACTIONS,
} from '../../utils/const-variables/form-variables';
import { AdmissionForm } from '../../components/admission-form/admission-form';
import { Loader } from '../../components/loader/loader';
import { clearPasswordResetErrorMessage } from '../../services/slices/user-admission';
import { selectUserPasswordResetState } from '../../services/selectors/user-admission';
import { onPasswordForgot } from '../../services/thunks/user-admission';
import { RESET_PASSWORD_ROUTE } from '../../utils/const-variables/route-variables';

export const ForgotPasswordPage = () => {
  const forgotPasswordForm = useFormInputs({ email: '' });
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoading, errorMessage } = useSelector(selectUserPasswordResetState);

  const emailInput = {
    ...FORM_INPUTS.email,
    value: forgotPasswordForm.form.email,
    placeholder: 'Укажите e-mail',
  };

  const handleResetPassword = e => {
    e.preventDefault();
    dispatch(onPasswordForgot(forgotPasswordForm.form)).then(res => {
      if (res.payload.success) {
        navigate(RESET_PASSWORD_ROUTE, { state: { from: location } });
      }
    });
  };

  const handleCloseModal = () => dispatch(clearPasswordResetErrorMessage());

  return isLoading ? (
    <Loader />
  ) : (
    <div className="pt-30">
      <AdmissionForm
        title="Восстановление пароля"
        inputs={[emailInput]}
        buttons={[{ title: 'Восстановить', onClick: handleResetPassword }]}
        onFormChange={forgotPasswordForm.handleFormChange}
        actions={FORGOT_RESET_PASSWORD_ACTIONS}
        errors={[{ errorMessage, handleCloseModal }]}
      />
    </div>
  );
};
