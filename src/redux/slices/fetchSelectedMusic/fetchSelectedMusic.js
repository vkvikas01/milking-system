import { createSlice } from "@reduxjs/toolkit";

const initialSTATE = {
  music: 0,
};

const fetchSelectedMusic = createSlice({
  name: "fetchSelectedMusic",
  initialState: initialSTATE,
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.payload && action.payload.isInitialState,
      (state, action) => {
        return initialSTATE;
      },
    );
  },
  reducers: {
    storeSelectedMusic(state, action) {
      state.music = action.payload.music;
    },
  },
});

export default fetchSelectedMusic.reducer;
export const { storeSelectedMusic } = fetchSelectedMusic.actions;
