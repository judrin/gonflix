import { configureStore } from '@reduxjs/toolkit';
import tvReducer from './modules/tv';

const store = configureStore({
  reducer: tvReducer
});

export default store;