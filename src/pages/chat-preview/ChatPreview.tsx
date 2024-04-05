import ChatLayout from '../../components/layouts/chat/layuot/ChatLayout.tsx';
import ChatBody from '../../components/chat-room/chat/chat-body/ChatBody.tsx';

const ChatPreview = () => {
  return (
    <ChatLayout>
      <ChatBody>
        <div
          className={
            'w-full text-white h-[calc(100vh-5rem)] flex items-center justify-center font-medium'
          }>
          Choose chat from list.
        </div>
      </ChatBody>
    </ChatLayout>
  );
};

export default ChatPreview;
