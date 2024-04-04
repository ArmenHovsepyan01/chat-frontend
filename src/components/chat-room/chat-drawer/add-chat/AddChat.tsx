import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Modal from '../../../ui/modal/Modal.tsx';
import axios from 'axios';

const AddChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const createChatInputRef = useRef<HTMLInputElement | null>(null);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const createChat = async () => {
    try {
      if (createChatInputRef.current?.value) {
        const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URI}/rooms`, {
          name: createChatInputRef.current.value
        });

        console.log(data);
        closeModal();
      }
    } catch (e: any) {
      throw new Error(e);
    }
  };

  return (
    <div
      className={
        'mb-2 p-3 w-full m-auto rounded cursor-pointer flex text-center justify-between hover:bg-gray-700 hover:text-white'
      }
      onClick={openModal}>
      Add room
      <span className={'icon-plus-alt'}></span>
      {isOpen &&
        createPortal(
          <Modal createChat={createChat} closeModal={closeModal} ref={createChatInputRef} />,
          document.getElementById('portal') as HTMLElement
        )}
    </div>
  );
};

export default AddChat;
