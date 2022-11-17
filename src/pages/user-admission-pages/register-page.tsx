import { FC, FormEvent } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import { AppDispatch } from '../../services/store';
import { useFormInputs } from '../../hooks/useFormInputs';
import { AdmissionForm } from '../../components/admission-form/admission-form';
import {
  FORM_INPUTS,
  REGISTER_ACTIONS,
} from '../../utils/const-variables/form-variables';
import { selectRegisterUserState } from '../../services/selectors/user-admission';
import { clearRegisterUserErrorMessage } from '../../services/slices/user-admission';
import { Loader } from '../../components/loader/loader';
import { onUserRegister } from '../../services/thunks/user-admission';
import { NavRoutesEnum } from '../../utils/ts-types/route-types';
import { IFormInput, IUseFormInputs } from '../../utils/ts-types/form-types';
import { IFetchUserAdmissionState } from '../../utils/ts-types/fetch-state-types';
import { PayloadAction } from '@reduxjs/toolkit';
import { IRegisterData } from '../../utils/ts-types/api-types';

export const RegisterPage: FC = () => {
  const registerForm: IUseFormInputs = useFormInputs({
    name: '',
    email: '',
    password: '',
  });
  const dispatch: AppDispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();
  const { isLoading, errorMessage }: IFetchUserAdmissionState = useAppSelector(
    selectRegisterUserState
  );

  const nameInput: IFormInput = {
    ...FORM_INPUTS.name,
    value: registerForm.form.name,
  };

  const emailInput: IFormInput = {
    ...FORM_INPUTS.email,
    value: registerForm.form.email,
  };

  const passwordInput: IFormInput = {
    ...FORM_INPUTS.password,
    value: registerForm.form.password,
  };

  const handleRegisterUser = (e: FormEvent): void => {
    e.preventDefault();
    dispatch(onUserRegister(registerForm.form)).then(
      (res: PayloadAction<IRegisterData | string | undefined>) => {
        if (typeof res.payload !== 'string' && res.payload?.success) {
          navigate(NavRoutesEnum.HOME_ROUTE);
        }
      }
    );
  };

  const handleCloseModal = (): PayloadAction =>
    dispatch(clearRegisterUserErrorMessage());

  return isLoading ? (
    <Loader />
  ) : (
    <div className="pt-30">
      <AdmissionForm
        title="Регистрация"
        inputs={[nameInput, emailInput, passwordInput]}
        buttons={[{ title: 'Зарегистрироваться' }]}
        formEvents={{
          onFormChange: registerForm.handleFormChange,
          onFormSubmit: handleRegisterUser,
        }}
        actions={REGISTER_ACTIONS}
        errors={[{ errorMessage, handleCloseModal }]}
      />
    </div>
  );
};
