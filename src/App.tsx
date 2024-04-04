import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home.tsx';
import ChatRoom from './pages/chat-room/ChatRoom.tsx';
import ChatPreview from './pages/chat-preview/ChatPreview.tsx';

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<Home />} />
      <Route path={'/chat'} element={<ChatPreview />} />
      <Route path={'/chat/:id'} element={<ChatRoom />} />
      <Route path={'*'} element={<div>Not Found</div>} />
    </Routes>
  );
}

export default App;
