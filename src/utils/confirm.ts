import React, {createContext} from 'react';

export interface DialogModalProps {
  title?: string,
  message?: string | React.ReactNode,
  onlyConfirm?: boolean,
  primaryButtonText?: string
}


export interface ConfirmProps {
  confirm: (dialog: DialogModalProps) => Promise<boolean>;
}

export const ConfirmContext = createContext<ConfirmProps>({
  confirm: () => new Promise((_, reject) => reject()),
});


/**
 * DialogStack
 */
export interface DialogProps {
  modal: DialogModalProps;
  onClickOK: () => void;
  onClickCancel: () => void;
}

export class DialogStack {
  private stack: Promise<DialogProps>[] = [];
  // private stack: DialogProps[] = [];

  push(item: DialogProps): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const dialog = {
        modal: item.modal,
        onClickOK: () => {
          if (item.onClickOK) {
            item.onClickOK();
          }

          resolve(true);
        },
        onClickCancel: () => {
          if (item.onClickCancel) {
            item.onClickCancel();
          }

          resolve(false);
        },
      };

      this.stack.push(Promise.resolve(dialog));
    });
  }

  pop() {
    return this.stack.pop();
  }

  peek() {
    return this.stack[this.stack.length - 1];
  }

  print() {
    console.log(this.stack);
  }

  size(): number {
    return this.stack.length;
  }

  async nextDialog() {
    if (this.size() > 0) {
      this.pop();
      return this.peek();
    } else {
      return null
    }
  }
}
