import React, { Component } from 'react';

import ElectoralResults from './containers/ElectoralResults';
import Header from './components/Header';
import PredictionsBar from './containers/PredictionsBar';

import './App.css';

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
      <div className="app">
        <Header />
        <PredictionsBar onPredict={this.onPredict} />
        <ElectoralResults predictions={this.state.predictions} />
      </div>
    );
  }
}

export default App;
