import { Client } from '@stomp/stompjs';
import { WS_BASE_URL } from '../config/constants';

let stompClient: Client | null = null;

export const websocketService = {
  connect(userId: string, onMessageReceived: (message: any) => void) {
    if (stompClient) {
      this.disconnect();
    }

    stompClient = new Client({
      brokerURL: WS_BASE_URL,
      connectHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      onConnect: () => {
        console.log('Connected to WebSocket');
        
        // Subscribe to private messages
        stompClient?.subscribe(`/user/${userId}/queue/messages`, (message) => {
          const receivedMessage = JSON.parse(message.body);
          onMessageReceived(receivedMessage);
        });

        // Subscribe to notifications
        stompClient?.subscribe(`/user/${userId}/queue/notifications`, (message) => {
          const notification = JSON.parse(message.body);
          onMessageReceived(notification);
        });

        // Subscribe to request updates
        stompClient?.subscribe('/topic/requests', (message) => {
          const update = JSON.parse(message.body);
          onMessageReceived(update);
        });
      },
      onDisconnect: () => {
        console.log('Disconnected from WebSocket');
      },
      reconnectDelay: 5000,
    });

    stompClient.activate();
  },

  disconnect() {
    if (stompClient) {
      stompClient.deactivate();
      stompClient = null;
    }
  },

  sendMessage(destination: string, message: any) {
    if (stompClient?.connected) {
      stompClient.publish({
        destination,
        body: JSON.stringify(message),
      });
    }
  },
};