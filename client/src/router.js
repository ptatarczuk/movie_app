import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage";
import Navbar from "./Pages/Navbar/NavBar";
import HomePage from "./Pages/Homepage/HomePage";
import Movies from "./Pages/Movies/Movies";
import Movie from "./Pages/Movie/Movie";
import Login from "./Pages/Login/Login";
import Watchlist from "./Pages/Watchlist/Watchlist"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navbar />,
        errorElement: <ErrorPage />,
        children: [
            { path: "/", element: <HomePage /> },
            { path: "/movies", element: <Movies /> },
            { path: "/movies/:id", element: <Movie /> },
            { path: "/login", element: <Login /> },
            { path: "/user", element: <Watchlist /> }
        ],
    },
]);

export default router;
