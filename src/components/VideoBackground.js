import React from 'react';
import { useSelector } from 'react-redux';
import useMovieTrailer from '../hooks/useMovieTrailer';

const VideoBackground = ({ movieID }) => {
    const trailer = useSelector((store) => store.movies.videoTrailer);
    // call custom hook to fetch the trailer
    useMovieTrailer(movieID);

    return (
        <div className='w-screen'>
            <iframe
                className='w-screen aspect-video'
                src={`https://www.youtube.com/embed/${trailer?.key}?si=ipo7fhru5SXMyGdv&autoplay=1&mute=1`}
                title='YouTube video player'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                allowFullScreen></iframe>
        </div>
    );
};

export default VideoBackground;
