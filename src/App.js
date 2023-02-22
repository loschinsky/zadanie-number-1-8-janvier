import React from "react";
import NavBar from "./components/ui/navBar";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Users from "./layouts/users";
// import UserListPageEdit from "./components/page/userListPageEdit/userListPageEdit";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/users/:userId?/:edit?" component={Users} />
                <Route path="/login/:type?" component={Login} />

                <Route exact path="/" component={Main} />
                <Redirect to="/" />
            </Switch>
        </div>
    );
}

export default App;
