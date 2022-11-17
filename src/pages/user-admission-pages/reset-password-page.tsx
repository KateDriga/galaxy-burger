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
  FORGOT_RESET_PASSWORD_ACTIONS,
  FORM_INPUTS,
} from '../../utils/const-variables/form-variables';
import { selectSaveNewPasswordState } from '../../services/selectors/user-admission';
import { onPasswordReset } from '../../services/thunks/user-admission';
import { clearSavePasswordErrorMessage } from '../../services/slices/user-admission';
import { Loader } from '../../components/loader/loader';
import { NavRoutesEnum } from '../../utils/ts-types/route-types';
import { useEffect } from 'react';
import { IFormInput, IUseFormInputs } from '../../utils/ts-types/form-types';
import { IFetchUserAdmissionState } from '../../utils/ts-types/fetch-state-types';
import { PayloadAction } from '@reduxjs/toolkit';
import { IAdmissionMessage } from '../../utils/ts-types/api-types';

export const ResetPasswordPage: FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const location: Location = useLocation();

  const fromPath: string | undefined = location.state?.from?.pathname;

  useEffect(() => {
    if (fromPath !== NavRoutesEnum.FORGOT_PASSWORD_ROUTE) {
      navigate(NavRoutesEnum.FORGOT_PASSWORD_ROUTE, { replace: true });
    }
  }, [navigate, fromPath]);

  const resetPasswordForm: IUseFormInputs = useFormInputs({
    password: '',
    code: '',
  });
  const dispatch: AppDispatch = useAppDispatch();

  const { isLoading, errorMessage }: IFetchUserAdmissionState = useAppSelector(
    selectSaveNewPasswordState
  );

  const emailInput: IFormInput = {
    ...FORM_INPUTS.password,
    value: resetPasswordForm.form.password,
    placeholder: 'Введите новый пароль',
  };

  const codeInput: IFormInput = {
    ...FORM_INPUTS.code,
    value: resetPasswordForm.form.code,
  };

  const handleSavePassword = (e: FormEvent): void => {
    e.preventDefault();
    dispatch(onPasswordReset(resetPasswordForm.form)).then(
      (res: PayloadAction<IAdmissionMessage | string | undefined>) => {
        if (typeof res.payload !== 'string' && res.payload?.success) {
          navigate(NavRoutesEnum.LOGIN_ROUTE);
        }
      }
    );
  };

  const handleCloseModal = (): PayloadAction =>
    dispatch(clearSavePasswordErrorMessage());

  return isLoading ? (
    <Loader />
  ) : (
    <div className="pt-30">
      <AdmissionForm
        title="Восстановление пароля"
        inputs={[emailInput, codeInput]}
        buttons={[{ title: 'Сохранить' }]}
        formEvents={{
          onFormChange: resetPasswordForm.handleFormChange,
          onFormSubmit: handleSavePassword,
        }}
        actions={FORGOT_RESET_PASSWORD_ACTIONS}
        errors={[{ errorMessage, handleCloseModal }]}
      />
    </div>
  );
};
