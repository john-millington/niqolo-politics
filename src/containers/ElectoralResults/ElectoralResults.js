import React, { Component } from 'react';
import { isEqual } from 'lodash';

import HeadlineResult from './HeadlineResult';
import RegionalResults from './RegionalResults';

import './styles/ElectoralResults.css';
import ConstituencyResults from './ConstituencyResults';

class ElectoralResults extends Component {
  state = {
    party: null,
    region: null,
    results: null
  };

  constructor(props) {
    super(props);

    this.onSelectParty = this.onSelectParty.bind(this);
    this.onSelectRegion = this.onSelectRegion.bind(this);
  }

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

  onSelectParty(party) {
    this.setState({
      party: party
    });
  }

  onSelectRegion(region = null) {
    this.setState({
      region
    });
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
          {headline.map(({ party }) => (
            <HeadlineResult
              onSelect={this.onSelectParty}
              party={party}
              results={this.state.results}
              selected={party === this.state.party}
            />
          ))}
        </div>
        <div className="niq-results">
          {!this.state.region && (
            <RegionalResults
              party={this.state.party}
              results={this.state.results}
              onSelect={this.onSelectRegion}
            />
          )}
          {this.state.region && (
            <ConstituencyResults
              party={this.state.party}
              results={this.state.results}
              region={this.state.region}
              onReset={this.onSelectRegion}
            />
          )}
        </div>
      </div>
    )
  }
}

export default ElectoralResults;
