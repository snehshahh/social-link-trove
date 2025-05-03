import { configureStore } from '@reduxjs/toolkit';
import linksReducer from './slices/linksSlice';
import uiReducer from './slices/uiSlice.ts';
import linkCardReducer from './slices/linkCardSlice';
import collectionsReducer from './slices/collectionsSlice';
import messageReducer from './slices/messageSlice';

export const store = configureStore({
  reducer: {
    links: linksReducer,
    ui: uiReducer,
    linkCard: linkCardReducer,
    collections: collectionsReducer,
    messages: messageReducer, // Add the messages reducer to the store

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
