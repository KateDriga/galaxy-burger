import { FC } from 'react';
import { FeedOrdersList } from '../../components/feed-orders-list/feed-orders-list';
import { FeedOrdersStatus } from '../../components/feed-orders-status/feed-orders-status';
import mainAreaCommonStyles from '../common-styles/main-area.module.css';
import cn from 'classnames';

export const FeedPage: FC = () => {
  return (
    <main className={cn(mainAreaCommonStyles.main_area, 'p-10')}>
      <div className={mainAreaCommonStyles.layout}>
        <h2 className="text text_type_main-large pb-5">Лента заказов</h2>
        <div className={mainAreaCommonStyles.section_container}>
          <section className={mainAreaCommonStyles.section}>
            <FeedOrdersList />
          </section>
          <section className={mainAreaCommonStyles.section}>
            <FeedOrdersStatus />
          </section>
        </div>
      </div>
    </main>
  );
};
