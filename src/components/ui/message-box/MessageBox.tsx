import { Message } from '../../../types/types.ts';
import { FC } from 'react';

interface IMessage {
  message: Message;
  currentUserName: string;
}
const MessageBox: FC<IMessage> = ({ message, currentUserName }) => {
  return (
    <div
      className={`flex flex-col gap-1 w-96 bg-gray-200 rounded p-1 ${message.user.userName === currentUserName ? 'ml-auto' : ''}`}>
      <span className={'text-blue-500 font-bold capitalize'}>{message.user.userName}</span>
      <span className={'break-all'}>{message.message}</span>
      <span className={'ml-auto text-gray-500 text-xm'}>
        {new Date(message.createdAt).toLocaleTimeString()}
      </span>
    </div>
  );
};

export default MessageBox;
