import AddChat from './add-chat/AddChat.tsx';
import ChatName from './chat-name/ChatName.tsx';
import useSWR from 'swr';
import { fetcher } from '../../../utilis/fetcher.ts';

const ChatDrawer = () => {
  const { data: chats, isLoading } = useSWR(`${import.meta.env.VITE_SERVER_URI}/rooms`, fetcher);

  return (
    <div className={'fixed top-20 left-0 w-72 h-screen bg-gray-100 z-40 p-2'}>
      {!isLoading && (
        <div className={'flex flex-col gap-1'}>
          <AddChat />
          {chats?.data?.map((item: { _id: string; name: string }) => {
            return <ChatName chat={item} key={item._id} />;
          })}
        </div>
      )}
    </div>
  );
};

export default ChatDrawer;
