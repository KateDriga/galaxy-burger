import { FC } from 'react';
import { IModalOverlay } from '../../utils/ts-types/modal-types';
import modalOverlayStyles from './modal-overlay.module.css';

export const ModalOverlay: FC<IModalOverlay> = ({ onClose }) => {
  return (
    <div className={modalOverlayStyles.modal_overlay} onClick={onClose}></div>
  );
};
