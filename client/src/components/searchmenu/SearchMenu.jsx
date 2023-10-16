import "./SearchMenu.css";
import React from "react";
import { useState, useEffect } from "react";

const SearchMenu = ({ allFilms, setFilteredFilms }) => {
    const [localFilteredFilms, setLocalFilteredFilms] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [active, setActive] = useState("all");
    const allGenres = getFilmGenres(allFilms);

    useEffect(() => {
        if (allFilms) {
            setLocalFilteredFilms(allFilms);
            setFilteredFilms(allFilms);
        }
    }, [allFilms]);

    function getFilmGenres(films) {
        const allGenres = new Set();
        films.forEach((film) => {
            film.genres.forEach((genre) => {
                allGenres.add(genre.toLowerCase());
            });
        });
        return [...allGenres];
    }

    function handleOnchange(e) {
        setInputValue(e.target.value);
        const filtered = localFilteredFilms.filter((film) => {
            const filmTitleLowerCase = film.title.toLowerCase();
            const searchedStringLowerCase = e.target.value.toLowerCase();
            return filmTitleLowerCase.includes(searchedStringLowerCase);
        });
        setFilteredFilms(filtered);
    }

    function handleAllClick() {
        setLocalFilteredFilms(allFilms);
        setFilteredFilms(allFilms);
        setInputValue("");
        setActive("all");
    }

    function handleGenreBtnClick(genre) {
        const filtered = allFilms.filter((film) => {
            const lowerCaseGenres = film.genres.map((genre) => genre.toLowerCase());
            return lowerCaseGenres.includes(genre);
        });
        setLocalFilteredFilms(filtered);
        setFilteredFilms(filtered);
        setInputValue("");
        setActive(genre);
    }

    return (
        <div className="SearchMenu">
            <form className="SearchField">
                <input
                    className="input dark"
                    name="title"
                    type="text"
                    placeholder="Movie title.."
                    value={inputValue}
                    onChange={handleOnchange}
                />
            </form>
            <div className="FilterButtons">
                <button className={active === "all" ? "Button active dark" : "Button dark"} onClick={handleAllClick}>
                    all
                </button>
                {allGenres.map((genre, index) => (
                    <button
                        className={active === genre ? "Button active dark" : "Button dark"}
                        key={index}
                        onClick={() => handleGenreBtnClick(genre)}
                    >
                        {genre}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SearchMenu;
