import './carouselImage.css'
import { Carousel } from 'react-bootstrap'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import UserContext from "../../authHelpers/UserContext";
import { addOrDeleteInWatchlist } from '../../Pages/Movie/Movie';


const CarouselImage = ({ movie }) => {
  const { url, title, runtime, year, genres, _id } = movie
  const { loggedUser } = useContext(UserContext);
  const navigate = useNavigate();

  function handleOnclick() {
    console.log(_id)
    console.log(loggedUser)
    if (loggedUser) {
      addOrDeleteInWatchlist(_id, loggedUser.username, "add");
      alert("Movie has been added to watchlist");
    } else {
      alert("Log in to be able to add movies to watchlist");
    }
  }

  return (
    <div className='carouselImage'>
      <img
        className="carouselImage"
        src={url}
        alt="First slide"
      />
      <Carousel.Caption>
        <h3
          onClick={() => navigate(`/movies/${_id}`)}
          className='title'>{title}</h3>
        <p className='genre'>{genres.join(', ')}</p>
        <p className='runtime'>{runtime} min</p>
        <p className='releaseDate' >Release year: {year}</p>
        <Button
          variant="outlined"
          size="xx-large"
          className='watchlist'
          sx={{
            color: 'white',
            fontSize: '20px',
            fontFamily: "poppins",
            fontWeight: 'bold', '&:focus': {
              outline: '2px solid white',
            },
          }}
          onClick={handleOnclick}
        >
          <AddCircleOutlineIcon
            sx={{ fontSize: '27px', margin: '10px' }}
          />
          Add to watchlist
        </Button>
      </Carousel.Caption>
    </div>


  )
}

export default CarouselImage