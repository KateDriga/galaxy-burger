import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { selectBurgerIngredientById } from '../../services/selectors/ingredients';
import { changeIngredientsOrder } from '../../services/slices/constructor';
import { removeIngredientFromConstructor } from '../../services/thunks/constructor';
import { BUN_INGREDIENT_PLACEHOLDER } from '../../utils/appConstVariables';
import constructorIngredientStyles from './constructor-ingredient.module.css';
import cn from 'classnames';
import PropTypes from 'prop-types';

export const ConstructorIngredient = ({
  id,
  index,
  elType,
  extraText = '',
}) => {
  const ingredient =
    useSelector(state => selectBurgerIngredientById(state, id)) ||
    BUN_INGREDIENT_PLACEHOLDER;
  const isBunIng = ingredient.type === 'bun';

  const ref = useRef(null);
  const dispatch = useDispatch();

  const removeIngredient = () => {
    if (!isBunIng) {
      dispatch(removeIngredientFromConstructor(id, index));
    }
  };

  const [{ opacity }, dragRef] = useDrag({
    type: 'constructor',
    item: { id, index },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0 : 1,
    }),
  });

  const [, dropTarget] = useDrop({
    accept: 'constructor',
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoveredRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
      const mousePosition = monitor.getClientOffset();
      const hoverClientY = mousePosition.y - hoveredRect.top;

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

ConstructorIngredient.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number,
  elType: PropTypes.oneOf(['top', 'bottom']),
  extraText: PropTypes.string,
};
