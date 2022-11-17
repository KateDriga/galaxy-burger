import { FC } from 'react';
import errorMessageStyles from './error-message.module.css';

export const ErrorMessage: FC = () => {
  return (
    <div className={errorMessageStyles.error}>
      <h1 className="text">Что-то пошло не так :(</h1>
      <p className="text text_type_main-default">
        Пожалуйста, перезагрузите страницу или зайдите позднее.
      </p>
    </div>
  );
};
