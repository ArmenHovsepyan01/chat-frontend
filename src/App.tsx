import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home.tsx';
import ChatRoom from './pages/chat-room/ChatRoom.tsx';

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<Home />} />
      <Route path={'/chat'} element={<ChatRoom />} />
    </Routes>
  );
}

export default App;
