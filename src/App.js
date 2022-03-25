import "./App.scss";
import SectorCard from "./components/SectorCard";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Profile from "./components/Profile";
import Home from "./components/HomePage";
import Header from "./components/Header";

function App() {
  return (
    <>
      {" "}
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {" "}
            <Home />
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/sector">
            <div className="divRoute">
              {" "}
              <Header />
              <SectorCard />
            </div>
          </Route>
        </Switch>

        <Switch>
          <Route exact path="/profile">
            <div className="divRoute">
              {" "}
              <Header />
              <Profile />{" "}
            </div>
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
