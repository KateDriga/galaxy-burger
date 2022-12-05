import { FC } from 'react';
import { IOrder } from '../../utils/ts-types/order-types';
import { useAppSelector } from '../../hooks/useStore';
import { selectOrderImagesByIngIds } from '../../services/selectors/ingredients';
import { selectOrderPrice } from '../../services/selectors/order';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { MAX_CARD_INGREDIENTS } from '../../utils/const-variables/order-variables';
import {
  FeedOrderDate,
  FeedOrderImage,
  FeedOrderNumber,
  FeedOrderTitle,
} from '../feed-order-common/feed-order-common';
import { Link, Location, useLocation } from 'react-router-dom';
import { NavRoutesEnum } from '../../utils/ts-types/route-types';
import { useIsProfileFeed } from '../../hooks/useIsProfileFeed';
import feedOrdersCardStyles from './feed-orders-card.module.css';
import cn from 'classnames';

export const FeedOrdersCard: FC<IOrder> = order => {
  const location: Location = useLocation();
  const isProfileFeed: boolean = useIsProfileFeed();

  const images: Array<string> = useAppSelector(state =>
    selectOrderImagesByIngIds(state, order.ingredients)
  );
  const cardImages = images.slice(0, MAX_CARD_INGREDIENTS);

  const price: number = useAppSelector(state =>
    selectOrderPrice(state, order.ingredients)
  );

  return (
    <Link
      className={cn(feedOrdersCardStyles.card, 'p-6')}
      to={`${(isProfileFeed
        ? NavRoutesEnum.PROFILE_ORDER_ROUTE
        : NavRoutesEnum.FEED_ORDER_ROUTE
      ).replace(':id', order._id)}`}
      state={{ background: location }}
    >
      <div className={feedOrdersCardStyles.card_header}>
        <FeedOrderNumber orderNumber={order.number} />
        <FeedOrderDate date={order.createdAt} />
      </div>
      <div className={feedOrdersCardStyles.order_title}>
        <FeedOrderTitle
          name={order.name}
          status={isProfileFeed ? order.status : undefined}
        />
      </div>
      <div className={feedOrdersCardStyles.order_details}>
        <div className={feedOrdersCardStyles.images}>
          {cardImages.map((img: string, idx: number) => (
            // order of images is stable
            <FeedOrderImage
              key={idx}
              imgSrc={img}
              shiftIndex={idx}
              extraText={
                idx + 1 === MAX_CARD_INGREDIENTS &&
                images.length > MAX_CARD_INGREDIENTS
                  ? `+${images.length - (idx + 1)}`
                  : undefined
              }
            />
          ))}
        </div>
        <div className={feedOrdersCardStyles.price}>
          <span className="text text_type_digits-default">{price}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  );
};
