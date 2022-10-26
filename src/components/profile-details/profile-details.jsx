import { AdmissionForm } from '../admission-form/admission-form';
import { useFormInputs } from '../../hooks/useFormInputs';
import { FORM_INPUTS } from '../../utils/const-variables/form-variables';
import { useSelector } from 'react-redux';
import { selectUserPersonalInfo } from '../../services/selectors/user-profile';

export const ProfileDetails = () => {
  const { name, email, password } = useSelector(selectUserPersonalInfo);
  const profileForm = useFormInputs({
    name: name ?? '',
    email: email ?? '',
    password: password ?? '',
  });

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

  const handleButtonClick = e => {
    e.preventDefault();
  };

  return (
    <AdmissionForm
      inputs={[nameInput, emailInput, passwordInput]}
      buttonInfo={{ title: 'Сохранить', onClick: handleButtonClick }}
      onFormChange={profileForm.handleFormChange}
    />
  );
};
