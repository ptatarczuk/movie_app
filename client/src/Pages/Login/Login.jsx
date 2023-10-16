import "./Login.css";
import { useContext } from "react";
import ReactSignupLoginComponent from "react-signup-login-component";
import { fetchData } from '../../environments'
import UserContext from '../../authHelpers/UserContext'
import { useNavigate } from 'react-router-dom'
import {apiURL} from '../../environments'
import {statusMessages} from '../../environments'

const headers = { "Content-Type": "application/json" };

const Login = () => {
    const { setLoggedUser } = useContext(UserContext)
    const navigate = useNavigate()
   

    const signupWasClickedCallback = async (data) => {
        const { username, password, passwordConfirmation } = data;
        if (!username || !password || !passwordConfirmation) {
            return alert("Missing required fields");
        }
        if (password !== passwordConfirmation) {
            return alert("Password do not match");
        }
        try {
            const response = await fetch(`${apiURL}/api/register`, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data),
            });
            if (statusMessages[response.status]) {
                return alert(statusMessages[response.status]);
            }
            return await response.json();
        } catch (err) {
            return alert("Error checking for existing user");
        }
    };

    const loginWasClickedCallback = async (data) => {
        try {
            const response = await fetchData(`${apiURL}/api/users`, "POST", data)
            if (response.token) {
                localStorage.setItem('token', response.token);
                setLoggedUser(response.user)
                sessionStorage.setItem("user", JSON.stringify(response.user))
                alert("You have successfully logged in! Let's explore the movie universe. You can now browse movies and add them to your favorites list.");
                navigate('/')
            } else {
                alert('Invalid username or password.')
            }
        } catch (err) {
            console.error(err);
        }
    };

    const recoverPasswordWasClickedCallback = async (data) => {
        try {
            //todo crate/api/login post endpoint and check if certain user exists on backend side
            const response = await fetch(`${apiURL}/api/users`);
            const users = await response.json();
            const user = users.find((user) => user.username === data.username);
            alert(user ? `Your passworod is: ${user.password}` : `User ${data.username} not found !`);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="LoginMain">
            <ReactSignupLoginComponent
                title="Movie DataBase"
                handleSignup={signupWasClickedCallback}
                handleLogin={loginWasClickedCallback}
                handleRecoverPassword={recoverPasswordWasClickedCallback}
                submitLoginCustomLabel="Login"
                submitSignupCustomLabel="Create"
            />
        </div>
    );
};

export default Login;
