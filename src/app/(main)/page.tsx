"use client";
import SliderHome from "./components/SliderHome";
import MovieSlider from "./components/MovieSlider";
import { useEffect, useState } from "react";
import Review from "./components/Review";
import TopMovieHome from "./components/TopMovieHome";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from "../redux/features/movie/movieSlice";
import LoadingMovies from "./components/LoadingMovies";






const Home: React.FC = () => {

  return (
    <>
      <SliderHome />
      <div className="py-8">
        <h1 className="flex justify-center text-3xl font-bold mb-4 ">
          Phim đang chiếu
        </h1>
        <MovieSlider />
      </div>
      <Review></Review>
      <div className="py-8">
      </div>
      <TopMovieHome></TopMovieHome>

    </>
  );
};

export default Home;
