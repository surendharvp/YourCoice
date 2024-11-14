import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import requestsReducer from './slices/requestsSlice';
import transactionsReducer from './slices/transactionsSlice';
import notificationsReducer from './slices/notificationsSlice';
import messagesReducer from './slices/messagesSlice';
import skillsReducer from './slices/skillsSlice';
import bidsReducer from './slices/bidsSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    requests: requestsReducer,
    transactions: transactionsReducer,
    notifications: notificationsReducer,
    messages: messagesReducer,
    skills: skillsReducer,
    bids: bidsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;