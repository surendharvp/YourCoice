import { Client } from '@stomp/stompjs';
import { addMessage, setTyping } from '../redux/slices/messagesSlice';
import { store } from '../redux/store';

let stompClient: Client | null = null;

export const initializeWebSocket = (userId: string) => {
  if (stompClient) {
    return;
  }

  stompClient = new Client({
    brokerURL: 'ws://localhost:8080/ws',
    connectHeaders: {
      userId: userId,
    },
    onConnect: () => {
      console.log('Connected to WebSocket');
      
      // Subscribe to private messages
      stompClient?.subscribe(`/user/${userId}/queue/messages`, (message) => {
        const receivedMessage = JSON.parse(message.body);
        store.dispatch(addMessage(receivedMessage));
      });

      // Subscribe to typing notifications
      stompClient?.subscribe(`/user/${userId}/queue/typing`, (notification) => {
        const typingInfo = JSON.parse(notification.body);
        store.dispatch(setTyping(typingInfo));
      });
    },
    onDisconnect: () => {
      console.log('Disconnected from WebSocket');
    },
  });

  stompClient.activate();
};

export const sendMessage = (recipientId: string, content: string) => {
  if (!stompClient?.connected) {
    return;
  }

  stompClient.publish({
    destination: '/app/chat.send',
    body: JSON.stringify({
      recipientId,
      content,
      timestamp: new Date().toISOString(),
    }),
  });
};

export const sendTypingNotification = (recipientId: string) => {
  if (!stompClient?.connected) {
    return;
  }

  stompClient.publish({
    destination: '/app/chat.typing',
    body: recipientId,
  });
};

export const disconnectWebSocket = () => {
  if (stompClient) {
    stompClient.deactivate();
    stompClient = null;
  }
};