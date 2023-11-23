import axios from "axios"
import { useDispatch } from "react-redux"
import { addNowPlayingMovie } from "../utils/movieSlice"
import { useEffect } from "react"
import { API_OPTION } from "../utils/constant"

const useNowPlayingMovies = () => {
    // Fetch the now playing movies from TMDB api and update redux store
    const dispatch = useDispatch()

    const getNowPlayingMovies = async () => {
        const result = await axios.get("https://api.themoviedb.org/3/movie/now_playing?page=1", API_OPTION)
        // dispatch the action to get the movieds in redux Store
        dispatch(addNowPlayingMovie(result.data.results))
    }

    useEffect(() => {
        getNowPlayingMovies()
    }, [])
}

export default useNowPlayingMovies;