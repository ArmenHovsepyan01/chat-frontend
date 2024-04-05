import { FC } from 'react';

interface IMessageLoadingSkeleton {
  fromUser: boolean;
}

const MessageLoadingSkeleton: FC<IMessageLoadingSkeleton> = ({ fromUser }) => {
  return (
    <div
      className={`flex flex-col gap-2 w-96 bg-white rounded p-1 ${fromUser ? 'ml-auto' : ''}`}
      role={'status'}>
      <span
        className={
          'text-blue-500 font-bold capitalize p-2 rounded bg-gray-300 animate-pulse w-24'
        }></span>
      <span className={'break-all p-4 rounded bg-gray-300 animate-pulse'}></span>
      <span
        className={
          'ml-auto text-gray-500 text-xm p-1 rounded dark:bg-gray-700 animate-pulse bg-gray-300 w-20 h-4'
        }></span>
    </div>
  );
};

export default MessageLoadingSkeleton;
