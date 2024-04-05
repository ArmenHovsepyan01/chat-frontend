import { Message } from '../../../types/types.ts';
import { FC } from 'react';

interface IPinnedMessage {
  message: Message;
}

const PinnedMessage: FC<IPinnedMessage> = ({ message }) => {
  return (
    <div
      className={
        'm-auto p-2 bg-gray-700 text-white flex items-center justify-center rounded flex-col gap-1'
      }>
      <span>{message.message}</span>
      <span className={'text-sm'}>{new Date(message.createdAt).toLocaleTimeString()}</span>
    </div>
  );
};

export default PinnedMessage;
