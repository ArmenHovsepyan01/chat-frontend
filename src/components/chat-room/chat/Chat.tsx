import chatBg from '../../../assets/chat-bg.webp';
import MessageBox from '../../ui/message-box/MessageBox.tsx';
import { useEffect, useRef, useState } from 'react';
import { Message } from '../../../types/types.ts';
import socket from '../../../socket.ts';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import { fetcher } from '../../../utilis/fetcher.ts';

const Chat = () => {
  const { id: roomId } = useParams();

  const navigate = useNavigate();

  const { data, isLoading } = useSWR(`http://localhost:5000/messages/${roomId}`, fetcher);

  const userName = sessionStorage.getItem('userName');

  const [messages, setMessages] = useState<Message[]>([]);

  const [userTyping, setUserTyping] = useState<{ message: string; isTyping: boolean }>({
    message: '',
    isTyping: false
  });
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const messageRef = useRef<HTMLInputElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!userName) return navigate('/');

    if (roomId) {
      socket.emit('joinRoom', {
        roomId,
        userName: userName,
        message: `${userName} joined to room.`
      });
    }

    return () => {
      if (roomId) {
        socket.emit('leaveRoom', { roomId, userName: userName });
      }
    };
  }, [roomId, navigate, userName]);

  useEffect(() => {
    socket.on('receiveMessage', (event) => {
      setMessages((prev) => [...prev, event.message]);
    });

    socket.on('message', (event) => {
      setMessages((prev) => [...prev, event]);
    });

    socket.on('userTyping', (event) => {
      setUserTyping(event);
    });
  }, []);

  useEffect(() => {
    if (roomId) socket.emit('typing', { roomId, userName, isTyping });
  }, [isTyping]);

  useEffect(() => {
    if (!isLoading && data.data) {
      setMessages(data.data);
    }
  }, [isLoading, data]);

  const sendMessage = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    const message = messageRef?.current?.value;

    if (message && roomId) {
      socket.emit('sendMessage', {
        message,
        userName,
        roomId
      });
    }

    if (messageRef.current) {
      messageRef.current.value = '';
    }

    setIsTyping(false);
  };

  const handleTyping = () => {
    if (roomId) {
      setIsTyping(true);

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
      }, 1000);

      socket.emit('typing', { roomId, userName, isTyping });
    }
  };

  const sendMessageOnEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') sendMessage();
  };

  return (
    <div
      className={`flex flex-col gap-4 mt-20 bg-gray-700 ml-72 bg-cover scroll-auto
          w-[calc(100%-18rem)]
         `}
      style={{ backgroundImage: `url(${chatBg})` }}>
      <div className="flex flex-col w-full gap-2 m-auto h-[calc(100vh-152px)] overflow-auto p-2">
        <div className={'flex flex-col flex-1 gap-2'}>
          {messages?.length > 0 &&
            messages.map((item) => {
              return <MessageBox message={item} currentUserName={userName || ''} key={item._id} />;
            })}

          {userTyping.isTyping && (
            <div className={`flex flex-col gap-2 bg-gray-200 rounded mb-auto p-2 w-72 `}>
              {userTyping.message}
            </div>
          )}
        </div>
      </div>
      <div className={'flex gap-2 w-full h-14 bg-white p-2'}>
        <input
          className={'w-full flex-1 px-1 outline-none pl-4 bg-gray-100 rounded'}
          ref={messageRef}
          onChange={handleTyping}
          placeholder={'Write message'}
          onKeyDown={sendMessageOnEnterPress}
        />
        <button
          onClick={sendMessage}
          className={'bg-blue-500 p-4 rounded text-white flex items-center gap-1 m-auto h-full'}>
          <span className={'icon-send'}></span>
        </button>
      </div>
    </div>
  );
};

export default Chat;
