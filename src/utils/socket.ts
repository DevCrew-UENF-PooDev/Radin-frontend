import { io } from 'socket.io-client';
import type { MessageI } from 'src/interfaces/ChatInterface';
import { useChatStore } from 'src/stores/chatStore';

const chatStore = useChatStore();

export const socket = io('http://localhost:3000', {
  autoConnect: false,
});

export const joinChat = (chatId: string) => socket.emit('joinChat', chatId);
export const leaveChat = (chatId: string) => socket.emit('leaveChat', chatId);

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
    if (chat.messages.every((m) => m.id !== data.tempMessageId)) chat.messages.push(data.msg);
    socket.emit('messageDelivered', { messageId: data.msg.id, chatId: data.msg.chat_id });
  }
});

socket.on('tickUpdated', (data: { msg: MessageI; tick: string; tempMessageId: string }) => {
  const chat = chatStore.chats.find((c) => c.id === data.msg.chat_id);
  if (chat) chat.messages[chat.messages.findIndex((m) => m.id === data.tempMessageId)] = data.msg;
});
