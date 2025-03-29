export interface UserInfoI {
  id: string;
  artwork: string;
  name: string;
  isOnline: boolean;
}

export interface MessageI {
  id: string;
  text: string;
  timestamp: string;
  senderId: string;
  tick: 'none' | 'pending' | 'sent' | 'delivered' | 'read';
  // none - Mensagem dos outros usuários
  // pending -  Esperando para ser enviada (sem conexão com a rede)
  // sent - Foi enviada para o servidor (mas, ainda não recebida pelos outros)
  // delivered - Todos receberam (mas, não leram ainda)
  // read - Todos receberam e leram
}

export interface ChatInfoI {
  id: string;
  artwork: string;
  name: string;
  messages: MessageI[];
  members: UserInfoI[];
}
