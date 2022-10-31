import ReactDOM from 'react-dom';
import { MODAL_ROOT } from '../../utils/const-variables/app-variables';
import { ReactComponent as CloseIcon } from '../../icons/close.svg';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import { useEffect } from 'react';
import modalStyles from './modal.module.css';
import cn from 'classnames';
import PropTypes from 'prop-types';

export const Modal = ({ children, onClose }) => {
  useEffect(() => {
    const closeOnEscapeKey = e => (e.key === 'Escape' ? onClose() : null);
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className={modalStyles.modal}>
      <ModalOverlay onClose={onClose} />
      <div className={cn(modalStyles.modal_content, 'p-10', 'custom-scroll')}>
        <CloseIcon
          className={modalStyles.modal_close_icon}
          onClick={onClose}
          tabIndex="0"
        />
        <div className={modalStyles.modal_info}>{children}</div>
      </div>
    </div>,
    MODAL_ROOT
  );
};

Modal.propTypes = {
  children: PropTypes.any,
  onClose: PropTypes.func.isRequired,
};
