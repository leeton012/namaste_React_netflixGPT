import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addVideoTrailer } from '../utils/movieSlice';
import { useEffect } from 'react';
import { API_OPTION } from '../utils/constant';

const useMovieTrailer = (movieID) => {
    // call the videos api from TMDB and fetch the trailer ofg the movie and store it in redux store
    const dispatch = useDispatch();
    const getMovieVideos = async () => {
        const result = await axios(`https://api.themoviedb.org/3/movie/${movieID}/videos?language=en-US`, API_OPTION);

        const filteredVideos = result.data.results.filter((video) => video.type === 'Trailer');
        const trailer = filteredVideos.length ? filteredVideos[1] : result.data.results[0];
        dispatch(addVideoTrailer(trailer));
    };

    useEffect(() => {
        getMovieVideos();
    }, []);
};

export default useMovieTrailer;
