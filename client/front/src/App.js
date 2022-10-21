import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter, Route, useHistory } from "react-router-dom";
// import Card from "./components/Card/Card.js";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Flights from "./components/Flights/Flights";
import FlightsSearch from "./components/FlightsSearch/FlightsSearch";
import NavBar from "./components/NavBar/NavBar";
import Checkout from "./components/Checkout/Checkout";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import CardDetail from "./components/CardDetail/cardDetail";
import LogInButton from "./components/Login auth0/LogInAuth0";
import MiPerfil from "./components/MiPerfil/MiPerfil";
import { useDispatch } from "react-redux";
import { storeUserInfo } from "./Redux/Actions";

import { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";


function App() {
    const dispatch = useDispatch();
    //   useEffect(() => {
    //     const getUser = () => {
    //       fetch("http://localhost:3001/auth/login/success", {
    //         method: "GET",
    //         credentials: "include",
    //         headers: {
    //           Accept: "application/json",
    //           "Content-Type": "application/json",
    //           "Access-Control-Allow-Credentials": true,
    //         },
    //       })
    //         .then((response) => {
    //           if (response.status === 200) return response.json();
    //           throw new Error("authentication has been failed!");
    //         })
    //         .then((resObject) => {
    //           axios({
    //             method: "POST",
    //             data: {id: resObject.user._id},
    //             url: "/update",
    //         }).then((data) => {
    //           const obj = {
    //             name: data.data.name,
    //             photos: data.data.photo ? resObject.user.photo : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png",
    //             firstName: data.data.firstName,
    //             lastname: data.data.lastname,
    //             email: data.data.email,
    //             id: data.data._id,
    //             dni: data.data.dni,
    //             phone: data.data.phone,
    //             birthDate: data.data.birthDate
    //           };
    //           dispatch(storeUserInfo(obj))
    //         })
    //         })
    //         .catch((err) => {
    //           console.log(err);
    //         });
    //     };
    //     getUser();
    //   }, [dispatch]);

    const { user, logout } = useAuth0();

    console.log(user);

    useEffect(() => {
        console.log('hola');
        axios.post('/auth0/getUser', {user})
        .then((data) => {
            if(data.status === 200) return data.data
        })
        .then((user) => {
            if(user.active && !user.banned){
                window.localStorage.setItem('user', JSON.stringify(user))
                dispatch(storeUserInfo(user))
            }
            else if(!user.active && !user.banned){
                logout({returnTo:process.env.VERCEL_URL || "http://localhost:3000"}) //return to localhost/activar cuenta
                return alert('Usuario desactivado')
            }
            else if(!user.active && user.banned){
                logout({returnTo:process.env.VERCEL_URL || "http://localhost:3000"}) // return to locahost/ rickroll
                return alert('Usuario baneado')
            }
        })
        .catch((err) => {
            console.log('usuario no logueado');
        })
    },[dispatch, user])




        // const obj = {
        //     name: user.name,
        //     photos: user.photo ? data.user.photo : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png",
        //     firstName: data.data.firstName,
        //     lastname: data.data.lastname,
        //     email: data.data.email,
        //     id: data.data._id,
        //     dni: data.data.dni,
        //     phone: data.data.phone,
        //     birthDate: data.data.birthDate
        // };
        // console.log(obj);
        

    
    // useEffect(() => {
    //     const getUser = () => {

    //         console.log('hola');
            

    //     }
    //     getUser()
    // },[dispatch])

    return (
        <div className='App'>
            <BrowserRouter>
                <Route path={"/"} render={() => <NavBar />} />
                <Route exact path='/' component={Home} />
                {/* <Route exact path='/login' render={() => <Login />} /> */}
                <Route path='/user' render={() => <MiPerfil />} />
                {/* <Route exact path={"/register"} render={() => <Register />} /> */}
                <Route exact path='/flights' component={Flights} />
                <Route exact path='/flightSearch' component={FlightsSearch} />
                <Route
                    exact
                    path='/flights/flightDetail/:id'
                    component={CardDetail}
                />
                <Route path='/' component={Footer} />
                <Route path='/purchase' render={() => <Checkout />} />
            </BrowserRouter>
        </div>
    );
}

export default App;
