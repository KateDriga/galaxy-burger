import {
  failLoadingPersonalInfo,
  setPersonalInfo,
  startLoadingPersonalInfo,
} from '../slices/user-profile';
import { getUserProfileInfo } from '../../utils/api/rest/auth';

export function getUserPersonalInfo() {
  return function (dispatch, getState) {
    const {
      userProfile: { personalInfo },
    } = getState();
    if (!personalInfo.name || !personalInfo.email) {
      dispatch(startLoadingPersonalInfo());
      getUserProfileInfo()
        .then(res => {
          const { name, email, password } = res.data.user;
          dispatch(setPersonalInfo({ name, email, password }));
        })
        .catch(err => {
          console.error('Unable to load personal information', err);
          dispatch(
            failLoadingPersonalInfo({
              errorText: 'Не удалось загрузить информацию о пользователе.',
            })
          );
        });
    }
  };
}
