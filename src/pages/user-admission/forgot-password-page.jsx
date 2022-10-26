import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormInputs } from '../../hooks/useFormInputs';
import {
  FORM_INPUTS,
  FORGOT_RESET_PASSWORD_ACTIONS,
} from '../../utils/const-variables/form-variables';
import { AdmissionForm } from '../../components/admission-form/admission-form';
import { resetUserPassword } from '../../services/thunks/user-admission';
import { Loader } from '../../components/loader/loader';
import { clearPasswordResetErrorMessage } from '../../services/slices/user-admission';
import { selectUserPasswordResetState } from '../../services/selectors/user-admission';

export const ForgotPasswordPage = () => {
  const forgotPasswordForm = useFormInputs({ email: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, errorMessage } = useSelector(selectUserPasswordResetState);

  const emailInput = {
    ...FORM_INPUTS.email,
    value: forgotPasswordForm.form.email,
    placeholder: 'Укажите e-mail',
  };

  const handleButtonClick = e => {
    e.preventDefault();
    dispatch(resetUserPassword(forgotPasswordForm.form.email, navigate));
  };

  const handleCloseModal = () => dispatch(clearPasswordResetErrorMessage());

  return isLoading ? (
    <Loader />
  ) : (
    <div className="pt-30">
      <AdmissionForm
        title="Восстановление пароля"
        inputs={[emailInput]}
        buttonInfo={{ title: 'Восстановить', onClick: handleButtonClick }}
        onFormChange={forgotPasswordForm.handleFormChange}
        actions={FORGOT_RESET_PASSWORD_ACTIONS}
        errorInfo={{ errorMessage, handleCloseModal }}
      />
    </div>
  );
};
