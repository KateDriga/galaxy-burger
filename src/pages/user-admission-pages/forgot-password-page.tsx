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
import {
  FORM_INPUTS,
  FORGOT_RESET_PASSWORD_ACTIONS,
} from '../../utils/const-variables/form-variables';
import { AdmissionForm } from '../../components/admission-form/admission-form';
import { Loader } from '../../components/loader/loader';
import { clearPasswordResetErrorMessage } from '../../services/slices/user-admission';
import { selectUserPasswordResetState } from '../../services/selectors/user-admission';
import { onPasswordForgot } from '../../services/thunks/user-admission';
import { NavRoutesEnum } from '../../utils/ts-types/route-types';
import { IFormInput, IUseFormInputs } from '../../utils/ts-types/form-types';
import { IFetchUserAdmissionState } from '../../utils/ts-types/fetch-state-types';
import { PayloadAction } from '@reduxjs/toolkit';
import { IAdmissionMessage } from '../../utils/ts-types/api-types';

export const ForgotPasswordPage: FC = () => {
  const forgotPasswordForm: IUseFormInputs = useFormInputs({ email: '' });
  const dispatch: AppDispatch = useAppDispatch();
  const location: Location = useLocation();
  const navigate: NavigateFunction = useNavigate();
  const { isLoading, errorMessage }: IFetchUserAdmissionState = useAppSelector(
    selectUserPasswordResetState
  );

  const emailInput: IFormInput = {
    ...FORM_INPUTS.email,
    value: forgotPasswordForm.form.email,
    placeholder: 'Укажите e-mail',
  };

  const handleResetPassword = (e: FormEvent): void => {
    e.preventDefault();
    dispatch(onPasswordForgot(forgotPasswordForm.form)).then(
      (res: PayloadAction<IAdmissionMessage | string | undefined>) => {
        if (typeof res.payload !== 'string' && res.payload?.success) {
          navigate(NavRoutesEnum.RESET_PASSWORD_ROUTE, {
            state: { from: location },
          });
        }
      }
    );
  };

  const handleCloseModal = (): PayloadAction =>
    dispatch(clearPasswordResetErrorMessage());

  return isLoading ? (
    <Loader />
  ) : (
    <div className="pt-30">
      <AdmissionForm
        title="Восстановление пароля"
        inputs={[emailInput]}
        buttons={[{ title: 'Восстановить' }]}
        formEvents={{
          onFormChange: forgotPasswordForm.handleFormChange,
          onFormSubmit: handleResetPassword,
        }}
        actions={FORGOT_RESET_PASSWORD_ACTIONS}
        errors={[{ errorMessage, handleCloseModal }]}
      />
    </div>
  );
};
