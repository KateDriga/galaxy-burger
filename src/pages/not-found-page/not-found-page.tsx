import { FC } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { NavRoutesEnum } from '../../utils/ts-types/route-types';
import notFoundImage from '../../images/not-found.png';
import notFoundPageStyles from './not-found-page.module.css';

export const NotFoundPage: FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const moveToHomePage = (): void =>
    navigate(NavRoutesEnum.HOME_ROUTE, { replace: true });

  return (
    <div className={notFoundPageStyles.content}>
      <img
        className={notFoundPageStyles.image}
        src={notFoundImage}
        alt="Not found"
      />
      <h2 className="text text_type_main-medium">
        {'Страница не найдена \u{1F63F}'}
      </h2>
      <Button htmlType="button" type="secondary" onClick={moveToHomePage}>
        Перейти на главную
      </Button>
    </div>
  );
};
