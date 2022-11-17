import { FC } from 'react';
import { IngredientDetails } from '../../components/ingredient-details/ingredient-details';
import { Modal } from '../../components/modal/modal';
import { NavigateFunction, useNavigate } from 'react-router-dom';

export const IngredientPage: FC = () => {
  const navigate: NavigateFunction = useNavigate();

  const handleCloseModal = (): void => {
    navigate(-1);
  };

  return (
    <Modal onClose={handleCloseModal}>
      <IngredientDetails />
    </Modal>
  );
};
