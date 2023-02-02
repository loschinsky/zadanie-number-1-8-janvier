import React from "react";
import NavBar from "./components/navBar";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./layouts/login";
import Main from "./layouts/main";
import CompWhoChooseWhatToShow from "./layouts/users";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/login" component={Login} />
                <Route
                    path="/users/:userId?"
                    component={CompWhoChooseWhatToShow}
                />
                <Route exact path="/" component={Main} />
                <Redirect to="/" />
            </Switch>
        </div>
    );
}

export default App;
