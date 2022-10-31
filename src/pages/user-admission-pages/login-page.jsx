import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormInputs } from '../../hooks/useFormInputs';
import { AdmissionForm } from '../../components/admission-form/admission-form';
import {
  FORM_INPUTS,
  LOGIN_ACTIONS,
} from '../../utils/const-variables/form-variables';
import { selectUserLogInState } from '../../services/selectors/user-admission';
import { onLogin } from '../../services/thunks/user-admission';
import { clearUserLogInErrorMessage } from '../../services/slices/user-admission';
import { Loader } from '../../components/loader/loader';
import { HOME_ROUTE } from '../../utils/const-variables/route-variables';

export const LoginPage = () => {
  const loginForm = useFormInputs({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, errorMessage } = useSelector(selectUserLogInState);

  const emailInput = {
    ...FORM_INPUTS.email,
    value: loginForm.form.email,
  };

  const passwordInput = {
    ...FORM_INPUTS.password,
    value: loginForm.form.password,
  };

  const handleUserLogin = e => {
    e.preventDefault();
    dispatch(onLogin(loginForm.form)).then(res => {
      if (res.payload.success) {
        navigate(location.state?.from ?? HOME_ROUTE);
      }
    });
  };

  const handleCloseModal = () => dispatch(clearUserLogInErrorMessage());

  return isLoading ? (
    <Loader />
  ) : (
    <div className="pt-30">
      <AdmissionForm
        title="Вход"
        inputs={[emailInput, passwordInput]}
        buttons={[{ title: 'Войти', onClick: handleUserLogin }]}
        onFormChange={loginForm.handleFormChange}
        actions={LOGIN_ACTIONS}
        errors={[{ errorMessage, handleCloseModal }]}
      />
    </div>
  );
};
