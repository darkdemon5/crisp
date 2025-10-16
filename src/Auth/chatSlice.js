import { createSlice } from "@reduxjs/toolkit";



const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
  },
  reducers: {
    addBotMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    addUserMessage: (state, action) => {
      state.messages.push({ sender: "user", text: action.payload });
    },
    resetChat: (state) => {
      state.messages = [];
    },
  },
})


export const { addBotMessage, addUserMessage, resetChat } = chatSlice.actions;
export default chatSlice.reducer;