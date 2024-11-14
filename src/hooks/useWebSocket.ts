import { useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useDispatch } from 'react-redux';
import { addNotification } from '../redux/slices/notificationsSlice';
import { updateRequest } from '../redux/slices/requestsSlice';

const SOCKET_URL = 'http://localhost:8080/ws';

export const useWebSocket = (userId: string) => {
  const client = useRef<Client | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    client.current = new Client({
      webSocketFactory: () => new SockJS(SOCKET_URL),
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.current.onConnect = () => {
      // Subscribe to private messages
      client.current?.subscribe(`/user/${userId}/queue/messages`, (message) => {
        const receivedMessage = JSON.parse(message.body);
        // Handle received message
        console.log('Received message:', receivedMessage);
      });

      // Subscribe to notifications
      client.current?.subscribe(`/user/${userId}/queue/notifications`, (message) => {
        const notification = JSON.parse(message.body);
        dispatch(addNotification(notification));
      });

      // Subscribe to request updates
      client.current?.subscribe('/topic/requests', (message) => {
        const update = JSON.parse(message.body);
        dispatch(updateRequest(update));
      });
    };

    client.current.activate();

    return () => {
      client.current?.deactivate();
    };
  }, [userId, dispatch]);

  const sendMessage = (destination: string, body: any) => {
    if (client.current?.connected) {
      client.current.publish({
        destination,
        body: JSON.stringify(body),
      });
    }
  };

  return { sendMessage };
};

export default useWebSocket;