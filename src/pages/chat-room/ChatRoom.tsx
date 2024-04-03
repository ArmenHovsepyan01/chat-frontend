import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Layout from '../../layout/Layout.tsx';
import Container from '../../components/container/Container.tsx';
import MessageBox from '../../components/message-box/MessageBox.tsx';

import { Message } from '../../types/types.ts';

import socket from '../../socket.ts';

import chatBg from '../../assets/chat-bg.webp';
import useSWR from 'swr';
import { fetcher } from '../../utilis/fetcher.ts';
import axios from 'axios';

const ChatRoom = () => {
  const {
    data: chats,
    isLoading,
    mutate
  } = useSWR(`${import.meta.env.VITE_SERVER_URI}/rooms`, fetcher);
  const [selectedChat, setSelectedChat] = useState<{ _id: string; name: string }>();

  const userName = sessionStorage.getItem('userName');

  const navigate = useNavigate();

  const messageRef = useRef<HTMLInputElement>(null);

  const createChatInputrRef = useRef<HTMLInputElement>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [userTyping, setUserTyping] = useState<{ message: string; isTyping: boolean }>({
    message: '',
    isTyping: false
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const roomId = selectedChat?._id;

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

    socket.on('messages', (data: { messages: Message[] }) => {
      setMessages(data.messages);
    });
  }, []);

  useEffect(() => {
    if (!userName) return navigate('/');

    if (selectedChat?._id) {
      socket.emit('joinRoom', {
        roomId,
        userName,
        message: `${userName} joined to room.`
      });
    }

    return () => {
      socket.on('disconnect', () => console.log('disconnected'));
      if (selectedChat) {
        socket.emit('leaveRoom', { roomId: selectedChat._id, userName });
      }
      console.log('unmount');
    };
  }, [selectedChat]);

  useEffect(() => {
    if (roomId) socket.emit('typing', { roomId, userName, isTyping });
  }, [isTyping]);

  const sendMessage = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    const message = messageRef?.current?.value;

    if (message && selectedChat?._id) {
      socket.emit('sendMessage', {
        message,
        userName,
        roomId: selectedChat._id
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

  const leaveRoom = () => {
    if (roomId) socket.emit('leaveRoom', { roomId, userName });

    sessionStorage.removeItem('roomId');
    sessionStorage.removeItem('userName');

    navigate('/');
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const createChat = async () => {
    try {
      if (createChatInputrRef.current) {
        const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URI}/rooms`, {
          name: createChatInputrRef.current.value
        });

        chats.data.push(data.data);
        mutate({
          ...chats
        });

        closeModal();
      }
    } catch (e) {
      throw new Error(e);
    }
  };

  return (
    <Layout>
      <div className={'fixed top-20 left-0 w-72 h-screen bg-gray-400 text-white z-40'}>
        {!isLoading && (
          <div className={'flex flex-col'}>
            {chats?.data?.map((item: { _id: string; name: string }) => {
              return (
                <span
                  key={item._id}
                  className={`w-full p-3 break-all cursor-pointer ${selectedChat?.name === item.name ? 'bg-gray-700' : 'bg-transparent'}`}
                  onClick={() => {
                    setSelectedChat(item);
                  }}>
                  {item.name}
                </span>
              );
            })}
          </div>
        )}
        <div
          className={'mt-4 p-2 bg-blue-900 w-40 text-center m-auto rounded cursor-pointer'}
          onClick={openModal}>
          Add room
        </div>
      </div>
      <Container>
        <div
          className={`flex flex-col gap-4 mt-20 bg-gray-700 ml-72 m-auto bg-cover w-1000
         `}
          style={{ backgroundImage: `url(${chatBg})` }}>
          <div className="flex flex-col w-full gap-2 m-auto h-[calc(100vh-10rem)] overflow-auto p-2">
            <div className={'flex flex-col flex-1 gap-2'}>
              {messages?.length > 0 &&
                messages.map((item) => {
                  return (
                    <MessageBox message={item} currentUserName={userName || ''} key={item._id} />
                  );
                })}

              {userTyping.isTyping && (
                <div className={`flex flex-col gap-2 bg-gray-200 rounded mb-auto p-2 w-72 `}>
                  {userTyping.message}
                </div>
              )}
            </div>
          </div>
          <div className={'flex gap-2 w-full'}>
            <input
              className={'border border-black w-full flex-1 rounded px-1'}
              ref={messageRef}
              onChange={handleTyping}
            />
            <button onClick={sendMessage} className={'bg-blue-500 p-1 rounded text-white'}>
              Send Message
            </button>
            <button onClick={leaveRoom} className={'bg-blue-500 p-1 rounded text-white'}>
              Leave room
            </button>
          </div>
        </div>
      </Container>

      {isOpen && (
        <div
          className={
            'fixed top-0 left-0 z-50 bg-black/30 w-full h-screen flex items-center justify-center'
          }>
          <div className={'bg-white w-96 min-h-32 rounded p-4 flex flex-col justify-between'}>
            <input
              type={'text'}
              className={'border rounded focus:outline-blue-700 p-1'}
              placeholder={'Type chat name'}
              ref={createChatInputrRef}
            />
            <div className={'flex gap-2 justify-between text-white'}>
              <button className={'flex-1 bg-blue-900 rounded p-1'} onClick={createChat}>
                Create chat
              </button>
              <button className={'flex-1 bg-red-500 rounded p-1'} onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ChatRoom;
