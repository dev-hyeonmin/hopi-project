import {DialogProps} from '../../utils/confirm.ts';
import Button from '../actions/Button.tsx';

const MessageModalLayout = ({modal, onClickOK, onClickCancel}: DialogProps) => {
  return (
    <div className="flex flex-col w-[460px] h-fit gap-4 bg-white py-4 px-6 rounded-xl shadow-lg">
      <div className="text-xl font-bold">{modal.title}</div>
      <div>{modal.message}</div>

      <div className="flex justify-end mt-4 gap-1.5">
        {!modal.onlyConfirm && (
          <Button
            label="닫기"
            onClick={onClickCancel}
            skin="primary"
            priority="secondary"
          />
        )}
        <Button
          label="확인"
          onClick={onClickOK}
          skin="primary"
          priority="primary"
        />
      </div>
    </div>
  );
};

export default MessageModalLayout;
