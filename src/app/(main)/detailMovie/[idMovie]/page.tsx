'use client'
import React, { useEffect } from 'react'
import DetailMovie from '../../components/DetailMovie';
import Showtimes from '../../components/showtime/Showtimes';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '@/app/redux/features/movie/movieSlice';
import MovieSlider from '../../components/MovieSlider';
import LoadingMovies from '../../components/LoadingMovies';

export default function Page({ params }: any) {
    const dispatch = useDispatch()
    const listMovies = useSelector((state: any) => state.movies.movies)
    const movies = listMovies.movie
    console.log(movies);
    const detailMV = movies?.find((movies: any) => movies._id === params.idMovie);
    console.log('asdas', detailMV);
    useEffect(() => {
        dispatch(fetchMovies())

    }, [])
    return (
        <>
            {detailMV ? (
                <DetailMovie movie={detailMV} ></DetailMovie>

            ) : (
                <LoadingMovies />
            )}

            <Showtimes></Showtimes>
            <div className="py-8">
                <h1 className="flex  justify-center text-3xl font-bold mb-4 ">
                    Phim sắp chiếu
                </h1>
                {movies && movies.length > 0 ? (
                    <MovieSlider movies={movies} />
                ) : (
                    <LoadingMovies />
                )}
            </div>
        </>
    )
}
