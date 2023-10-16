import React, { useState } from "react";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserContext from './authHelpers/UserContext'
import {useEffect} from "react"

const root = ReactDOM.createRoot(document.getElementById('root'));

const AppWrapper = () => {
  const [loggedUser, setLoggedUser] = useState(null)

  useEffect(() => {
    if (sessionStorage.getItem("user")) {
        const userJSON = sessionStorage.getItem("user")
        setLoggedUser(JSON.parse(userJSON))
    }
  }, [])
  


  return (
    <UserContext.Provider value={{ loggedUser: loggedUser, setLoggedUser: setLoggedUser }}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
     </UserContext.Provider>
    )
}

root.render(<AppWrapper />);

