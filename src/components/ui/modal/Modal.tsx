import { ForwardedRef, forwardRef } from 'react';

interface IModal {
  createChat: () => void;
  closeModal: () => void;
}

const Modal = forwardRef((props: IModal, ref: ForwardedRef<HTMLInputElement>) => {
  const { closeModal, createChat } = props;

  return (
    <div
      className={
        'fixed top-0 left-0 z-50 bg-black/30 w-full h-screen flex items-center justify-center'
      }>
      <div className={'bg-white w-96 min-h-32 rounded p-4 flex flex-col justify-between'}>
        <input
          type={'text'}
          className={'border rounded focus:outline-blue-700 p-1'}
          placeholder={'Type chat name'}
          ref={ref}
        />
        <div className={'flex gap-2 justify-between text-white'}>
          <button className={'flex-1 bg-blue-900 rounded p-1'} onClick={createChat}>
            Create chat
          </button>
          <button className={'flex-1 bg-red-500 rounded p-1'} onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
});

export default Modal;
