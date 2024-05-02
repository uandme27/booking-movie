"use client";
import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import SliderButton from "./SliderButton";
import MovieModal from "./MovieModal";
import { Movie } from "./any";


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Button } from 'antd';


import { useGetMovieQuery } from "@/app/redux/features/movie/movie.service";
import LoadingMovies from "./LoadingMovies";



const MovieSlider = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const sliderRef = useRef<Slider>(null);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setOpen(true)

  };
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    console.log("đóng")
    setOpen(false);
  };

  const { data }: any = useGetMovieQuery()
  console.log(data)
  const movies: any = data?.movie

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
      <div className="slider-container">
        {movies && movies.length > 0 ? (
          <Slider {...settings}>
            {movies?.map((movie: any, index: number) => {
              return (<>
                <Card key={index} className="mt-8 mx-auto" sx={{ maxWidth: 345 }} onClick={() => handleMovieClick(movie)}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="80"
                      image={movie.image?.url}
                      alt="green iguana"

                    />
                    <CardContent>
                      <h3>{movie.name}</h3>
                    </CardContent>
                  </CardActionArea>
                </Card >
                {selectedMovie && (
                  <MovieModal
                    open={open}
                    onClose={handleClose}
                    movie={selectedMovie}
                  />
                )}
              </>)
            })}
          </Slider>
        ) : (
          <LoadingMovies />
        )}
      </div >
    </>
  )
}

export default MovieSlider
