import "./App.css";
import React, { useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "./components/Loader/Loader";
// const Auth0Callback = lazy(() => import("./auth0callback"));
import Auth0Callback from './auth0callback'
// import Card from "./components/Card/Card.js";
const Home = lazy(() => import("./components/Home/Home"));
const Footer = lazy(() => import("./components/Footer/Footer"));
const Flights = lazy(() => import("./components/Flights/Flights"));
// const FlightsSearch = lazy(() => import('./components/FlightsSearch/FlightsSearch'))
const NavBar = lazy(() => import("./components/NavBar/NavBar"));
const Checkout = lazy(() => import("./components/Checkout/Checkout"));
const Login = lazy(() => import("./components/Login/Login"));
const Register = lazy(() => import("./components/Register/Register"));
const CardDetail = lazy(() => import("./components/CardDetail/cardDetail"));
const OfertasContainer = lazy(() => import("./components/Ofertas/OfertasContainer"));
// const LogInButton = lazy(() => import("./components/Login auth0/LogInAuth0"))
const MiPerfil = lazy(() => import("./components/MiPerfil/MiPerfil"));
const RoundtripFF = lazy(() => import("./components/Flights/RoundtripFF"));
const RoundtripSF = lazy(() => import("./components/Flights/RoundtripSF"));
const Cart = lazy(() => import("./components/Cart/Cart"));
const Help = lazy(() => import("./components/Help/Help"));
const AsistenciasCard = lazy(() => import("./components/Asistencias/AsistenciasCard"));
const CompraAsistencias = lazy(() => import("./components/Asistencias/CompraAsistencias"));
const storeUserInfo = lazy(() => import("./Redux/Actions").then((module) => ({ default: module.storeUserInfo })))
const Success = lazy(() => import("./components/Compras/Success"));
const Failure = lazy(() => import("./components/Compras/Failure"));
const activeAcc = lazy(() => import("./utils/alerts").then((module) => ({ default: module.activeAcc })))
const bannedAcc = lazy(() => import("./utils/alerts").then((module) => ({ default: module.bannedAcc })))
const Admin = lazy(() => import("./components/Admin/Admin"));
const PrivateRoute = lazy(() => import("./components/PrivateRoute/PrivateRoute"));
const ChatBot = lazy(() => import("./components/ChatBot/ChatBot"));
const UpladPhoto = lazy(() => import("./components/UploadPhoto"));
const Rating = lazy(() => import("./components/ratingComments/rating"));
const Filter = lazy(() => import("./components/Filter/Filter"));

function App() {
  const dispatch = useDispatch();

  const { user, logout } = useAuth0();


  useEffect(() => {
    axios
      .post("/auth0/getUser", { user })
      .then((data) => {
        if (data.status === 200) return data.data;
      })
      .then((user) => {
        if (user.active && !user.banned) {
          window.localStorage.setItem("user", JSON.stringify(user));
          dispatch(storeUserInfo(user));
        } else if (user.banned) {
            return bannedAcc(logout);
        } else if (!user.active) {
            return activeAcc(logout);
        }
      })
      .catch((err) => {
        console.log("usuario no logueado");
      });
  }, [dispatch, user, logout]);

  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={ <Loader/> }>
            <Route path="/" component={ChatBot} />
            <Route path={"/"} render={() => <NavBar />} />
            <Route exact path="/" component={Home} />
            <Route exact path="/login" render={() => <Login />} />
            <Route exact path="/ofertas" render={() => <OfertasContainer />} />
            <Route path="/user" render={() => <MiPerfil />} />
            <Route exact path={"/register"} render={() => <Register />} />
            <Route exact path="/flights" component={Flights} />
            <PrivateRoute exact path="/admin" component={Admin} />
            <Route
            exact
            path="/flights/roundtrip/firstFlight"
            component={RoundtripFF}
            />
            <Route
            exact
            path="/flights/roundtrip/secondFlight"
            component={RoundtripSF}
            />
            <Route exact path="/flights/roundtrip/cart" component={Cart} />
            <Route exact path="/flights/flightDetail/:id" component={CardDetail} />
            <Route exact path="/success" component={Success} />
            <Route exact path="/failure" component={Failure} />
            <Route path="/" component={Footer} />
            <Route path="/purchase" render={() => <Checkout />} />
            <Route path="/help" render={() => <Help />} />
            <Route path={"/asistencias"} render={() => <AsistenciasCard />} />
            <Route path='/uploadPhoto' component={UpladPhoto}/>
            <Route exact path='/callback' component={Auth0Callback} />
            <Route exact path={"/flights/roundtrip/asistant"} component={CompraAsistencias} />
            <Route path={"/feedBack"} component={Rating}/>
            <Route path={"/sliders"} component={Filter}/>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
