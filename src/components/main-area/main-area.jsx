import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import ingredientsData from '../../utils/data.json';
import mainAreaStyles from './main-area.module.css';
import cn from 'classnames';

export const MainArea = () => {
  // test data
  const bunIng = ingredientsData[0];
  const midIngs =
    ingredientsData.length > 0 ? ingredientsData?.slice(1, -1) : null;

  return (
    <main className={cn(mainAreaStyles.main_area, 'p-10')}>
      <div className={mainAreaStyles.section_container}>
        {ingredientsData.length > 0 ? (
          <>
            <section className={mainAreaStyles.section}>
              <h2 className="text text_type_main-large pb-5">
                Соберите бургер
              </h2>
              <BurgerIngredients burgerIngredients={ingredientsData} />
            </section>
            <section className={cn(mainAreaStyles.section, 'pt-15')}>
              <BurgerConstructor
                bunIngredient={bunIng}
                midIngredients={midIngs}
              />
            </section>
          </>
        ) : (
          <p>An error occurred! Please reload later.</p>
        )}
      </div>
    </main>
  );
};
