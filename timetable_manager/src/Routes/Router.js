
import React from 'react';
import { HashRouter , Route, Switch } from 'react-router-dom';
import routes from './index'

function Router() {
    return (
    <HashRouter >
        <Switch>
        { routes.map((prop, key) => {
            return (
            <Route
                path={prop.path}
                key={key}
                component={(props) => <prop.component    {...props} />}
                exact={prop.exact ? true : false}
            />);
        })}
        </Switch>
    </HashRouter>
    );
  }
  
export default Router;
