import { FC } from 'react';
import { IOrder } from '../../utils/ts-types/order-types';
import { FeedOrdersCard } from '../feed-orders-card/feed-orders-card';
import { selectFeedOrders } from '../../services/selectors/feed';
import { FeedTypesEnum } from '../../utils/ts-types/feed-types';
import { useAppSelector } from '../../hooks/useStore';
import { useIsProfileFeed } from '../../hooks/useIsProfileFeed';
import feedOrdersListStyles from './feed-orders-list.module.css';
import cn from 'classnames';

export const FeedOrdersList: FC = () => {
  const isProfileFeed: boolean = useIsProfileFeed();

  const orders: Array<IOrder> | null = useAppSelector(state =>
    selectFeedOrders(
      state,
      isProfileFeed ? FeedTypesEnum.PROFILE : FeedTypesEnum.ALL
    )
  );

  return !orders || orders.length === 0 ? (
    <p className="text text_type_main-medium">Нет данных для отображения</p>
  ) : (
    <ul className={cn(feedOrdersListStyles.list, 'custom-scroll')}>
      {orders.map(order => (
        <li key={order._id}>
          <FeedOrdersCard {...order} />
        </li>
      ))}
    </ul>
  );
};
