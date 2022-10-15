import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
// import Card from "./components/Card/Card.js";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Flights from "./components/Flights/Flights";
import FlightsSearch from "./components/FlightsSearch/FlightsSearch";
import NavBar from "./components/NavBar/NavBar";
import Checkout from './components/Checkout/Checkout'
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { useDispatch } from "react-redux";
import { storeUserInfo } from "./Redux/Actions";

function App() {

    const [user, setUser] = useState(null)

    const dispatch = useDispatch()
  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:3001/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
            // const {id, displayName, photos} = resObject.user
            // dispatch(storeUserInfo({id, displayName, photos}))
            setUser(resObject.user)
            dispatch(storeUserInfo(resObject.user))
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);
  
  return (
    <div className="App">
      <BrowserRouter>
        <Route path={"/"} render={() => <NavBar/>} />
        <Route exact path="/" component={Home} />
        <Route exact path="/login" render={() => <Login/>} />
        <Route exact path={'/register'} render={() => <Register/>} />
        <Route exact path="/flightSearch" component={FlightsSearch} />
        <Route path="/flights" component={Flights} />
        <Route path="/" component={Footer} />
        <Route path="/p" render={() => <Checkout user={user} />} />
      </BrowserRouter>
    </div>
  );
}

export default App;