import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      console.log('Theme changed to:', state.theme);
    },
  }
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
