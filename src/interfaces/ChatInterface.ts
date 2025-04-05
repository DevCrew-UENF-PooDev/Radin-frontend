export interface UserInfoI {
  id: string;
  artwork: string;
  username: string;
  status: string;
}

export interface AttachmentI {
  id: string;
  type: 'image' | 'audio' | 'file';
  url: string; // URL do arquivo armazenado
  duration?: number; // Duração em segundos (para áudios)
}

export interface MessageI {
  id: string;
  text: string;
  created_at: string;
  senderId: string;
  tick: 'none' | 'pending' | 'sent' | 'delivered' | 'read';
  // none - Mensagem dos outros usuários
  // pending -  Esperando para ser enviada (sem conexão com a rede)
  // sent - Foi enviada para o servidor (mas, ainda não recebida pelos outros)
  // delivered - Todos receberam (mas, não leram ainda)
  // read - Todos receberam e leram
  attachments?: AttachmentI[];
}

export interface ChatInfoI {
  id: string;
  artwork: string;
  name: string;
  messages: MessageI[];
  members: UserInfoI[];
}
