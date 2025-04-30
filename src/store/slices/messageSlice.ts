import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Message } from '@/types/message';

interface MessagesState {
  messages: Message[];
  loading: boolean;
  error: string | null;
  currentChat: string | null;
}

// Dummy data for development purposes
const dummyMessages: Message[] = [
  {
    id: '1',
    sender_id: 'user456',
    receiver_id: 'user123',
    content: 'Hey, have you checked out that GitHub link I sent?',
    shared_link_id: '1',
    shared_collection_id: null,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    status: 'read',
  },
  {
    id: '2',
    sender_id: 'user123',
    receiver_id: 'user456',
    content: 'Yes, it looks interesting! I bookmarked it for later.',
    shared_link_id: null,
    shared_collection_id: null,
    timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000),
    status: 'read',
  },
  {
    id: '3',
    sender_id: 'user456',
    receiver_id: 'user123',
    content: 'Great! I also have a collection of React resources to share with you.',
    shared_link_id: null,
    shared_collection_id: 'col1',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    status: 'read',
  },
  {
    id: '4',
    sender_id: 'user123',
    receiver_id: 'user456',
    content: 'That would be super helpful, thanks!',
    shared_link_id: null,
    shared_collection_id: null,
    timestamp: new Date(Date.now() - 11 * 60 * 60 * 1000),
    status: 'read',
  },
  {
    id: '5',
    sender_id: 'user789',
    receiver_id: 'user123',
    content: 'Have you seen this new Tailwind CSS tutorial?',
    shared_link_id: '4',
    shared_collection_id: null,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    status: 'unread',
  }
];

const initialState: MessagesState = {
  messages: dummyMessages,
  loading: false,
  error: null,
  currentChat: null,
};

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (userId: string) => {
    // In a real implementation, this would be an API call
    // that fetches messages for the given user
    return dummyMessages.filter(
      m => m.sender_id === userId || m.receiver_id === userId
    );
  }
);

export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async (message: Omit<Message, 'id' | 'timestamp' | 'status'>) => {
    // In a real implementation, this would be an API call to send a message
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
      status: 'sent',
    };
    
    return newMessage;
  }
);

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    updateMessageStatus: (state, action: PayloadAction<{ id: string, status: string }>) => {
      const message = state.messages.find(m => m.id === action.payload.id);
      if (message) {
        message.status = action.payload.status;
      }
    },
    deleteMessage: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter(m => m.id !== action.payload);
    },
    setCurrentChat: (state, action: PayloadAction<string | null>) => {
      state.currentChat = action.payload;
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      state.messages.forEach(message => {
        if (message.sender_id === action.payload && message.status === 'unread') {
          message.status = 'read';
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch messages';
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      });
  },
});

export const {
  addMessage,
  updateMessageStatus,
  deleteMessage,
  setCurrentChat,
  markAsRead,
} = messagesSlice.actions;

export default messagesSlice.reducer;