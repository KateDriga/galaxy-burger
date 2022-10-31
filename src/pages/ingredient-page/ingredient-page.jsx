import { IngredientDetails } from '../../components/ingredient-details/ingredient-details';
import { Modal } from '../../components/modal/modal';
import { useNavigate } from 'react-router-dom';

export const IngredientPage = () => {
  const navigate = useNavigate();

  const handleCloseModal = () => {
    navigate(-1);
  };

  return (
    <Modal onClose={handleCloseModal}>
      <IngredientDetails />
    </Modal>
  );
};
