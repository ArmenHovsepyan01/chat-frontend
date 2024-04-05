import axios from 'axios';

import { createPortal } from 'react-dom';
import { IChat } from '../../../types/types.ts';

interface IModal {
  addChat: (chat: IChat) => void;
  closeModal: () => void;
}

const Modal = (props: IModal) => {
  const { closeModal, addChat } = props;
  const createChat = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      console.log(event.currentTarget.elements[0]);
      const value = event.currentTarget.elements[0].value;

      if (value) {
        const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URI}/rooms`, {
          name: value
        });

        addChat(data.data);
      }

      closeModal();
    } catch (e: any) {
      throw new Error(e);
    }
  };
  return createPortal(
    <>
      <div
        className={
          'fixed top-0 left-0 z-50 bg-black/30 w-full h-screen flex items-center justify-center'
        }>
        <form
          className={'bg-white w-96 min-h-32 rounded p-4 flex flex-col justify-between'}
          onSubmit={createChat}>
          <input
            type={'text'}
            className={'border rounded focus:outline-blue-700 p-1'}
            placeholder={'Type chat name'}
          />
          <div className={'flex gap-2 justify-between text-white'}>
            <button className={'flex-1 bg-blue-900 rounded p-1'} type={'submit'}>
              Create chat
            </button>
            <button className={'flex-1 bg-red-500 rounded p-1'} onClick={closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>,
    document.getElementById('modal') as HTMLDivElement
  );
};

export default Modal;
