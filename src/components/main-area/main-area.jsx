import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import mainAreaStyles from './main-area.module.css';
import cn from 'classnames';

export const MainArea = () => {
  return (
    <main className={cn(mainAreaStyles.main_area, 'p-10')}>
      <div className={mainAreaStyles.section_container}>
        <DndProvider backend={HTML5Backend}>
          <section className={mainAreaStyles.section}>
            <h2 className="text text_type_main-large pb-5">Соберите бургер</h2>
            <BurgerIngredients />
          </section>
          <section className={cn(mainAreaStyles.section, 'pt-15')}>
            <BurgerConstructor />
          </section>
        </DndProvider>
      </div>
    </main>
  );
};
