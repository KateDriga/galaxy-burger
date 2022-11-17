import { FC, FormEvent } from 'react';
import {
  Location,
  NavigateFunction,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import { AppDispatch } from '../../services/store';
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
import { NavRoutesEnum } from '../../utils/ts-types/route-types';
import { IFormInput, IUseFormInputs } from '../../utils/ts-types/form-types';
import { IFetchUserAdmissionState } from '../../utils/ts-types/fetch-state-types';
import { PayloadAction } from '@reduxjs/toolkit';
import { IToken } from '../../utils/ts-types/api-types';

export const LoginPage: FC = () => {
  const loginForm: IUseFormInputs = useFormInputs({ email: '', password: '' });
  const dispatch: AppDispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();
  const location: Location = useLocation();
  const { isLoading, errorMessage }: IFetchUserAdmissionState =
    useAppSelector(selectUserLogInState);

  const emailInput: IFormInput = {
    ...FORM_INPUTS.email,
    value: loginForm.form.email,
  };

  const passwordInput: IFormInput = {
    ...FORM_INPUTS.password,
    value: loginForm.form.password,
  };

  const handleUserLogin = (e: FormEvent): void => {
    e.preventDefault();
    dispatch(onLogin(loginForm.form)).then(
      (res: PayloadAction<IToken | string | undefined>) => {
        if (typeof res.payload !== 'string' && res.payload?.success) {
          navigate(location.state?.from ?? NavRoutesEnum.HOME_ROUTE);
        }
      }
    );
  };

  const handleCloseModal = (): PayloadAction =>
    dispatch(clearUserLogInErrorMessage());

  return isLoading ? (
    <Loader />
  ) : (
    <div className="pt-30">
      <AdmissionForm
        title="Вход"
        inputs={[emailInput, passwordInput]}
        buttons={[{ title: 'Войти' }]}
        formEvents={{
          onFormChange: loginForm.handleFormChange,
          onFormSubmit: handleUserLogin,
        }}
        actions={LOGIN_ACTIONS}
        errors={[{ errorMessage, handleCloseModal }]}
      />
    </div>
  );
};
