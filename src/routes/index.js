import 'semantic-ui-css/semantic.min.css';
import './../core/styles/index.css';

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ElectoralResults from './../containers/ElectoralResults';
import Header from './../components/Header';

class App extends Component {
  state = {
    predictions: null
  };

  constructor(props) {
    super(props);
    this.onPredict = this.onPredict.bind(this);
  }

  onPredict(predictions) {
    this.setState({
      predictions
    });
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Header onPredict={this.onPredict} />
          <div className="niq-content">
            <Switch>
              <Route
                exact
                path="/prediction"
                component={() => <ElectoralResults predictions={this.state.predictions} />}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;