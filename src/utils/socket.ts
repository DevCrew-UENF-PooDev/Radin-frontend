import { io } from 'socket.io-client';
import type { MessageI } from 'src/interfaces/ChatInterface';
import { useChatStore } from 'src/stores/chatStore';

const chatStore = useChatStore();

export const socket = io('http://localhost:3000', {
  autoConnect: false,
});

export const joinChat = (chatId: string) => socket.emit('joinChat', chatId);
export const leaveChat = (chatId: string) => socket.emit('leaveChat', chatId);

export const messageDelivered = (id: string) => socket.emit('messageDelivered', { messageId: id });
export const messageRead = (id: string) => socket.emit('messageRead', { messageId: id });

socket.on('user:online', ({ userId }: { userId: string }) => {
  const members = chatStore.chats.flatMap((chat) => chat.members);
  const u = members.find((x) => x.id === userId);
  if (u) u.is_online = true;
});

socket.on('user:offline', ({ userId }: { userId: string }) => {
  const members = chatStore.chats.flatMap((chat) => chat.members);
  const u = members.find((x) => x.id === userId);
  if (u) u.is_online = false;
});

export const sendChatMessage = (chatId: string, tempMessageId: string, text: string) => {
  socket.timeout(5000).emit('sendMessage', { chatId, text, tempMessageId });
};

// Mensagem recebida
socket.on('newMessage', (data: { msg: MessageI; tempMessageId: string }) => {
  const chat = chatStore.chats.find((c) => c.id === data.msg.chat_id);
  if (chat) {
    if (chat.messages.every((m) => m.id !== data.tempMessageId)) {
      chat.messages.push(data.msg);
      if (chat === chatStore.currentChat) messageRead(data.msg.id);
      else messageDelivered(data.msg.id);
    }
  }
});

socket.on('tickUpdated', (data: { msg: MessageI; tick: string; tempMessageId: string }) => {
  if (data.msg !== null) {
    const chat = chatStore.chats.find((c) => c.id === data.msg.chat_id);
    if (chat) {
      const i = chat.messages.findIndex((m) => m.id === data.tempMessageId || m.id === data.msg.id);
      chat.messages[i] = data.msg;
    }
  }
});
