import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Notification {
  id: string;
  type: 'message' | 'booking' | 'review' | 'system';
  content: string;
  time: string;
}

interface NotificationsState {
  list: Notification[];
  unreadCount: number;
}

const initialState: NotificationsState = {
  list: [],
  unreadCount: 0,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.list = action.payload;
      state.unreadCount = action.payload.length;
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.list.unshift(action.payload);
      state.unreadCount += 1;
    },
    markAllAsRead: (state) => {
      state.unreadCount = 0;
    },
  },
});

export const { setNotifications, addNotification, markAllAsRead } = notificationsSlice.actions;
export default notificationsSlice.reducer;