import React, { useEffect } from 'react'
import './homepage.css'
import { Carousel } from 'react-bootstrap'
import CarouselImage from '../../components/carouselImage/CarouselImage';
import MoviesSlider from '../../components/MoviesSlider/MoviesSlider';
import { Typography } from '@mui/material';
import { useState } from 'react'



const HomePage = () => {
    const [allFilms, setAllFilms] = useState([]);


    useEffect(() => {
        getFilms().catch((err) => alert(err.message));
    }, []);

    async function getFilms() {
        const data = await fetch("http://127.0.0.1:3001/api/movies");
        const films = await data.json();
        setAllFilms(films);
    }

    function findPlayingNow() {
        return [...allFilms].sort((a, b) => b.year - a.year);
    }

    function findActionMovies(displayedGenre) {
        return [...allFilms].filter(film => film.genres.find(genre => genre === displayedGenre)).sort((a, b) => b.year - a.year)
    }



    //do rozwazenia <Carousel fade>
    return (
        <div className='homepage'>

            <Carousel fade>
                {allFilms.slice(9, 12).map((movie, index) => (
                    <Carousel.Item key={index} interval={8000}>
                        <CarouselImage movie={movie} />
                    </Carousel.Item>
                ))}
            </Carousel>
            <div className='moviesLists'>
                <div className='playingNow'>
                    <MoviesSlider
                        title="PLAYING NOW"
                        slideToShow={5}
                        width="370px"
                        widthHover="390px"
                        height="480px"
                        heightHover="500px"
                        allFilms={findPlayingNow()}
                    />
                </div>
                <div className='popularList'>
                    <MoviesSlider
                        title="CULT FAVORITES"
                        slideToShow={4}
                        width="480px"
                        widthHover="500px"
                        height="290px"
                        heightHover="310px"
                        allFilms={allFilms}
                    />
                </div>
                <div className='actionBox'>
                    <div className='actionTitle'>
                        <Typography variant='h2' sx={{ fontFamily: 'poppins', margin: '7px' }}>ACTION-PACKED</Typography>
                    </div>
                    <div className='actionPacked'>
                        <MoviesSlider
                            slideToShow={5}
                            width="240px"
                            widthHover="260px"
                            height="310px"
                            heightHover="330px"
                            allFilms={findActionMovies("Action")}/>
                    </div>
                </div>
                <div className='laughOutLoudBox'>
                    <div className='laughOutLoudTitle'>
                        <Typography variant='h2' sx={{ fontFamily: 'poppins', margin: '7px' }}>LAUGH OUT LOUD</Typography>
                    </div>
                    <div className='laughOutLoud'>
                        <MoviesSlider
                            slideToShow={5}
                            width="240px"
                            widthHover="260px"
                            height="310px"
                            heightHover="330px"
                            allFilms={findActionMovies("Comedy")}
                             />
                    </div>
                </div>
                <div className='dramaMoviesList'>
                    <MoviesSlider
                        title="HISTORICAL EPICS"
                        slideToShow={3}
                        width="520px"
                        widthHover="540px"
                        height="600px"
                        heightHover="620px"
                        allFilms={findActionMovies("History")}/>
                </div>
            </div>
        </div >
    )
}

export default HomePage;
