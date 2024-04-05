import useSWR from 'swr';

import AddChat from './add-chat/AddChat.tsx';
import ChatName from './chat-name/ChatName.tsx';

import { fetcher } from '../../../utilis/fetcher.ts';

import { IChat } from '../../../types/types.ts';

const ChatDrawer = () => {
  const {
    data: chats,
    isLoading,
    mutate
  } = useSWR(`${import.meta.env.VITE_SERVER_URI}/rooms`, fetcher);

  const addChat = async (chat: IChat) => {
    chats.data.push(chat);
    await mutate({
      ...chats
    });
  };

  return (
    <div className={'fixed top-20 left-0 w-72 h-screen bg-gray-100 z-40 p-2 overflow-auto pb-12'}>
      <div className={'flex flex-col gap-1'}>
        <AddChat addChat={addChat} />
        {!isLoading &&
          chats?.data?.map((item: IChat) => {
            return <ChatName chat={item} key={item._id} />;
          })}
      </div>
    </div>
  );
};

export default ChatDrawer;
