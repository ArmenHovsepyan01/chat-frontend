import ChatLayout from '../../components/layouts/chat/layuot/ChatLayout.tsx';
import chatBg from '../../assets/chat-bg.webp';

const ChatPreview = () => {
  return (
    <ChatLayout>
      <div
        className={`flex flex-col gap-4 mt-20 bg-gray-700 ml-72 bg-cover scroll-auto
          w-[calc(100%-18rem)] h-[calc(100vh-5rem)] flex items-center justify-center text-white
         `}
        style={{ backgroundImage: `url(${chatBg})` }}>
        Choose chat from list.
      </div>
    </ChatLayout>
  );
};

export default ChatPreview;
