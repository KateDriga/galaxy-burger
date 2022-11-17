import { FC } from 'react';
import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector } from 'react-redux';
import { selectBurgerIngredientsState } from '../../services/selectors/ingredients';
import { ErrorMessage } from '../../components/error-message/error-message';
import { Loader } from '../../components/loader/loader';
import { selectUserLogoutState } from '../../services/selectors/user-admission';
import {
  IFetchState,
  IFetchUserAdmissionState,
} from '../../utils/ts-types/fetch-state-types';
import ingredientsConstructorPageStyles from './ingredients-constructor-page.module.css';
import cn from 'classnames';

export const IngredientsConstructorPage: FC = () => {
  const { isLoading, isFailed }: IFetchState = useSelector(
    selectBurgerIngredientsState
  );
  const { isLoading: isLogoutLoading }: IFetchUserAdmissionState = useSelector(
    selectUserLogoutState
  );

  return isFailed ? (
    <ErrorMessage />
  ) : isLoading || isLogoutLoading ? (
    <Loader />
  ) : (
    <main className={cn(ingredientsConstructorPageStyles.main_area, 'p-10')}>
      <div className={ingredientsConstructorPageStyles.section_container}>
        <DndProvider backend={HTML5Backend}>
          <section className={ingredientsConstructorPageStyles.section}>
            <h2 className="text text_type_main-large pb-5">Соберите бургер</h2>
            <BurgerIngredients />
          </section>
          <section
            className={cn(ingredientsConstructorPageStyles.section, 'pt-15')}
          >
            <BurgerConstructor />
          </section>
        </DndProvider>
      </div>
    </main>
  );
};
