import { FC } from 'react';
import { formatOrderNumber } from '../../utils/util-functions';
import { IFeedOrdersTotal } from '../../utils/ts-types/api-types';
import { useAppSelector } from '../../hooks/useStore';
import {
  selectFeedAggregateData,
  selectFeedOrdersDone,
  selectFeedOrdersPending,
} from '../../services/selectors/feed';
import feedOrdersStatusStyles from './feed-orders-status.module.css';
import cn from 'classnames';

export const FeedOrdersStatus: FC = () => {
  const aggregateData: IFeedOrdersTotal | null = useAppSelector(
    selectFeedAggregateData
  );
  const ordersDone: Array<number> | null = useAppSelector(selectFeedOrdersDone);
  const ordersPending: Array<number> | null = useAppSelector(
    selectFeedOrdersPending
  );

  return (
    <div className={cn(feedOrdersStatusStyles.status, 'custom-scroll')}>
      <div className={feedOrdersStatusStyles.status_progress}>
        <div className={feedOrdersStatusStyles.orders_done}>
          <span className="text text_type_main-medium">Готовы:</span>
          <ul
            className={cn(
              feedOrdersStatusStyles.order_numbers,
              'custom-scroll'
            )}
          >
            {ordersDone?.map((order: number) => (
              <li
                key={order}
                className={cn(
                  feedOrdersStatusStyles.order_numbers_success,
                  'text text_type_digits-default'
                )}
              >
                {formatOrderNumber(order)}
              </li>
            ))}
          </ul>
        </div>
        <div className={feedOrdersStatusStyles.orders_in_progress}>
          <span className="text text_type_main-medium">В работе:</span>
          <ul
            className={cn(
              feedOrdersStatusStyles.order_numbers,
              'custom-scroll'
            )}
          >
            {ordersPending?.map((order: number) => (
              <li key={order} className="text text_type_digits-default">
                {formatOrderNumber(order)}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={feedOrdersStatusStyles.status_count}>
        <span className="text text_type_main-medium">
          Выполнено за все время:
        </span>
        <span className="text text_type_digits-large">
          {aggregateData?.total ?? '-'}
        </span>
      </div>
      <div className={feedOrdersStatusStyles.status_count}>
        <span className="text text_type_main-medium">
          Выполнено за сегодня:
        </span>
        <span className="text text_type_digits-large">
          {aggregateData?.totalToday ?? '-'}
        </span>
      </div>
    </div>
  );
};
