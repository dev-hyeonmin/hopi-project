import {
  ConfirmContext,
  ConfirmProps,
  DialogModalProps,
  DialogProps,
  DialogStack,
} from '../utils/confirm.ts';
import {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import Modal from '../components/overlay/Modal.tsx';
import MessageModalLayout from '../components/overlay/MessageModalLayout.tsx';

const dialogStack = new DialogStack();
const ConformStackDialog = ({children}: {children: React.ReactNode}) => {
  const modalRef = useRef<ConfirmProps>(null);

  const confirm = async (dialog: DialogModalProps) => {
    if (modalRef.current) {
      return modalRef.current.confirm(dialog);
    }
    return false;
  };

  return (
    <ConfirmContext.Provider value={{confirm}}>
      {children}
      <DialogModal ref={modalRef} />
    </ConfirmContext.Provider>
  );
};

export default ConformStackDialog;

/**
 * Dialog
 * 전체 리랜더링으로 인해 컴포넌트 분리
 */
const DialogModal = forwardRef((_, ref) => {
  const [currentDialog, setCurrentDialog] = useState<DialogProps | null>(null);

  const confirm = async ({
    title,
    message,
    onlyConfirm,
    primaryButtonText,
  }: DialogModalProps) => {
    const dialog: DialogProps = {
      modal: {
        title,
        message,
        onlyConfirm,
        primaryButtonText,
      },
      onClickOK: async () => {
        const nextDialog = await dialogStack.nextDialog();
        setCurrentDialog(nextDialog);
      },
      onClickCancel: async () => {
        const nextDialog = await dialogStack.nextDialog();
        setCurrentDialog(nextDialog);
      },
    };

    const result = dialogStack.push(dialog);
    const current = dialogStack.peek();
    if (current) {
      setCurrentDialog(await current);
    }

    return result;
  };

  useImperativeHandle(ref, () => ({
    confirm,
  }));

  if (!currentDialog) return null;

  return (
    <Modal
      isOpen={!!currentDialog}
      useBackground={false}
      shouldCloseOnOverlayClick
      onRequestClose={currentDialog.onClickCancel}>
      <MessageModalLayout {...currentDialog} />
    </Modal>
  );
});
