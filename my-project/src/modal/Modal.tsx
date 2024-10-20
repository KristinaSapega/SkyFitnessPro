import React, { ReactNode } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRoot = document.getElementById("modal-root");

  if (!modalRoot || !isOpen) return null;

  return ReactDOM.createPortal(
    <div className="z-1000 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        {children}
    </div>,
    modalRoot,
  );
};

export default Modal;
