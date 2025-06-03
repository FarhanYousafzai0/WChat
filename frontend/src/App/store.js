import { configureStore } from '@reduxjs/toolkit';
import UserReducer from '../features/UserSlice'
import MessageReducer from '../features/Messages/MessageSlice'
export const store = configureStore({
  reducer: {
  
    auth:UserReducer,
    message:MessageReducer
  },
});
