import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { AdmissionForm } from '../admission-form/admission-form';
import { useFormInputs } from '../../hooks/useFormInputs';
import { FORM_INPUTS } from '../../utils/const-variables/form-variables';
import { useSelector } from 'react-redux';
import { selectUserPersonalInfo } from '../../services/selectors/user-profile';
import { getUserPersonalInfo } from '../../services/thunks/user-profile';
import { clearPersonalInfoErrorMessage } from '../../services/slices/user-profile';
import { Loader } from '../loader/loader';
import { selectUpdateUserState } from '../../services/selectors/user-admission';
import { AdmissionError } from '../admission-error/admission-error';
import { Modal } from '../modal/modal';
import { clearUserUpdateErrorMessage } from '../../services/slices/user-admission';
import { updateUserPersonalInfo } from '../../services/thunks/user-admission';

export const ProfileDetails = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserPersonalInfo());
  }, [dispatch]);

  const { name, email, isLoading, errorMessage } = useSelector(
    selectUserPersonalInfo
  );
  const { isLoading: isLoadingUpdate, errorMessage: errorMessageUpdate } =
    useSelector(selectUpdateUserState);

  const profileForm = useFormInputs({ name, email, password: '' });

  const formInputs = useMemo(() => {
    const nameInput = {
      ...FORM_INPUTS.name,
      value: profileForm.form.name,
      icon: 'EditIcon',
    };
    const emailInput = {
      ...FORM_INPUTS.email,
      value: profileForm.form.email,
      icon: 'EditIcon',
    };
    const passwordInput = {
      ...FORM_INPUTS.password,
      value: profileForm.form.password,
      icon: 'EditIcon',
    };
    return [nameInput, emailInput, passwordInput];
  }, [
    profileForm.form.name,
    profileForm.form.email,
    profileForm.form.password,
  ]);

  const handleUpdatePersonInfo = e => {
    e.preventDefault();
    dispatch(
      updateUserPersonalInfo(
        profileForm.form.name,
        profileForm.form.email,
        profileForm.form.password
      )
    );
    profileForm.setForm({ name, email, password: '' });
  };

  const handleCancelEdit = e => {
    e.preventDefault();
    profileForm.setForm({ name, email, password: '' });
  };

  const handleCloseModal = () => dispatch(clearPersonalInfoErrorMessage());

  return isLoading || isLoadingUpdate ? (
    <Loader />
  ) : (
    <>
      <AdmissionForm
        inputs={formInputs}
        buttons={[
          { title: 'Отменить', onClick: handleCancelEdit },
          { title: 'Сохранить', onClick: handleUpdatePersonInfo },
        ]}
        onFormChange={profileForm.handleFormChange}
        errorInfo={{ errorMessage, handleCloseModal }}
      />
      {errorMessageUpdate && (
        <Modal onClose={() => dispatch(clearUserUpdateErrorMessage)} title="">
          <AdmissionError errorText={errorMessageUpdate} />
        </Modal>
      )}
    </>
  );
};
