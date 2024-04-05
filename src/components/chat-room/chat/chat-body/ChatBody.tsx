import chatBg from '../../../../assets/chat-bg.webp';
import { FC } from 'react';

interface IChatBody {
  children: React.ReactNode;
}

const ChatBody: FC<IChatBody> = ({ children }) => {
  return (
    <div
      className={`flex flex-col gap-4 mt-20 bg-gray-700 ml-72 bg-cover scroll-auto
          w-[calc(100%-18rem)] h-[calc(100vh-5rem)]
         `}
      style={{ backgroundImage: `url(${chatBg})` }}>
      {children}
    </div>
  );
};

export default ChatBody;
