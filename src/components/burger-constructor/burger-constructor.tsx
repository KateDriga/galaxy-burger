import { FC } from 'react';
import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorIngredient } from '../constructor-ingredient/constructor-ingredient';
import { Loader } from '../loader/loader';
import { useDrop } from 'react-dnd';
import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import { AppDispatch } from '../../services/store';
import {
  selectConstructorBunIngredient,
  selectConstructorMiddleIngredientIds,
} from '../../services/selectors/constructor';
import { selectTotalPrice } from '../../services/selectors/ingredients';
import { onNewOrder } from '../../services/thunks/order';
import { addIngredientToConstructor } from '../../services/thunks/constructor';
import { selectOrderState } from '../../services/selectors/order';
import { BUN_INGREDIENT_PLACEHOLDER } from '../../utils/const-variables/ingredient-variables';
import { selectIsLoggedIn } from '../../services/selectors/user-admission';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { NavRoutesEnum } from '../../utils/ts-types/route-types';
import {
  IBurgerIngredient,
  IConstructorId,
} from '../../utils/ts-types/ingredient-types';
import {
  DragNDropTypes,
  TCollectedProps,
  TDropResult,
  TIngredientDragObject,
} from '../../utils/ts-types/drag-n-drop-types';
import { IFetchState } from '../../utils/ts-types/fetch-state-types';
import burgerConstructorStyles from './burger-constructor.module.css';
import cn from 'classnames';

export const BurgerConstructor: FC = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();

  const { isLoading: isOrderLoading }: IFetchState =
    useAppSelector(selectOrderState);

  const bunIngredient: IBurgerIngredient =
    useAppSelector(selectConstructorBunIngredient) ||
    BUN_INGREDIENT_PLACEHOLDER;
  const midIngredientsIds: Array<IConstructorId> =
    useAppSelector(selectConstructorMiddleIngredientIds) || [];
  const totalPrice: number = useAppSelector(selectTotalPrice) ?? 0;

  const isLoggedIn: boolean = useAppSelector(selectIsLoggedIn);

  const [, dropTarget] = useDrop<
    TIngredientDragObject,
    TDropResult,
    TCollectedProps
  >({
    accept: DragNDropTypes.INGREDIENT,
    drop(item: { id: string }) {
      dispatch(addIngredientToConstructor(item.id));
    },
  });

  const placeOrder = (): void => {
    isLoggedIn ? dispatch(onNewOrder()) : navigate(NavRoutesEnum.LOGIN_ROUTE);
  };

  return isOrderLoading ? (
    <Loader />
  ) : (
    <div
      className={cn(
        burgerConstructorStyles.burger_constructor,
        'custom-scroll'
      )}
      ref={dropTarget}
    >
      <ConstructorIngredient
        id={bunIngredient._id}
        index={0}
        elType="top"
        extraText="(верх)"
      />
      <div
        className={cn(
          burgerConstructorStyles.ingredients_middle,
          'custom-scroll',
          'p-2'
        )}
      >
        {midIngredientsIds.map((id, index) => (
          <ConstructorIngredient
            key={id.constructorId}
            id={id.ingredientId}
            index={index}
          />
        ))}
      </div>
      <ConstructorIngredient
        id={bunIngredient._id}
        index={0}
        elType="bottom"
        extraText="(низ)"
      />
      <div
        className={cn(
          burgerConstructorStyles.order_details,
          'pt-10 pr-7 pb-15'
        )}
      >
        <div className={burgerConstructorStyles.order_details_price}>
          <span className="text text_type_digits-medium">{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          type="primary"
          size="large"
          htmlType="button"
          onClick={placeOrder}
          disabled={!totalPrice}
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};
