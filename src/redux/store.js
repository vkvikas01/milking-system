import { combineReducers } from "@reduxjs/toolkit";
import fetchSelectedMusicReducer from "./slices/fetchSelectedMusic/fetchSelectedMusic";

const appReducer = combineReducers({
  fetchSelectedMusic: fetchSelectedMusicReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "resetRedux/resetReduxState") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
