import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  chatOpen : false,
  appStage : 'login',  // 'login' | 'chat' | 'interview' | 'end',
  chatStage : "askUpload",  // 'askUpload' | 'parsing' | 'confirm' | 'edit' | 'interviewReady',
  chatOpen : false,
  showWelcomeMessage : false,
  trasitionDirection : 'up'  
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setAppStage: (state, action) => {
      state.appStage = action.payload;
    },

    openChat: (state) => {
      state.chatOpen = true;
    },
    
    closeChat: (state) => {
      state.chatOpen = false;
    },

    toggleChat: (state) => {
      state.chatOpen = !state.chatOpen;
    },

    setChatStage: (state, action) => {
      const nextStage = action.payload;
      const order = ['askUpload', 'parsing', 'confirm', 'edit', 'interviewReady'];
      const currentIndex = order.indexOf(state.chatStage);
      const nextIndex = order.indexOf(nextStage);
      state.trasitionDirection = nextIndex >= currentIndex ? 'up' : 'down';
      state.chatStage = nextStage;
    },

    showWelcomeModal: (state, action) => {
      state.showWelcomeMessage = action.payload;
    },

    hideWelcomeModal: (state) => {
      state.showWelcomeMessage = false;
    },
    
    resetUI: () => ({ ...initialState }),
  },

});

export const {
  setAppStage,
  setChatStage,
  openChat,
  closeChat,
  toggleChat,
  showWelcomeModal,
  hideWelcomeModal,
  resetUI,
} = uiSlice.actions;

export default uiSlice.reducer;