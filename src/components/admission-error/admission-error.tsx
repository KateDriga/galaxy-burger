import { FC } from 'react';
import { InfoIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import admissionErrorStyles from './admission-error.module.css';

export const AdmissionError: FC<{ readonly errorText: string }> = ({ errorText }) => {
  return (
    <div className={admissionErrorStyles.error}>
      <div>
        <InfoIcon type="error" />
      </div>
      <p className="text text_type_main-default">{errorText}</p>
    </div>
  );
};
