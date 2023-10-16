import React from 'react'
import './MovieThumbnail.css';
import { useNavigate } from "react-router-dom";

const MovieThumbnail = ({ setMovieThumbnailClicked, film,  setClickedMovie } ) => {
const navigate = useNavigate();
  
   return (
     <div className='movieThumbnail dark'>
            <button className='movieThumbnailButton goToMovie dark'
               onClick={() => navigate(`/movies/${film._id}`)}
            >
               <div className='movieListButtonImage dark'>
                     <img src={film.url} alt={film.title} />
               </div>
               <div className='movieThumbnailButtonName dark'>
                     <h3>{film.title}</h3> 
               </div>
               <div className='movieThumbnailButtonGenre dark'>
                  <p>{film.genres}</p>
               </div>
               <div className='movieThumbnailButtonRuntime dark'>
                  <p>{`${film.runtime} minutes`}</p>
               </div>
            </button>
     </div>
  )
}

export default MovieThumbnail;