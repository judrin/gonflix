import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { tvApi } from 'api';

export const fetchTVShows = createAsyncThunk(
  'tv/fetchTVShows',
  async () => {
    console.log('test');
    // throw Error('handling redux error');
    return await Promise.all([
      tvApi.topRated(),
      tvApi.popular(),
      tvApi.airingToday()
    ])
  }
)

export const tvSlice = createSlice({
  name: 'tv',
  initialState: {
    topRated: [],
    popular: [],
    airingToday: [],
    favorites: {},
    loading: true,
    error: null
  },
  reducers: {
    updateFavorites: (state, action) => {
      state.favorites = action.payload;
    }
  },
  extraReducers: {
    [fetchTVShows.fulfilled]: (state, action) => {
      try {
        const favorites = localStorage.getItem('tvFavorites');
        const [
          topRatedResponse,
          popularResponse,
          airingTodayResponse
        ] = action.payload;

        state.favorites = favorites ? JSON.parse(favorites) : {};
        state.topRated = topRatedResponse.data.results;
        state.popular = popularResponse.data.results;
        state.airingToday = airingTodayResponse.data.results;
        state.loading = false; 
      } catch (error) {
        state.error = "Can't find TV information.";
        state.loading = false;
      }
    }
  }
});

export const { updateFavorites } = tvSlice.actions;

export default tvSlice.reducer;