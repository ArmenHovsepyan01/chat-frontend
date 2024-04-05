export interface Message {
  _id: string;
  user: {
    _id: string;
    userName: string;
  };
  roomId: string;
  message: string;
  createdAt: Date;
  type: 'message' | 'pinned';
}

export interface IChat {
  _id: string;
  name: string;
}

export interface User {
  _id: string;
  userName: string;
  roomId: string;
}
