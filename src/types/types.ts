export interface Message {
  _id: string;
  user: {
    _id: string;
    userName: string;
  };
  roomId: string;
  message: string;
  createdAt: Date;
}
