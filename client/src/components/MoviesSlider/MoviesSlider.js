import React from "react";
import Slider from "react-slick";
import MiniMovie from "../MiniMovie/MiniMovie";
import './moviesSlider.css'
import { Typography } from '@mui/material'
import { useState, useEffect } from "react";

const MoviesSlider = ({ title, slideToShow, width, widthHover, height, heightHover, allFilms }) => {
    const [movieToDisplayList, setMovieToDisplayList] = useState([])

    useEffect(() => {
        if (allFilms) {
            setMovieToDisplayList(allFilms)
        }
    }, [allFilms])


    const settings = {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 200,
        slidesToShow: slideToShow,
        slidesToScroll: 3,
    }
//map???
    return (
        <>
            <Typography
                variant='h4'
                className='title'
                sx={{
                    fontFamily: 'poppins',
                    margin: '7px',
                    color: '#DD4F4E'
                }}>
                {title}
            </Typography>
            <Slider {...settings}>
                {( movieToDisplayList.slice(0, 10).map((movie, index) => (
                    <div key={index}>
                        <MiniMovie
                            width={width}
                            widthHover={widthHover}
                            height={height}
                            heightHover={heightHover}
                            movie={movie}
                        />
                    </div>
                )))}
            </Slider>
        </>
    );

}

export default MoviesSlider;