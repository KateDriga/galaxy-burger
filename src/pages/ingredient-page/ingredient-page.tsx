import { FC } from 'react';
import { IngredientDetails } from '../../components/ingredient-details/ingredient-details';
import { Modal } from '../../components/modal/modal';
import { useNavigateBack } from '../../hooks/useNavigateBack';

export const IngredientPage: FC = () => {
  const handleCloseModal: () => void = useNavigateBack();

  return (
    <Modal onClose={handleCloseModal}>
      <IngredientDetails />
    </Modal>
  );
};
