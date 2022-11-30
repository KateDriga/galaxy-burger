import { FC } from 'react';
import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAppSelector } from '../../hooks/useStore';
import { selectBurgerIngredientsState } from '../../services/selectors/ingredients';
import { ErrorMessage } from '../../components/error-message/error-message';
import { Loader } from '../../components/loader/loader';
import { selectUserLogoutState } from '../../services/selectors/user-admission';
import {
  IFetchState,
  IFetchUserAdmissionState,
} from '../../utils/ts-types/fetch-state-types';
import mainAreaCommonStyles from '../common-styles/main-area.module.css';
import cn from 'classnames';

export const IngredientsConstructorPage: FC = () => {
  const { isLoading, isFailed }: IFetchState = useAppSelector(
    selectBurgerIngredientsState
  );
  const { isLoading: isLogoutLoading }: IFetchUserAdmissionState =
    useAppSelector(selectUserLogoutState);

  return isFailed ? (
    <ErrorMessage />
  ) : isLoading || isLogoutLoading ? (
    <Loader />
  ) : (
    <main className={cn(mainAreaCommonStyles.main_area, 'p-10')}>
      <div className={mainAreaCommonStyles.layout}>
        <h2 className="text text_type_main-large pb-5">Соберите бургер</h2>
        <div className={mainAreaCommonStyles.section_container}>
          <DndProvider backend={HTML5Backend}>
            <section className={mainAreaCommonStyles.section}>
              <BurgerIngredients />
            </section>
            <section className={mainAreaCommonStyles.section}>
              <BurgerConstructor />
            </section>
          </DndProvider>
        </div>
      </div>
    </main>
  );
};
