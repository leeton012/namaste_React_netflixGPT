import { createSlice } from '@reduxjs/toolkit';

const movieSlice = createSlice({
    name: 'movies',
    initialState: {
        nowPlayingMovies: null,
        videoTrailer: null,
        popularMovies: null,
    },
    reducers: {
        addNowPlayingMovie: (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        addPopularMovie: (state, action) => {
            state.popularMovies = action.payload;
        },
        addVideoTrailer: (state, action) => {
            state.videoTrailer = action.payload;
        },
    },
});

export const { addNowPlayingMovie, addVideoTrailer, addPopularMovie } = movieSlice.actions;

export default movieSlice.reducer;
