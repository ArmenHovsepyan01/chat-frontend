import Layout from '../../../../layout/Layout.tsx';
import { FC } from 'react';
import ChatDrawer from '../../../chat-room/chat-drawer/ChatDrawer.tsx';

interface IChatLayout {
  children: React.ReactNode;
}
const ChatLayout: FC<IChatLayout> = ({ children }) => {
  return (
    <Layout>
      <ChatDrawer />
      {children}
    </Layout>
  );
};

export default ChatLayout;
