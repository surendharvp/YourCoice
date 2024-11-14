import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: string;
}

interface TypingNotification {
  userId: string;
  isTyping: boolean;
}

interface MessagesState {
  messages: Message[];
  typingUsers: { [key: string]: boolean };
  loading: boolean;
  error: string | null;
}

const initialState: MessagesState = {
  messages: [],
  typingUsers: {},
  loading: false,
  error: null,
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    setTyping: (state, action: PayloadAction<TypingNotification>) => {
      state.typingUsers[action.payload.userId] = action.payload.isTyping;
    },
    clearMessages: (state) => {
      state.messages = [];
      state.typingUsers = {};
    },
  },
});

export const { addMessage, setTyping, clearMessages } = messagesSlice.actions;
export default messagesSlice.reducer;