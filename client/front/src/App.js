import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home.js";
import Flights from "./components/Flights";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/flights" component={Flights} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
