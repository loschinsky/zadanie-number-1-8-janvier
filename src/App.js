import React from "react";
import NavBar from "./components/navBar";
import { Route, Switch } from "react-router-dom";
import Login from "./components/login";
import Main from "./components/main";
import CompWhoChooseWhatToShow from "./components/componentWhoChooseWhatToShow";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/login" component={Login} />
                <Route
                    path="/users/:userId"
                    component={CompWhoChooseWhatToShow}
                />
                <Route path="/users/" component={CompWhoChooseWhatToShow} />
                <Route exact path="/" component={Main} />
            </Switch>
        </div>
    );
}

export default App;
