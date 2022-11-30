import { FC } from 'react';
import { Modal } from '../../components/modal/modal';
import { useNavigateBack } from '../../hooks/useNavigateBack';
import { FeedOrderDetails } from '../../components/feed-order-details/feed-order-details';

export const FeedOrderPage: FC = () => {
  const handleCloseModal: () => void = useNavigateBack();

  return (
    <Modal onClose={handleCloseModal}>
      <FeedOrderDetails />
    </Modal>
  );
};
