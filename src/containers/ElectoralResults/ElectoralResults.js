import React, { Component } from 'react';

import moment from 'moment';
import { isEmpty, isEqual } from 'lodash';

import HeadlineResult from './HeadlineResult';
import RegionalResults from './RegionalResults';

import './styles/ElectoralResults.css';
import ConstituencyResults from './ConstituencyResults';
import ConstituencyMap from '../../components/ConstituencyMap';

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
    const {
      predictions
    } = this.props;

    if (isEmpty(predictions)) {
      const boundary = moment().subtract(20, 'days');
      fetch('/api/polls').then(response => response.json()).then(polls => {
        const aggregates = { };
        polls.results.forEach(poll => {
          const pollster = poll.pollster.split('/')[0];
          if (!aggregates[pollster] && poll.area == 'GB') {
            if (moment(poll.date).isAfter(boundary)) {
              aggregates[pollster] = poll.parties;
            }
          }
        });

        console.log(aggregates);
        const scores = { };
        Object.keys(aggregates).forEach(pollster => {
          Object.keys(aggregates[pollster]).forEach(party => {
            if (!scores[party]) {
              scores[party] = aggregates[pollster][party];
            }

            scores[party] = (scores[party] + aggregates[pollster][party]) / 2;
          });
        });

        this.refresh(scores);
      });
    } else {
      this.refresh(predictions);
    }
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.predictions, this.props.predictions)) {
      this.refresh(this.props.predictions);
    }
  }

  refresh(predictions) {
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
          <ConstituencyMap
            region={this.state.region}
            results={this.state.results}
          />
          <div className="niq-results__container">
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
      </div>
    )
  }
}

export default ElectoralResults;
