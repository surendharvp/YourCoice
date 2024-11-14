import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    apiClient.post('/auth/login', credentials),
  register: (userData: { email: string; password: string; name: string }) =>
    apiClient.post('/auth/register', userData),
  logout: () => apiClient.post('/auth/logout'),
};

export const requestsApi = {
  getAll: () => apiClient.get('/requests'),
  getById: (id: string) => apiClient.get(`/requests/${id}`),
  create: (request: any) => apiClient.post('/requests', request),
  update: (id: string, request: any) => apiClient.put(`/requests/${id}`, request),
  delete: (id: string) => apiClient.delete(`/requests/${id}`),
  submitBid: (requestId: string, bid: any) => 
    apiClient.post(`/requests/${requestId}/bids`, bid),
};

export const userApi = {
  getProfile: () => apiClient.get('/users/profile'),
  updateProfile: (profile: any) => apiClient.put('/users/profile', profile),
  getTransactions: () => apiClient.get('/users/transactions'),
};

export const websocketApi = {
  connect: (userId: string) => {
    const socket = new WebSocket(`ws://localhost:8080/ws?userId=${userId}`);
    
    socket.onopen = () => {
      console.log('WebSocket Connected');
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      // Handle different message types
      switch (message.type) {
        case 'NEW_BID':
          // Dispatch action to update bids
          break;
        case 'MESSAGE':
          // Dispatch action to update messages
          break;
        case 'NOTIFICATION':
          // Dispatch action to update notifications
          break;
      }
    };

    return socket;
  },
};

export default apiClient;