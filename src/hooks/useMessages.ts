import { useEffect, useCallback } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import {
  initializeWebSocket,
  sendMessage,
  sendTypingNotification,
  disconnectWebSocket,
} from '../services/messageService';

export const useMessages = (userId: string) => {
  const dispatch = useAppDispatch();
  const { messages, typingUsers } = useAppSelector((state) => state.messages);

  useEffect(() => {
    if (userId) {
      initializeWebSocket(userId);
      return () => {
        disconnectWebSocket();
      };
    }
  }, [userId]);

  const sendNewMessage = useCallback((recipientId: string, content: string) => {
    sendMessage(recipientId, content);
  }, []);

  const notifyTyping = useCallback((recipientId: string) => {
    sendTypingNotification(recipientId);
  }, []);

  return {
    messages,
    typingUsers,
    sendMessage: sendNewMessage,
    notifyTyping,
  };
};

export default useMessages;