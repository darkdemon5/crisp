import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  phone: "",
  answers: [],
  currentQuestionIndex: 0,
  scores: [],
  interviewCompleted: false,
  timerRemaining: null,
  missingFields: ["name", "email", "phone"], 
};

const candidateSlice = createSlice({
  name: "candidate",
  initialState,
  reducers: {
    updateResume: (state, action) => {
      const parsedFields = action.payload?.parsedFields || action.payload || {};
      state.name = parsedFields.name || state.name;
      state.email = parsedFields.email || state.email;
      state.phone = parsedFields.phone || state.phone;
      state.missingFields = ["name", "email", "phone"].filter((f) => !state[f]);
      // Object.assign(state, action.payload.parsedFields);
    },

    updateCandidateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
      state.missingFields = ["name", "email", "phone"].filter((f) => !state[f]);
      // state.missingFields = state.missingFields.filter((f) => f !== field)
    },

    saveAnswer: (state, action) => {
      state.answers.push(action.payload);
    },

    nextQuestion: (state) => {
      state.currentQuestionIndex += 1;
    },

    setTimerRemaining: (state, action) => {
      state.timerRemaining = action.payload;
    },

    markCompleted: (state) => {
      state.interviewCompleted = true;
    },

    resetInterview: () => ({ ...initialState }),
  },
});

export const {
  updateResume,
  saveAnswer,
  nextQuestion,
  markCompleted,
  resetInterview,
  setTimerRemaining,
  updateCandidateField,
} = candidateSlice.actions;
export default candidateSlice.reducer;
