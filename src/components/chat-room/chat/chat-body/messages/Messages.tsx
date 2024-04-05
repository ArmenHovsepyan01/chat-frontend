import { useEffect, useRef, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import useSWR from 'swr';

import MessageBox from '../../../../ui/message-box/MessageBox.tsx';

import { fetcher } from '../../../../../utilis/fetcher.ts';

import { Message } from '../../../../../types/types.ts';

import PinnedMessage from '../../../../ui/pinned-message/PinnedMessage.tsx';

import socket from '../../../../../socket.ts';

const Messages = () => {
  const { id: roomId } = useParams();

  const navigate = useNavigate();

  const { data, isLoading } = useSWR(`http://localhost:5000/messages/${roomId}`, fetcher, {
    suspense: true
  });

  const messagesRef = useRef<HTMLDivElement>(null);

  const userName = sessionStorage.getItem('userName');

  const [messages, setMessages] = useState<Message[]>([]);

  const [userTyping, setUserTyping] = useState<{ message: string; isTyping: boolean }>({
    message: '',
    isTyping: false
  });

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
      if (roomId && userName) {
        socket.emit('leaveRoom', { roomId, userName });
      }
    };
  }, [roomId]);

  useEffect(() => {
    socket.on('receiveMessage', (event) => {
      setMessages((prev) => [...prev, event.message]);
    });

    socket.on('message', (event) => {
      setMessages((prev) => [...prev, event]);
    });

    socket.on('userTyping', (event) => {
      setUserTyping(event);
      scrollToEnd();
    });
  }, []);

  useEffect(() => {
    if (!isLoading && data.data) {
      setMessages(data.data);
    }
  }, [isLoading, data]);

  useEffect(() => {
    scrollToEnd();
  }, [messages]);

  const scrollToEnd = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  };

  return (
    <>
      <div
        className="flex flex-col w-full gap-2 m-auto h-[calc(100vh-152px)] overflow-auto p-2 scroll-smooth"
        ref={messagesRef}>
        <div className={'flex flex-col flex-1 gap-2'}>
          {messages.map((item) => {
            if (item.type === 'message')
              return <MessageBox message={item} currentUserName={userName || ''} key={item._id} />;

            return <PinnedMessage message={item} key={item._id} />;
          })}

          {userTyping.isTyping && (
            <div className={`flex flex-col gap-2 bg-gray-200 rounded mb-auto p-2 w-72 `}>
              {userTyping.message}
            </div>
          )}
          {/*<div ref={messagesRef} />*/}
        </div>
      </div>
    </>
  );
};

export default Messages;
