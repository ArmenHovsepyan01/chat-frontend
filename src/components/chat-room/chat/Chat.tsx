import { Suspense } from 'react';

import ChatBody from './chat-body/ChatBody.tsx';
import SendMessage from './send-message/SendMessage.tsx';
import Messages from './chat-body/messages/Messages.tsx';
import MessagesSkeleton from './chat-body/messages-skeleton/MessagesSkeleton.tsx';

const Chat = () => {
  return (
    <ChatBody>
      <Suspense fallback={<MessagesSkeleton />}>
        <Messages />
      </Suspense>
      <SendMessage />
    </ChatBody>
  );
};

export default Chat;
