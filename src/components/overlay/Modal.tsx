interface BaseModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  useBackground?: boolean;
}

interface ModalPropsWithoutOverlayClick extends BaseModalProps {
  shouldCloseOnOverlayClick?: false;
  onRequestClose?: () => void;
}

interface ModalPropsWithOverlayClick extends BaseModalProps {
  shouldCloseOnOverlayClick: true;
  onRequestClose: () => void;
}

type ModalProps = ModalPropsWithoutOverlayClick | ModalPropsWithOverlayClick;

const displayStyle = (isOpen: boolean) => {
  return isOpen ? 'flex' : 'hidden';
};

const backgroundStyle = (useBackground: boolean) => {
  return useBackground && 'bg-black bg-opacity-50';
};

const Modal = ({
  isOpen,
  children,
  useBackground = true,
  shouldCloseOnOverlayClick = false,
  onRequestClose,
}: ModalProps) => {
  const modalStyle = [
    'absolute inset-0 justify-center align-middle z-10',
    displayStyle(isOpen),
    backgroundStyle(useBackground),
  ].join(' ');

  const onClose = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    if (shouldCloseOnOverlayClick && onRequestClose) {
      onRequestClose();
    }
  };

  return (
    <div className={modalStyle} onClick={onClose}>
      {children}
    </div>
  );
};

export default Modal;
