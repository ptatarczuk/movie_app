import RightDrawer from "../../components/RightDrawer/RightDrawer";
import MovieThumbnail from "../../components/Moviethumbnail/MovieThumbnail";
import "./Watchlist.css";
import { useState, useEffect, useContext } from "react";
import UserContext from "../../authHelpers/UserContext";

function Watchlist() {
    const [allFilms, setAllFilms] = useState([]);
    const [filteredFilms, setFilteredFilms] = useState([]);
    const { loggedUser, setLoggedUser } = useContext(UserContext);

    useEffect(() => {
        let user;
        if (sessionStorage.getItem("user")) {
            const userJSON = sessionStorage.getItem("user")
            user = JSON.parse(userJSON)
            setLoggedUser(user);
        }
        if (user) {
            getUserWatchListMovieIds(user).catch((err) => alert(err.message));
        }
    }, []);

    async function getFilms(userMovieIds) {
        const data = {
            movieIds: userMovieIds,
        };
        try {
            const response = await fetch(`http://127.0.0.1:3001/api/movies`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const films = await response.json();
            setAllFilms(films);
            setFilteredFilms(films);
        } catch (error) {
            alert(error.message);
        }
    }

    async function getUserWatchListMovieIds(loggedUser) {
        const data = await fetch(`http://127.0.0.1:3001/api/users/${loggedUser._id}`);
        const userMovieIds = await data.json();
        await getFilms(userMovieIds);
    }

    return (
        <div className="Movies">
            <div className="Main dark">
                {filteredFilms.map((film, index) => (
                    <MovieThumbnail key={index} film={film} />
                ))}
            </div>
            <div className="Drawer">
                <RightDrawer allFilms={allFilms} filteredFilms={filteredFilms} setFilteredFilms={setFilteredFilms} />
            </div>
        </div>
    );
}

export default Watchlist;
