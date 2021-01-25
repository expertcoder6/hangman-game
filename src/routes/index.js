////////////////////////////////////////////////////
// imports

// ext lin
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// react
import React, { Component } from "react";

// componets
import Home from "../components/Home";
import Play from "../components/Play";

// redux
import configureStore from '../redux/store'

const { store, persistor } = configureStore();

////////////////////////////////////////////////////
// component

class AppRoutes extends Component {

  ////////////////////////////////////////////////////
  // render

  render() {
    
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/play/:id" component={Play} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default AppRoutes;