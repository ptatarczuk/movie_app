import { useState } from 'react';
import './MiniMovie.css'
import { Card, CardContent, Typography, CardMedia, Tooltip, Fade } from '@mui/material';
import { useNavigate } from "react-router-dom";


const MiniMovie = ({ width, widthHover, height, heightHover, movie }) => {
    const navigate = useNavigate();
    const [hover, setHover] = useState(false);

    return (
        <Card
            sx={{
                width: hover ? widthHover : width,
                height: hover ? heightHover : height,

            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => navigate(`/movies/${movie._id}`)}
        >
            <CardContent sx={{ position: 'relative' }}>
                <CardMedia
                    sx={{
                        position: 'absolute',
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        filter: hover ? 'blur(2.5px)' : 'none',
                        border: hover ? '3px solid red' : "1px solid #232531",
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 1,
                            background: `linear-gradient(to bottom, rgba(0,0,0,0) 30%, #1d1e21 100%)`,
                        },
                        
                        
                    }}
                    image={movie ? movie.url : ""} title="movie" />

                <Fade in={hover} timeout={1000}>
                    <div className='description'>
                        <Tooltip>
                            <Typography className='description' variant="body1">
                             {movie ? movie.plot : ""}
                            </Typography>
                        </Tooltip>
                    </div>
                </Fade>
            </CardContent>
        </Card>
    );
};

export default MiniMovie;