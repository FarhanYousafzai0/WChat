// features/chatSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMessages, sendMessage } from './MessageService';

// Async thunk to fetch messages between two users




const initialState = {
selectedUser: null,  
    messages: [], 
    messageLoading:false,
    messageError:false,
    messageSuccess:false
}





export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async (getMessages,thunkAPI) => {
   try {
     const messages = await getMessages(getMessages);
    return messages;
   } catch (error) {
    thunkAPI.rejectWithValue(error.response?.data.message)
   }
  }
);

// Async thunk to send a new message
export const sendNewMessage = createAsyncThunk(
  'chat/sendNewMessage',
  async (data,thunkAPI) => {
    try {
        const newMessage = await sendMessage(data);
    return newMessage;
        
    } catch (error) {
        thunkAPI.rejectWithValue(error.response?.data?.message)
    }
  }
);

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
      state.messages = []; // reset messages when switching users (optional)
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchMessages.rejected, (state, action) => {
      state.messageError = true
      })
    .addCase(fetchMessages.pending, (state, action) => {
        messageLoading = true
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messageSuccess = true
        state.messages = action.payload;
      })

      .addCase(sendNewMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      });
  }
});

export const { setSelectedUser } = chatSlice.actions;
export default chatSlice.reducer;
