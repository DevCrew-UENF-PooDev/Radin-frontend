export interface UserInfoI {
  id: string;
  artwork: string;
  name: string;
  isOnline: boolean;
}

interface MessageI {
  id: string;
  text: string;
  timestamp: string;
  senderId: string;
}

export interface ChatInfoI {
  id: string;
  artwork: string;
  name: string;
  messages: MessageI[];
  members: UserInfoI[];
}
