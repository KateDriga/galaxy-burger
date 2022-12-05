import { FC, useMemo } from 'react';
import { Location, useLocation, useParams } from 'react-router-dom';
import { IOrder, IOrderIngredient } from '../../utils/ts-types/order-types';
import {
  FeedOrderDate,
  FeedOrderImage,
  FeedOrderNumber,
  FeedOrderTitle,
} from '../feed-order-common/feed-order-common';
import { useAppSelector } from '../../hooks/useStore';
import { selectOrderIngredientDetails } from '../../services/selectors/ingredients';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { selectFeedOrderById } from '../../services/selectors/feed';
import { FeedTypesEnum } from '../../utils/ts-types/feed-types';
import { NotFoundPage } from '../../pages/not-found-page/not-found-page';
import { useIsProfileOrderFeed } from '../../hooks/useIsProfileFeed';
import feedOrderDetailsStyles from './feed-order-details.module.css';
import cn from 'classnames';

export const FeedOrderDetails: FC = () => {
  const location: Location = useLocation();
  const background: Location | undefined = location.state?.background;
  const { id } = useParams<{ id: string }>();
  const isProfileOrderFeed: boolean = useIsProfileOrderFeed();

  const order: IOrder | null = useAppSelector(state =>
    selectFeedOrderById(
      state,
      isProfileOrderFeed ? FeedTypesEnum.PROFILE : FeedTypesEnum.ALL,
      id!
    )
  );

  const ingredientDetails: Array<IOrderIngredient> | null = useAppSelector(
    state => selectOrderIngredientDetails(state, order?.ingredients)
  );

  const totalPrice: number = useMemo(() => {
    return ingredientDetails
      ? ingredientDetails.reduce(
          (acc: number, ing: IOrderIngredient) => acc + ing.count * ing.price,
          0
        )
      : 0;
  }, [ingredientDetails]);

  return !order ? (
    <NotFoundPage />
  ) : (
    <div
      className={cn({
        [feedOrderDetailsStyles.order_details_page]: !background,
      })}
    >
      <div className={feedOrderDetailsStyles.order_details}>
        <div className={feedOrderDetailsStyles.order_header}>
          <FeedOrderNumber orderNumber={order.number} />
        </div>
        <div className={feedOrderDetailsStyles.order_title}>
          <FeedOrderTitle name={order.name} status={order.status} />
        </div>
        <div className={cn(feedOrderDetailsStyles.order_ingredients, 'pt-5')}>
          <h3 className="text text_type_main-medium">Состав:</h3>
          <div
            className={cn(
              feedOrderDetailsStyles.order_ingredient_details,
              'custom-scroll'
            )}
          >
            {ingredientDetails?.map((ing: IOrderIngredient) => (
              <div
                key={ing.id}
                className={feedOrderDetailsStyles.order_ingredient}
              >
                <FeedOrderImage imgSrc={ing.image} shiftIndex={0} />
                <h4 className="text text_type_main-small">{ing.name}</h4>
                <div className={feedOrderDetailsStyles.ingredient_price}>
                  <span className="text text_type_digits-default">{`${ing.count} x ${ing.price}`}</span>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={feedOrderDetailsStyles.card_footer}>
          <FeedOrderDate date={order.createdAt} />
          <div className={feedOrderDetailsStyles.total_price}>
            <span className="text text_type_digits-default">{totalPrice}</span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
};
