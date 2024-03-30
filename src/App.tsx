import { socket } from './socket.ts';
import { useEffect, useRef, useState } from 'react';
import Layout from './layout/Layout.tsx';
import Container from './components/container/Container.tsx';
import { preview } from 'vite';

function App() {
  const inputRef = useRef(null);
  const userNameRef = useRef(null);
  const messageRef = useRef(null);
  const [messages, setMessages] = useState<any[]>([]);

  const [id, setId] = useState<number>();

  useEffect(() => {
    socket.on('connection', (socket) => {
      console.log(socket.id, 'connected');
    });

    socket.on('receiveMessage', (event) => {
      console.log(event);
      messages.push(event.message);

      console.log(messages);

      setMessages(messages);
    });

    return () => {
      socket.on('disconnect', () => console.log('disconnected'));
    };
  }, []);

  const generateRoomID = () => {
    const id = Math.floor(Math.random() * new Date().getMilliseconds());
    setId(id);
  };

  const connectToRoom = () => {
    // @ts-ignore
    const roomId = inputRef.current.value;
    // @ts-ignore

    const userName = userNameRef.current.value;

    socket.emit('joinRoom', { roomId, message: 'Connected User', userName });

    socket.on('roomSettings', (event) => {
      console.log(event);
    });
  };

  const sendmessage = () => {
    // @ts-ignore
    const message = messageRef.current.value;

    // @ts-ignore
    const userName = userNameRef.current.value;

    socket.emit('sendMessage', {
      message,
      userName
    });
  };
  console.log(messages, messages);
  return (
    <Layout>
      <Container>
        <div className={'flex flex-col gap-4 mt-24'}>
          <div className={'flex gap-2 items-center'}>
            Generate room id
            <button onClick={generateRoomID} className={'bg-gray-700 text-white p-2 rounded'}>
              Generate
            </button>
            {id && <span className={'border-2 border-teal-600'}> {id}</span>}
          </div>
          <div className={'flex gap-4'}>
            Connect to room
            <input placeholder={'enter room id'} ref={inputRef} className={'border'} />
            <input placeholder={'Type your name'} ref={userNameRef} className={'border'} />
            <button onClick={connectToRoom} className={'bg-gray-700 text-white p-2 rounded'}>
              Connect
            </button>
          </div>
          <div>
            <input className={'border border-black'} ref={messageRef} />
            <button onClick={sendmessage}>Send Message</button>
          </div>

          <div className="flex flex-col gap-2 border">
            {messages.map((item, i) => {
              return (
                <div className={'flex flex-col gap-2 w-60 bg-gray-400 text-white rounded'} key={i}>
                  <span>{item.message}</span>
                  <span>{item.userName}</span>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Layout>
  );
}

export default App;
