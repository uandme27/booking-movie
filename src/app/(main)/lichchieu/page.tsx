'use client'
import React, { useEffect } from 'react'
import Showtimes from '../components/showtime/Showtimes'
import MovieSlider from '../components/MovieSlider'
import LoadingMovies from '../components/LoadingMovies'
import { useGetMovieQuery } from '@/app/redux/features/movie/movie.service'
import ThanhToanTienMat from '../components/showtime/ThanhToanTienMat'


export default function Page() {
    const { data } = useGetMovieQuery()
    const movies = data?.movie

    return (
        <div>

            <div className="py-8">

                <h1 className="flex  justify-center text-3xl font-bold mb-4 ">
                    Phim sắp chiếu
                </h1>
                {movies && movies.length > 0 ? (
                    <MovieSlider movies={movies} />
                    // <LoadingMovies />

                ) : (
                    <LoadingMovies />
                )}

            </div>
            <div className="py-8">
                <h1 className="flex  justify-center text-3xl font-bold mb-4 ">Lịch chiếu phim</h1>
                <Showtimes></Showtimes>
            </div>
        </div>
    )
}
