import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';

interface IChatName {
  chat: any;
}

const ChatName: FC<IChatName> = ({ chat }) => {
  const { id } = useParams();
  const selected = id === chat._id;

  return (
    <Link
      to={`/chat/${chat._id}`}
      key={chat._id}
      className={`w-full p-3 break-all cursor-pointer ${selected ? 'bg-gray-700 text-white' : 'bg-transparent'} rounded hover:bg-gray-700 transition-all duration-75  hover:text-white`}>
      {chat.name}
    </Link>
  );
};

export default ChatName;
