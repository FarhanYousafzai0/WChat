import { configureStore } from '@reduxjs/toolkit';
import UserReducer from '../features/UserSlice'
import chatReducer from '../features/Messages/MessageSlice'; // ✅ correct import

export const store = configureStore({
  reducer: {
    auth: UserReducer,
    chat: chatReducer 
  },
});
