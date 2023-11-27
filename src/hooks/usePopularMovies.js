import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addPopularMovie } from '../utils/movieSlice';
import { useEffect } from 'react';
import { API_OPTION } from '../utils/constant';

const usePopularMovies = () => {
    // Fetch the now playing movies from TMDB api and update redux store
    const dispatch = useDispatch();

    const getPopularMovies = async () => {
        const result = await axios.get('https://api.themoviedb.org/3/movie/popular?page=1', API_OPTION);
        // dispatch the action to get the movieds in redux Store
        dispatch(addPopularMovie(result.data.results));
    };

    useEffect(() => {
        getPopularMovies();
    }, []);
};

export default usePopularMovies;
