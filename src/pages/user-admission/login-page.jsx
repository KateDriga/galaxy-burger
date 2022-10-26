import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormInputs } from '../../hooks/useFormInputs';
import { AdmissionForm } from '../../components/admission-form/admission-form';
import {
  FORM_INPUTS,
  LOGIN_ACTIONS,
} from '../../utils/const-variables/form-variables';
import { selectUserLogInState } from '../../services/selectors/user-admission';
import { userLogin } from '../../services/thunks/user-admission';
import { clearUserLogInErrorMessage } from '../../services/slices/user-admission';
import { Loader } from '../../components/loader/loader';

export const LoginPage = () => {
  const loginForm = useFormInputs({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, errorMessage } = useSelector(selectUserLogInState);

  const emailInput = {
    ...FORM_INPUTS.email,
    value: loginForm.form.email,
  };

  const passwordInput = {
    ...FORM_INPUTS.password,
    value: loginForm.form.password,
  };

  const handleButtonClick = e => {
    e.preventDefault();
    dispatch(
      userLogin(loginForm.form.email, loginForm.form.password, navigate)
    );
  };

  const handleCloseModal = () => dispatch(clearUserLogInErrorMessage());

  return isLoading ? (
    <Loader />
  ) : (
    <div className="pt-30">
      <AdmissionForm
        title="Вход"
        inputs={[emailInput, passwordInput]}
        buttonInfo={{ title: 'Войти', onClick: handleButtonClick }}
        onFormChange={loginForm.handleFormChange}
        actions={LOGIN_ACTIONS}
        errorInfo={{ errorMessage, handleCloseModal }}
      />
    </div>
  );
};
