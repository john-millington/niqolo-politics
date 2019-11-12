import React, { Component } from 'react';
import { isEqual } from 'lodash';

import './ElectoralResults.css';

class ElectoralResults extends Component {
  state = {
    results: null
  };

  componentDidMount() {
    fetch('/api/elections', {
      method: 'GET',
      mode: 'no-cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()).then(response => {
      this.setState({
        results: response.results
      });
    });
  }

  componentDidUpdate(prevProps) {
    const {
      predictions
    } = this.props;

    if (!isEqual(predictions, prevProps.predictions)) {
      fetch('/api/elections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(predictions)
      }).then(response => response.json()).then(response => {
        this.setState({
          results: response.results
        });
      });
    }
  }

  render() {
    if (!this.state.results) {
      return null;
    }

    const headline = Object.keys(this.state.results.headline).map(party => {
      return {
        party,
        count: this.state.results.headline[party]
      }
    }).sort((primary, secondary) => primary.count > secondary.count ? -1 : 1);

    return (
      <div className="niq-electoral-content">
        <div className="niq-headline">
          {headline.map(({ party, count }) => {
            return (
              <div key={`${party}__result`} className={`niq-headline__item ${party.toLowerCase()}`}>
                <span className="niq-headline__item-title">
                  {party}
                </span>
                <span className="niq-headline__item-value">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
        <div className="niq-results">
          {Object.keys(this.state.results.constituencies).map(name => {
            const result = this.state.results.constituencies[name];
            if (result.winner === result.previous) {
              return null;
            }

            return (
              <div className="niq-result__item">
                <span className="niq-result__change">
                  <span className={`niq-tag ${result.previous.toLowerCase()}`}>{result.previous}</span>
                  ->
                  <span className={`niq-tag ${result.winner.toLowerCase()}`}>{result.winner}</span>
                </span>
                <span className="niq-result__name">{name}</span>
              </div>
            );
          })}
        </div>
      </div>
    )
  }
}

export default ElectoralResults;
