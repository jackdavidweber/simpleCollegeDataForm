import * as React from 'react';

import { Route, Switch } from 'react-router-dom';

import { ConnectedRouter } from 'connected-react-router';

// import { ProtectedRoute } from './util/routeUtil';
// import { history } from './store/createStore';
import FilledTextFields from './myForm';


const routes = (
  // <ConnectedRouter history={history}>
  <ConnectedRouter>

    <Switch>
      {/* <Route exact path="/auth" component={AuthenticationPage} /> */}
      <Route
        exact
        path="/myform"
        component={FilledTextFields}
      />

    </Switch>
  </ConnectedRouter>
);

export default routes;
