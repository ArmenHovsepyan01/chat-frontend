import { FC, useState } from 'react';

import Modal from '../../../ui/modal/Modal.tsx';

import { IChat } from '../../../../types/types.ts';

interface IAddChat {
  addChat: (item: IChat) => void;
}

const AddChat: FC<IAddChat> = ({ addChat }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={
        'mb-2 p-3 w-full m-auto rounded cursor-pointer flex text-center justify-between hover:bg-gray-700 hover:text-white'
      }
      onClick={openModal}>
      Add room
      <span className={'icon-plus-alt'}></span>
      {isOpen && <Modal addChat={addChat} closeModal={closeModal} />}
    </div>
  );
};

export default AddChat;
