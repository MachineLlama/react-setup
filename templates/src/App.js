import React from 'react';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

import Rest from './components/rest/Rest';
import './App.scss';

function App() {
  const username = 'Test User';

  return (
    <BrowserRouter>
      <main className="app">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to={`/rest/${username}`}>REST API</Link></li>
          </ul>
        </nav>

        <Switch>
          <Route
            path="/"
            exact
            render={() => {
              return <h2>Hello World!</h2>
            }}
          />

          <Route
            path="/rest/:name"
            component={Rest}
          />

          <Route
            render={() => <h1>404: page not found</h1>}
          />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
