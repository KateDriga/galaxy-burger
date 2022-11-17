import { FC, RefObject, useRef } from 'react';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import { AppDispatch } from '../../services/store';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { selectBurgerIngredientById } from '../../services/selectors/ingredients';
import { changeIngredientsOrder } from '../../services/slices/constructor';
import { removeIngredientFromConstructor } from '../../services/thunks/constructor';
import { BUN_INGREDIENT_PLACEHOLDER } from '../../utils/const-variables/ingredient-variables';
import {
  DragNDropTypes,
  TCollectedProps,
  TConstructorDragObject,
  TDropResult,
} from '../../utils/ts-types/drag-n-drop-types';
import {
  IBurgerIngredient,
  IngredientTypesEnum,
} from '../../utils/ts-types/ingredient-types';
import constructorIngredientStyles from './constructor-ingredient.module.css';
import cn from 'classnames';

interface IConstructorIngredient {
  readonly id: string;
  readonly index: number;
  readonly elType?: 'top' | 'bottom';
  readonly extraText?: string;
}

export const ConstructorIngredient: FC<IConstructorIngredient> = ({
  id,
  index,
  elType,
  extraText = '',
}) => {
  const ingredient: IBurgerIngredient =
    useAppSelector(state => selectBurgerIngredientById(state, id)) ||
    BUN_INGREDIENT_PLACEHOLDER;
  const isBunIng: boolean = ingredient.type === IngredientTypesEnum.BUN;

  const ref: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const dispatch: AppDispatch = useAppDispatch();

  const removeIngredient = (): void => {
    if (!isBunIng) {
      dispatch(removeIngredientFromConstructor(index));
    }
  };

  const [{ opacity }, dragRef] = useDrag<
    TConstructorDragObject,
    TDropResult,
    TCollectedProps
  >({
    type: DragNDropTypes.CONSTRUCTOR,
    item: { index },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0 : 1,
    }),
  });

  const [, dropTarget] = useDrop<
    TConstructorDragObject,
    TDropResult,
    TCollectedProps
  >({
    accept: DragNDropTypes.CONSTRUCTOR,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex: number = item.index;
      const hoverIndex: number = index;
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoveredRect: DOMRect = ref.current.getBoundingClientRect();
      const hoverMiddleY: number = (hoveredRect.bottom - hoveredRect.top) / 2;
      const mousePosition: XYCoord | null = monitor.getClientOffset();
      const hoverClientY = (mousePosition?.y ?? 0) - hoveredRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      dispatch(
        changeIngredientsOrder({
          oldIndex: dragIndex,
          newIndex: hoverIndex,
        })
      );
      item.index = hoverIndex;
    },
  });

  dragRef(dropTarget(ref));

  return (
    <div
      style={{ opacity }}
      ref={!isBunIng ? ref : null}
      className={constructorIngredientStyles.constructor_element_row}
    >
      {!isBunIng && (
        <div style={{ cursor: 'pointer' }}>
          <DragIcon type="primary" />
        </div>
      )}
      <div
        className={cn(constructorIngredientStyles.constructor_element, {
          'pr-5': isBunIng,
        })}
      >
        <ConstructorElement
          type={elType}
          isLocked={isBunIng}
          text={`${ingredient.name} ${extraText}`}
          price={ingredient.price}
          thumbnail={ingredient.image_mobile}
          handleClose={removeIngredient}
        />
      </div>
    </div>
  );
};
