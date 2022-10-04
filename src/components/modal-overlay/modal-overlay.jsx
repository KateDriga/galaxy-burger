import modalOverlayStyles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

export const ModalOverlay = ({ onClose }) => {
  return (
    <div className={modalOverlayStyles.modal_overlay} onClick={onClose}></div>
  );
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};
