import socket from '../../../../socket.ts';
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const SendMessage = () => {
  const { id: roomId } = useParams();
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (roomId) socket.emit('typing', { roomId, userName, isTyping });
  }, [isTyping]);

  const userName = sessionStorage.getItem('userName');

  const handleTyping = () => {
    if (roomId) {
      setIsTyping(true);

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
      }, 1000);

      socket.emit('typing', { roomId, userName, isTyping });
    }
  };

  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    const message = event.currentTarget.elements?.item(0)?.value;

    if (message && roomId) {
      socket.emit('sendMessage', {
        message,
        userName,
        roomId
      });
    }

    if (message) {
      event.currentTarget.elements.item(0).value = '';
    }

    setIsTyping(false);
  };

  return (
    <form className={'flex gap-2 w-full h-14 bg-white p-2'} onSubmit={sendMessage}>
      <input
        id={'message'}
        className={'w-full flex-1 px-1 outline-none pl-4 bg-gray-100 rounded'}
        onChange={handleTyping}
        placeholder={'Write message'}
      />
      <button
        type={'submit'}
        className={'bg-blue-500 p-4 rounded text-white flex items-center gap-1 m-auto h-full'}>
        <span className={'icon-send'}></span>
      </button>
    </form>
  );
};

export default SendMessage;
