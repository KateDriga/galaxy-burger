import { FC, FormEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import { AppDispatch } from '../../services/store';
import { AdmissionForm } from '../admission-form/admission-form';
import { useFormInputs } from '../../hooks/useFormInputs';
import { FORM_INPUTS } from '../../utils/const-variables/form-variables';
import { selectUserPersonalInfo } from '../../services/selectors/user-profile';
import { clearGetUserErrorMessage } from '../../services/slices/user-admission';
import { Loader } from '../loader/loader';
import {
  selectGetUserState,
  selectUpdateUserState,
} from '../../services/selectors/user-admission';
import { clearUserUpdateErrorMessage } from '../../services/slices/user-admission';
import { onUserInfoUpdate } from '../../services/thunks/user-admission';
import { onGetUserInfo } from '../../services/thunks/user-admission';
import {
  IFormButton,
  IFormError,
  IFormEvents,
  IFormInput,
  IUseFormInputs,
} from '../../utils/ts-types/form-types';
import { IFetchUserAdmissionState } from '../../utils/ts-types/fetch-state-types';
import { PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../utils/ts-types/user-types';

export const ProfileDetails: FC = () => {
  const dispatch: AppDispatch = useAppDispatch();

  const { name, email }: IUser = useAppSelector(selectUserPersonalInfo);
  const {
    isLoading,
    errorMessage: errorMessageGetInfo,
  }: IFetchUserAdmissionState = useAppSelector(selectGetUserState);
  const {
    isLoading: isLoadingUpdate,
    errorMessage: errorMessageUpdateInfo,
  }: IFetchUserAdmissionState = useAppSelector(selectUpdateUserState);

  useEffect(() => {
    if (!name || !email) {
      dispatch(onGetUserInfo());
    }
  }, [dispatch, name, email]);

  const profileForm: IUseFormInputs = useFormInputs({
    name: name ?? '',
    email: email ?? '',
    password: '',
  });

  const getFormInputs = (): Array<IFormInput> => {
    const nameInput: IFormInput = {
      ...FORM_INPUTS.name,
      value: profileForm.form.name,
      icon: 'EditIcon',
    };
    const emailInput: IFormInput = {
      ...FORM_INPUTS.email,
      value: profileForm.form.email,
      icon: 'EditIcon',
    };
    const passwordInput: IFormInput = {
      ...FORM_INPUTS.password,
      value: profileForm.form.password,
      icon: 'EditIcon',
    };
    return [nameInput, emailInput, passwordInput];
  };

  const handleCancelEdit = (e: FormEvent): void => {
    e.preventDefault();
    profileForm.setForm({ name: name ?? '', email: email ?? '', password: '' });
  };

  const handleUpdatePersonInfo = (e: FormEvent): void => {
    e.preventDefault();
    dispatch(onUserInfoUpdate(profileForm.form));
    profileForm.setForm({ name: name ?? '', email: email ?? '', password: '' });
  };

  const getFormButtons = (): Array<IFormButton> | undefined => {
    const isFormEdited: boolean =
      profileForm.form.name !== name ||
      profileForm.form.email !== email ||
      profileForm.form.password !== '';
    return isFormEdited
      ? [
          {
            title: 'Отмена',
            type: 'secondary',
            htmlType: 'reset',
          },
          {
            title: 'Сохранить',
            type: 'primary',
            htmlType: 'submit',
          },
        ]
      : undefined;
  };

  const getFormEvents = (): IFormEvents => {
    return {
      onFormChange: profileForm.handleFormChange,
      onFormSubmit: handleUpdatePersonInfo,
      onFormReset: handleCancelEdit,
    };
  };

  const getErrors = (): Array<IFormError> => {
    const handleCloseModalGetInfo = (): PayloadAction =>
      dispatch(clearGetUserErrorMessage());
    const handleCloseModalUpdateInfo = (): PayloadAction =>
      dispatch(clearUserUpdateErrorMessage());
    return [
      {
        errorMessage: errorMessageGetInfo,
        handleCloseModal: handleCloseModalGetInfo,
      },
      {
        errorMessage: errorMessageUpdateInfo,
        handleCloseModal: handleCloseModalUpdateInfo,
      },
    ];
  };

  return isLoading || isLoadingUpdate ? (
    <Loader />
  ) : (
    <AdmissionForm
      inputs={getFormInputs()}
      buttons={getFormButtons()}
      formEvents={getFormEvents()}
      errors={getErrors()}
    />
  );
};
