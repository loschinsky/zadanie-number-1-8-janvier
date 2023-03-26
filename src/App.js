import React from "react";
import NavBar from "./components/ui/navBar";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Users from "./layouts/users";
import { ToastContainer } from "react-toastify";
import { ProffesionProvider } from "./hooks/useProffesion";
import { QualitiesProvider } from "./hooks/useQualities";
function App() {
    return (
        <div>
            <NavBar />
            <QualitiesProvider>
                <ProffesionProvider>
                    <Switch>
                        <Route
                            path="/users/:userId?/:edit?"
                            component={Users}
                        />
                        <Route path="/login/:type?" component={Login} />

                        <Route exact path="/" component={Main} />
                        <Redirect to="/" />
                    </Switch>
                </ProffesionProvider>
            </QualitiesProvider>
            <ToastContainer />
        </div>
    );
}

export default App;
