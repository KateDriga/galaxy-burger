import { ReactNode } from 'react';

export interface IModalOverlay {
  readonly onClose: () => void;
}

export interface IModal extends IModalOverlay {
  readonly children: ReactNode;
}
