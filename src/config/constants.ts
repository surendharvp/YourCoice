export const API_BASE_URL = 'http://localhost:8080/api';
export const WS_BASE_URL = 'ws://localhost:8080/ws';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
  },
  USERS: {
    PROFILE: '/users/profile',
    TRANSACTIONS: '/users/transactions',
  },
  REQUESTS: {
    BASE: '/requests',
    DETAIL: (id: string) => `/requests/${id}`,
    BIDS: (id: string) => `/requests/${id}/bids`,
  },
  MESSAGES: {
    BASE: '/messages',
    CONVERSATION: (userId: string) => `/messages/conversation/${userId}`,
  },
  NOTIFICATIONS: {
    BASE: '/notifications',
    MARK_READ: '/notifications/mark-read',
  },
};