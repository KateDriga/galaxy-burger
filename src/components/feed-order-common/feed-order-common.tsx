import { FC } from 'react';
import { formatOrderDate, formatOrderNumber } from '../../utils/util-functions';
import { OrderStatusEnum } from '../../utils/ts-types/order-types';
import { ORDER_STATUS_DESCRIPTION } from '../../utils/const-variables/order-variables';
import feedOrderCommonStyles from './feed-order-common.module.css';
import cn from 'classnames';

export const FeedOrderNumber: FC<{ orderNumber: number }> = ({
  orderNumber,
}) => {
  return (
    <span className="text text_type_digits-default">
      #{formatOrderNumber(orderNumber)}
    </span>
  );
};

export const FeedOrderDate: FC<{ date: string }> = ({ date }) => {
  return (
    <span className={'text text_type_main-default text_color_inactive'}>
      {formatOrderDate(new Date(date))}
    </span>
  );
};

interface IOrderTitle {
  readonly name: string;
  readonly status?: OrderStatusEnum;
}

export const FeedOrderTitle: FC<IOrderTitle> = ({ name, status }) => {
  return (
    <>
      <h3 className="text text_type_main-medium">{name}</h3>
      {status && (
        <span
          className={cn('text text_type_main-small', {
            [feedOrderCommonStyles.order_success]:
              status === OrderStatusEnum.DONE,
            [feedOrderCommonStyles.order_cancelled]:
              status === OrderStatusEnum.CANCELLED,
          })}
        >
          {ORDER_STATUS_DESCRIPTION[status]}
        </span>
      )}
    </>
  );
};

interface IFeedOrderImage {
  readonly imgSrc: string;
  readonly shiftIndex: number;
  readonly extraText?: string;
}

export const FeedOrderImage: FC<IFeedOrderImage> = ({
  imgSrc,
  shiftIndex,
  extraText,
}) => {
  return (
    <div
      style={{ right: `${15 * shiftIndex}px`, zIndex: `${100 - shiftIndex}` }}
      className={feedOrderCommonStyles.image_container}
    >
      <img
        className={feedOrderCommonStyles.image}
        src={imgSrc}
        alt="ingredient"
      />
      {extraText && (
        <span
          className={cn(
            feedOrderCommonStyles.extraText,
            'text text_type_digits-default'
          )}
        >
          {extraText}
        </span>
      )}
    </div>
  );
};
