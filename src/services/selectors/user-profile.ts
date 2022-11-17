import { RootState } from '../store';
import { IUser } from '../../utils/ts-types/user-types';

export const selectUserPersonalInfo = (state: RootState): IUser =>
  state.userProfile.personalInfo;
