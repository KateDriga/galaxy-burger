import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormInputs } from '../../hooks/useFormInputs';
import { AdmissionForm } from '../../components/admission-form/admission-form';
import {
  FORM_INPUTS,
  REGISTER_ACTIONS,
} from '../../utils/const-variables/form-variables';
import { selectRegisterUserState } from '../../services/selectors/user-admission';
import { clearRegisterUserErrorMessage } from '../../services/slices/user-admission';
import { Loader } from '../../components/loader/loader';
import { registerNewUser } from '../../services/thunks/user-admission';

export const RegisterPage = () => {
  const registerForm = useFormInputs({ name: '', email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, errorMessage } = useSelector(selectRegisterUserState);

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

  const handleButtonClick = e => {
    e.preventDefault();
    dispatch(
      registerNewUser(
        registerForm.form.email,
        registerForm.form.password,
        registerForm.form.name,
        navigate
      )
    );
  };

  const handleCloseModal = () => dispatch(clearRegisterUserErrorMessage());

  return isLoading ? (
    <Loader />
  ) : (
    <div className="pt-30">
      <AdmissionForm
        title="Регистрация"
        inputs={[nameInput, emailInput, passwordInput]}
        buttonInfo={{ title: 'Зарегистрироваться', onClick: handleButtonClick }}
        onFormChange={registerForm.handleFormChange}
        actions={REGISTER_ACTIONS}
        errorInfo={{ errorMessage, handleCloseModal }}
      />
    </div>
  );
};
