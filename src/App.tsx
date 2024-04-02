import { useEffect, useRef, useState } from 'react';

import { socket } from './socket.ts';

import Layout from './layout/Layout.tsx';
import Container from './components/container/Container.tsx';

import { Message } from './types/types.ts';
import MessageBox from './components/message-box/MessageBox.tsx';

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLInputElement>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [userTyping, setUserTyping] = useState<{ message: string; isTyping: boolean }>({
    message: '',
    isTyping: false
  });

  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTyping = () => {
    setIsTyping(true);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 1000);

    const roomId = inputRef?.current?.value;
    const userName = userNameRef?.current?.value;

    socket.emit('typing', { roomId, userName, isTyping });
  };

  useEffect(() => {
    socket.on('connection', (socket) => {
      console.log(socket.id, 'connected');
    });

    socket.on('receiveMessage', (event) => {
      console.log(event.message);
      setMessages((prev) => [...prev, event.message]);
    });

    socket.on('userTyping', (event) => {
      setUserTyping(event);
    });

    socket.on('messages', (data: { messages: Message[] }) => {
      setMessages(data.messages);
    });

    return () => {
      socket.on('disconnect', () => console.log('disconnected'));
    };
  }, []);

  const connectToRoom = () => {
    const roomId = inputRef?.current?.value;

    const userName = userNameRef?.current?.value;

    socket.emit('joinRoom', { roomId, message: 'Connected new user', userName });
  };

  const sendMessage = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    const message = messageRef?.current?.value;

    const userName = userNameRef?.current?.value;

    const roomId = inputRef?.current?.value;

    socket.emit('sendMessage', {
      message,
      userName,
      roomId
    });

    if (messageRef.current) {
      messageRef.current.value = '';
    }

    setIsTyping(false);
  };

  useEffect(() => {
    const roomId = inputRef?.current?.value;
    const userName = userNameRef?.current?.value;

    socket.emit('typing', { roomId, userName, isTyping });
  }, [isTyping]);

  return (
    <Layout>
      <Container>
        <div className={'flex flex-col gap-4 mt-24'}>
          <div className={'flex gap-4 items-center m-auto'}>
            Connect to room
            <input placeholder={'enter room id'} ref={inputRef} className={'border'} />
            <input placeholder={'Type your name'} ref={userNameRef} className={'border'} />
            <button onClick={connectToRoom} className={'bg-gray-700 text-white p-2 rounded'}>
              Connect
            </button>
          </div>

          <div className="flex flex-col gap-2 border w-1000 m-auto h-[calc(100vh-300px)] overflow-auto p-2">
            <div className={'flex flex-col flex-1 gap-2'}>
              {messages.map((item) => {
                return (
                  <MessageBox
                    message={item}
                    currentUserName={userNameRef?.current?.value || ''}
                    key={item._id}
                  />
                );
              })}

              {userTyping.isTyping && (
                <div className={`flex flex-col gap-2 bg-gray-200 rounded mb-auto p-2 w-72 `}>
                  {userTyping.message}
                </div>
              )}
            </div>
          </div>
          <div className={'flex gap-2 w-1000 m-auto'}>
            <input
              className={'border border-black w-full flex-1 rounded px-1'}
              ref={messageRef}
              onChange={() => {
                handleTyping();
              }}
            />
            <button onClick={sendMessage} className={'bg-blue-500 p-1 rounded text-white'}>
              Send Message
            </button>
          </div>
        </div>
      </Container>
    </Layout>
  );
}

export default App;
