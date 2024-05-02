'use client'
import React from 'react'
import MovieSlider from '../components/MovieSlider'
import LoadingMovies from '../components/LoadingMovies'
import { useGetMovieQuery } from '@/app/redux/features/movie/movie.service'
import { Image } from 'antd'
import Link from 'next/link'
import FindMovie from './FindMovie'
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
            {movies && movies.length > 0 ? (
                <FindMovie movies={movies}></FindMovie>
            ) : (
                <LoadingMovies />
            )}
        </div>
    )
}
